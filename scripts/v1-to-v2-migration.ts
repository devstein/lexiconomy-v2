import hardhat from "hardhat";
import fs from "fs";

import { ethers } from "ethers";

import LexiconomyV1ABI from "../data/LexiconomyV1ABI";

const LEXICONOMY_ADDRESS = "0x05dde4609035e464f995d13221b5166080634f21";
const CACHE_FILE = "./data/LexiconomyV1Tokens.json";

const mainnetProvider = new ethers.providers.AlchemyProvider(
  "homestead",
  process.env.ALCHEMY_MAINNET_API_KEY
);

const lexiconomyV1 = new ethers.Contract(
  LEXICONOMY_ADDRESS,
  LexiconomyV1ABI,
  mainnetProvider
);

interface LemmaV2 {
  id: string;
  owner: string;
  lemma: string;
  definition?: string;
  example?: string;
}

type OldLemmas = Record<string, Partial<LemmaV2>>;

const getOldLemmas = async (): Promise<OldLemmas> => {
  let index = 0;
  let id: ethers.BigNumber = await lexiconomyV1.lemmaIds(index);
  let lemmas: OldLemmas = {
    [id.toString()]: {
      id: id.toString(),
      lemma: "lexiconomy",
      example: "i coined it first on the lexiconomy.",
    },
  };

  let hasMoreLemmas = true;

  while (hasMoreLemmas) {
    index++;
    try {
      id = await lexiconomyV1.lemmaIds(index);
      const idKey = id.toString();
      lemmas[idKey] = { id: idKey };
    } catch (err) {
      // ran out of lemmas
      hasMoreLemmas = false;
    }
  }
  return lemmas;
};

interface LexiconomyV1EventArgs {
  lemmaId: ethers.BigNumber;
}

interface LexiconomyV1Event {
  args?: LexiconomyV1EventArgs;
}

const updateLemmaValuesfromBids = async (
  lemmas: OldLemmas
): Promise<OldLemmas> => {
  const bidSuccessFilter = lexiconomyV1.filters.BidSuccess();
  const bidSuccessEvents = await lexiconomyV1.queryFilter(bidSuccessFilter);

  const bidLossFilter = lexiconomyV1.filters.BidLoss();
  const bidLossEvents = await lexiconomyV1.queryFilter(bidLossFilter);

  // typing these event logs are tricky...
  // @ts-ignore
  const bidLossIds = bidLossEvents.map((e: LexiconomyV1Event) =>
    // @ts-ignore
    e.args.lemmaId.toString()
  );

  for (let e of bidSuccessEvents) {
    // @ts-ignore
    const { lemma: lemmaBytes, lemmaId } = e.args;
    // @ts-ignore
    const id = lemmaId.toString();
    // @ts-ignore
    const lemma = ethers.utils.toUtf8String(lemmaBytes);

    const cur = lemmas[id];

    if (!cur) {
      if (bidLossIds.includes(id)) {
        console.log("skipping lost bid", id);
        continue;
      }
      console.log(e);
      throw new Error(`updateLemmaValuesfromBids: unknown id: ${id}`);
    }

    lemmas[id] = { ...cur, lemma };
  }

  return lemmas;
};

const updateLemmaValuesfromComposition = async (
  lemmas: OldLemmas
): Promise<OldLemmas> => {
  const filter = lexiconomyV1.filters.Compose();
  const events = await lexiconomyV1.queryFilter(filter);

  for (let e of events) {
    // @ts-ignore
    const lemmaBytes = e.args.lemma;
    // @ts-ignore
    const lemma = ethers.utils.toUtf8String(lemmaBytes);

    // generate id w/ ethers
    // @ts-ignore
    const idHex = ethers.utils.keccak256(lemmaBytes);
    const id = ethers.BigNumber.from(idHex).toString();

    const cur = lemmas[id];

    if (!cur) {
      console.log(e);
      throw new Error(`updateLemmaValuesfromComposition: unknown id: ${id}`);
    }

    lemmas[id] = { ...cur, lemma };
  }
  return lemmas;
};

const updateLemmaDefinitions = async (
  lemmas: OldLemmas
): Promise<OldLemmas> => {
  const filters = lexiconomyV1.filters.Define();
  const events = await lexiconomyV1.queryFilter(filters);

  // get the latest definition for every lemma
  // @ts-ignore
  const latestEvents = events.reduce((acc, { args, blockNumber }) => {
    // @ts-ignore
    const id = args.lemmaId.toString();
    // @ts-ignore
    const cur = acc[id];

    // if it's the first definition, add it
    // or, pick the one with a greater block number
    if (!cur || blockNumber > cur.blockNumber)
      return {
        ...acc,
        [id]: { args, blockNumber },
      };

    // current is the greater block, so do nothing
    return acc;
  }, {});

  for (let id of Object.keys(latestEvents)) {
    const cur = lemmas[id];

    if (!cur) {
      // @ts-ignore
      console.log(latestEvents[id]);
      throw new Error(`definition: unknown id: ${id}`);
    }

    // @ts-ignore
    const e = latestEvents[id];

    // @ts-ignore
    const { definition } = e.args;

    lemmas[id] = { ...cur, definition };
  }
  return lemmas;
};

const updateLemmaOwners = async (lemmas: OldLemmas): Promise<OldLemmas> => {
  for (let id of Object.keys(lemmas)) {
    const cur = lemmas[id];

    if (!cur) {
      throw new Error(`owner: unknown id: ${id}`);
    }

    // @ts-ignore
    const owner = await lexiconomyV1.owners(id);
    lemmas[id] = { ...cur, owner };
  }
  return lemmas;
};

const validateOldLemmas = (lemmas: OldLemmas): void => {
  const ids = Object.keys(lemmas);

  // Validate
  // every entry must have id==id, lemma, owner
  for (let id of ids) {
    const { id: id2, lemma, owner } = lemmas[id];
    if (id !== id2) {
      throw new Error(`id mismatch ${id} vs ${id2}`);
    }

    if (!lemma) {
      throw new Error(`missing lemma: ${id} ${lemma}`);
    }

    if (!owner) {
      throw new Error(`missing owner: ${id} ${owner}`);
    }
  }
};

async function main() {
  console.log("starting migration...");
  let data: OldLemmas;
  // check if file exists
  try {
    console.log("reading local data file...");
    const cache = fs.readFileSync(CACHE_FILE).toString();
    data = JSON.parse(cache);
  } catch (err) {
    console.log("no local data file found.\nre-computing...");

    console.log("fetching Lexiconomy v1 lemma ids...");
    data = await getOldLemmas();
    console.log(`found ${Object.keys(data).length} lemmas in Lexiconomy V1`);

    console.log("fetching lemma text from bids...");
    data = await updateLemmaValuesfromBids(data);
    console.log("fetched lemma text from bids.");

    console.log("fetching lemma text from composition...");
    data = await updateLemmaValuesfromComposition(data);
    console.log("fetched lemma text from composition.");

    console.log("fetching lemma definitions...");
    data = await updateLemmaDefinitions(data);
    console.log("fetched lemma definitions.");
    console.log("fetching lemma owners...");
    data = await updateLemmaOwners(data);
    console.log("fetched lemma owners.");

    console.log("validating lemmas...");
    validateOldLemmas(data);
    console.log("validated lemmas.");

    // save data
    console.log("saving data...");
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
    console.log("saved data.");
  }

  const LexiconomyV2 = await hardhat.deployments.get("Lexiconomy");
  const ceo = hardhat.ethers.provider.getSigner();
  const lexiconomyV2 = new ethers.Contract(
    LexiconomyV2.address,
    LexiconomyV2.abi,
    hardhat.ethers.provider
  );

  const ids = Object.keys(data);

  // TODO: Make this a task!
  // unpause the contract!
  await lexiconomyV2.connect(ceo).unpause();

  let count = 0;
  const total = ids.length;
  for (let id of ids) {
    const { lemma, definition = "", owner, example = "" } = data[id];
    count++;
    console.log(`${count} of ${total}: ${lemma} ${id} ${owner} ${definition}`);

    try {
      // check if the lemma exists
      const tokenId = await lexiconomyV2.getTokenId(lemma);
      const exists = await lexiconomyV2.lemmas(tokenId);

      if (exists && exists.length && Boolean(exists[0])) {
        console.log("skipping", lemma);
        continue;
      }
      console.log("doesn't exist", lemma);
    } catch (err) {
      console.log("doesn't exist", lemma);
    }

    console.log(
      "airdrop",
      owner,
      String(lemma),
      String(definition),
      String(example)
    );
    const nonce = await ceo.getTransactionCount();
    const tx = await lexiconomyV2
      .connect(ceo)
      .airdrop(owner, lemma, definition, example, {
        nonce,
        gasPrice: 10000000000,
        gasLimit: 9912390,
      });
    console.log("waiting for confirmation...");
    await tx.wait();
  }
  console.log("migration complete.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
