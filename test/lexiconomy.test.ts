import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";

const MIN_FEE = 1000;

const deployLexiconomy = async () => {
  const Lexiconomy = await ethers.getContractFactory("Lexiconomy");
  const lexiconomy = await Lexiconomy.deploy();
  // TODO: we need to unpause!
  return lexiconomy;
};

// TODO: Pricing contract
// setPricingContract() onlyOwner
// price()

describe("Lexiconomy", function () {
  it("should deploy successfully", async function () {
    try {
      await deployLexiconomy();
    } catch (error) {
      expect(false).to.be("failed to deploy");
    }
  });

  it("should mint a lemma", async function () {
    const lexiconomy = await deployLexiconomy();
    const [owner] = await ethers.getSigners();

    const lemma = "test";
    // TODO: dynamically get value via .price
    const tx = await lexiconomy.mint(lemma, {
      value: MIN_FEE,
    });

    const reciept = await tx.wait();

    // need to generate tokenId
    const tokenId = ethers.utils.id(lemma);

    // want to assert that token exists
    const actualOwner = await lexiconomy.ownerOf(tokenId);
    expect(actualOwner).to.equal(owner.address);

    // want to assert that the default address owns the token
    const tokenCount = await lexiconomy.balanceOf(owner.address);
    expect(tokenCount).to.equal(1);

    // want to assert that the default address owns the token
    const tokenSupply = await lexiconomy.totalSupply();
    expect(tokenSupply).to.equal(1);

    // want to assert the Transfer and Invent events fired
    expect(reciept.events).to.have.length(1);

    // TODO: check contract balance
  });

  it("should reject if minting fee is too low", async function () {
    const lexiconomy = await deployLexiconomy();

    try {
      await lexiconomy.mint("test", {
        value: 0,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect(error.message).to.contain("minting fee too low");
    }
  });

  it("should not mint uppercase letters", async function () {
    const lexiconomy = await deployLexiconomy();

    try {
      await lexiconomy.mint("TEST", {
        value: MIN_FEE,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect(error.message).to.contain("lemma contains illegal characters ");
    }
  });

  it("should not mint non-space whitespace", async function () {
    const lexiconomy = await deployLexiconomy();

    try {
      // this is tab character
      await lexiconomy.mint("a phrase", {
        value: MIN_FEE,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect(error.message).to.contain("lemma contains illegal characters");
    }
  });

  it("should not mint non-trimmed lemmas", async function () {
    const lexiconomy = await deployLexiconomy();

    try {
      // this is tab character
      await lexiconomy.mint("test	", {
        value: MIN_FEE,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect(error.message).to.contain("lemma contains illegal characters");
    }
    try {
      // this is tab character
      await lexiconomy.mint(" test", {
        value: MIN_FEE,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect(error.message).to.contain("lemma contains illegal characters");
    }
  });

  it("should not allow the same lemma to be created twice", async function () {
    const lexiconomy = await deployLexiconomy();
    const lemma = "test";

    const tx = await lexiconomy.mint(lemma, {
      value: MIN_FEE,
    });

    await tx.wait();

    try {
      await lexiconomy.mint(lemma, {
        value: MIN_FEE,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect(error.message).to.contain("token already minted");
    }
  });

  it("should allow owners to define their lemmas", async function () {
    const lexiconomy = await deployLexiconomy();
    const lemma = "test";

    await lexiconomy.mint(lemma, {
      value: MIN_FEE,
    });

    // need to generate tokenId
    const tokenId = ethers.utils.id(lemma);
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
    const lemma = "test";

    await lexiconomy.mint(lemma, {
      value: MIN_FEE,
    });

    // need to generate tokenId
    const tokenId = ethers.utils.id(lemma);
    const definition = "a definition";
    const [_, nonOwner] = await ethers.getSigners();

    try {
      // await greeter.connect(addr1).setGreeting("Hallo, Erde!");
      await lexiconomy.connect(nonOwner).definition(tokenId, definition);
      expect(true).to.equal(false);
    } catch (error) {
      expect(error.message).to.contain("caller is not owner nor approved");
    }
  });

  it("should allow owners to add examples to their lemmas", async function () {
    const lexiconomy = await deployLexiconomy();
    const lemma = "test";

    await lexiconomy.mint(lemma, {
      value: MIN_FEE,
    });

    // need to generate tokenId
    const tokenId = ethers.utils.id(lemma);
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
    const lemma = "test";

    await lexiconomy.mint(lemma, {
      value: MIN_FEE,
    });

    // need to generate tokenId
    const tokenId = ethers.utils.id(lemma);
    const example = "an example";
    const [_, nonOwner] = await ethers.getSigners();

    try {
      // await greeter.connect(addr1).setGreeting("Hallo, Erde!");
      await lexiconomy.connect(nonOwner).example(tokenId, example);
      expect(true).to.equal(false);
    } catch (error) {
      expect(error.message).to.contain("caller is not owner nor approved");
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
});
