import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";

const MIN_FEE = 1000;
const VALID_LEMMA = "valid";

const deployLexiconomy = async () => {
  const Pricer = await ethers.getContractFactory("FixedPricer");
  const pricer = await Pricer.deploy(MIN_FEE);

  const Validator = await ethers.getContractFactory("MockStringValidator");
  const validator = await Validator.deploy(VALID_LEMMA);

  const Lexiconomy = await ethers.getContractFactory("Lexiconomy");
  const lexiconomy = await Lexiconomy.deploy(pricer.address, validator.address);

  await lexiconomy.unpause();

  return lexiconomy;
};

interface ContractError {
  message: string;
}

describe("Lexiconomy", function () {
  it("should deploy successfully", async function () {
    try {
      await deployLexiconomy();
    } catch (error) {
      expect(false).to.equal("failed to deploy");
    }
  });

  it("should mint a lemma", async function () {
    const lexiconomy = await deployLexiconomy();
    const [owner] = await ethers.getSigners();

    const value = await lexiconomy.mintFee();
    const tx = await lexiconomy.mint(VALID_LEMMA, {
      value,
    });

    const reciept = await tx.wait();

    // need to generate tokenId
    const tokenId = ethers.utils.id(VALID_LEMMA);

    // want to assert that token exists
    const actualOwner = await lexiconomy.ownerOf(tokenId);
    expect(actualOwner).to.equal(owner.address);

    const numberOfTokens = 1;
    // want to assert that the default address owns the token
    const tokenCount = await lexiconomy.balanceOf(owner.address);
    expect(tokenCount).to.equal(numberOfTokens);

    // want to assert that the default address owns the token
    const tokenSupply = await lexiconomy.totalSupply();
    expect(tokenSupply).to.equal(numberOfTokens);

    // want to assert the Transfer and Invent events fired
    expect(reciept.events).to.have.length(2);

    const [transfer, invent] = reciept.events;

    expect(transfer.args.to).to.equal(owner.address);
    expect(transfer.args.tokenId).to.equal(tokenId);

    expect(invent.args.owner).to.equal(owner.address);
    expect(invent.args.tokenId).to.equal(tokenId);
    expect(invent.args.fee).to.equal(value);
    expect(invent.args.number).to.equal(numberOfTokens);
    expect(invent.args.lemma).to.equal(VALID_LEMMA);
  });

  it("should reject if minting fee is too low", async function () {
    const lexiconomy = await deployLexiconomy();

    try {
      const value = await lexiconomy.mintFee();
      await lexiconomy.mint(VALID_LEMMA, {
        value: value - 1,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect((error as ContractError).message).to.contain(
        "minting fee too low"
      );
    }
  });

  it("should not allow the same lemma to be created twice", async function () {
    const lexiconomy = await deployLexiconomy();

    const value = await lexiconomy.mintFee();
    const tx = await lexiconomy.mint(VALID_LEMMA, {
      value,
    });
    await tx.wait();

    try {
      const value = await lexiconomy.mintFee();
      await lexiconomy.mint(VALID_LEMMA, {
        value,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect((error as ContractError).message).to.contain(
        "token already minted"
      );
    }
  });

  it("should allow owners to define their lemmas", async function () {
    const lexiconomy = await deployLexiconomy();

    const value = await lexiconomy.mintFee();
    await lexiconomy.mint(VALID_LEMMA, {
      value,
    });

    // need to generate tokenId
    const tokenId = ethers.utils.id(VALID_LEMMA);
    const definition = "a definition";

    const tx = await lexiconomy.definition(tokenId, definition);

    const reciept = await tx.wait();
    expect(reciept.events).to.have.length(1);

    const { event, args } = reciept.events[0];
    const [owner] = await ethers.getSigners();

    expect(event).to.equal("Definition");
    expect(args[0]).to.equal(owner.address);
    expect(args[1]).to.equal(tokenId);
    expect(args[2]).to.equal(definition);
  });

  it("should reject non-owners from defining a lemma", async function () {
    const lexiconomy = await deployLexiconomy();

    const value = await lexiconomy.mintFee();
    await lexiconomy.mint(VALID_LEMMA, {
      value,
    });

    // need to generate tokenId
    const tokenId = ethers.utils.id(VALID_LEMMA);
    const definition = "a definition";
    const [_, nonOwner] = await ethers.getSigners();

    try {
      // await greeter.connect(addr1).setGreeting("Hallo, Erde!");
      await lexiconomy.connect(nonOwner).definition(tokenId, definition);
      expect(true).to.equal(false);
    } catch (error) {
      expect((error as ContractError).message).to.contain(
        "caller is not owner nor approved"
      );
    }
  });

  it("should allow owners to add examples to their lemmas", async function () {
    const lexiconomy = await deployLexiconomy();

    const value = await lexiconomy.mintFee();
    await lexiconomy.mint(VALID_LEMMA, {
      value,
    });

    // need to generate tokenId
    const tokenId = ethers.utils.id(VALID_LEMMA);
    const example = "an example";

    const tx = await lexiconomy.example(tokenId, example);

    const reciept = await tx.wait();
    expect(reciept.events).to.have.length(1);

    const { event, args } = reciept.events[0];
    const [owner] = await ethers.getSigners();

    expect(event).to.equal("Example");
    expect(args[0]).to.equal(owner.address);
    expect(args[1]).to.equal(tokenId);
    expect(args[2]).to.equal(example);
  });

  it("should reject non-owners from adding examples a lemma", async function () {
    const lexiconomy = await deployLexiconomy();

    const value = await lexiconomy.mintFee();
    await lexiconomy.mint(VALID_LEMMA, {
      value,
    });

    // need to generate tokenId
    const tokenId = ethers.utils.id(VALID_LEMMA);
    const example = "an example";
    const [_, nonOwner] = await ethers.getSigners();

    try {
      await lexiconomy.connect(nonOwner).example(tokenId, example);
      expect(true).to.equal(false);
    } catch (error) {
      expect((error as ContractError).message).to.contain(
        "caller is not owner nor approved"
      );
    }
  });

  it("should emit a donation event", async function () {
    const lexiconomy = await deployLexiconomy();

    const tx = await lexiconomy.donate({
      value: 1000,
    });

    const reciept = await tx.wait();

    expect(reciept.events).to.have.length(1);

    const { event, args } = reciept.events[0];
    const [owner] = await ethers.getSigners();

    expect(event).to.equal("Donation");
    expect(args[0]).to.equal(owner.address);
  });

  it("should return a mint fee", async function () {
    const lexiconomy = await deployLexiconomy();

    const mintFee = await lexiconomy.mintFee();
    expect(mintFee).to.equal(MIN_FEE);
  });

  it("should set a new pricer contract", async function () {
    const newPrice = 10000;
    const Pricer = await ethers.getContractFactory("FixedPricer");
    const pricer = await Pricer.deploy(newPrice);

    const lexiconomy = await deployLexiconomy();

    await lexiconomy.setPricer(pricer.address);

    const pricerAddr = await lexiconomy.pricer();
    expect(pricerAddr).to.equal(pricer.address);

    const mintFee = await lexiconomy.mintFee();
    expect(mintFee).to.equal(newPrice);
  });

  it("should reject non-owner from setting a new pricer contract", async function () {
    const Pricer = await ethers.getContractFactory("FixedPricer");
    const pricer = await Pricer.deploy(MIN_FEE);

    const lexiconomy = await deployLexiconomy();
    const [_, nonOwner] = await ethers.getSigners();
    try {
      await lexiconomy.connect(nonOwner).setPricer(pricer.address);
      // fail -> should not succeed
      expect(true).to.equal(false);
    } catch (error) {
      expect((error as ContractError).message).to.contain(
        "caller is not the owner"
      );
    }
  });

  it("should set a new validator contract", async function () {
    const lemma = "test";
    const Validator = await ethers.getContractFactory("MockStringValidator");
    const validator = await Validator.deploy(lemma);

    const lexiconomy = await deployLexiconomy();

    await lexiconomy.setLemmaValidator(validator.address);

    const validatorAddr = await lexiconomy.lemmaValidator();
    expect(validatorAddr).to.equal(validator.address);
  });

  it("should reject non-owner from setting a new validator contract", async function () {
    const lemma = "test";
    const Validator = await ethers.getContractFactory("MockStringValidator");
    const validator = await Validator.deploy(lemma);

    const lexiconomy = await deployLexiconomy();

    const [_, nonOwner] = await ethers.getSigners();
    try {
      await lexiconomy.connect(nonOwner).setLemmaValidator(validator.address);
      // fail -> should not succeed
      expect(true).to.equal(false);
    } catch (error) {
      expect((error as ContractError).message).to.contain(
        "caller is not the owner"
      );
    }
  });

  it("should return the correct token URI", async function () {
    const lexiconomy = await deployLexiconomy();

    const value = await lexiconomy.mintFee();
    const tx = await lexiconomy.mint(VALID_LEMMA, {
      value,
    });

    const reciept = await tx.wait();
    const tokenId = await lexiconomy.getTokenId(VALID_LEMMA);

    const expected = `https://lexiconomy.org/lemma-id/${tokenId}`;
    const uri = await lexiconomy.tokenURI(tokenId);
    expect(uri).to.equal(expected);
  });

  it("should prevent the tokens from minting when the contract is paused", async function () {
    const lexiconomy = await deployLexiconomy();
    await lexiconomy.pause();

    try {
      const value = await lexiconomy.mintFee();
      await lexiconomy.mint(VALID_LEMMA, {
        value,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect((error as ContractError).message).to.contain("paused");
    }
  });
});
