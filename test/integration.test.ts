import { ethers } from "hardhat";
import { Signer, Contract } from "ethers";
import { expect } from "chai";

import { deployAll, MINT_FEE_WEI } from "../scripts/contracts";

interface ContractError {
  message: string;
}

const onlyIntegration = process.env.INTEGRATION_TEST ? describe : describe.skip;

const INVALID_LEMMA_MSG = "lemma is invalid";

let lexiconomy: Contract;

onlyIntegration("Deployment and Integration Tests", function () {
  before(async () => {
    lexiconomy = await deployAll();
  });

  it("should not mint uppercase letters", async function () {
    try {
      const value = await lexiconomy.mintFee();
      await lexiconomy.mint("TEST", {
        value,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect((error as ContractError).message).to.contain(INVALID_LEMMA_MSG);
    }
  });

  it("should allow separator characters", async function () {
    try {
      const value = await lexiconomy.mintFee();
      await lexiconomy.mint("some long phrase", {
        value,
      });
    } catch (error) {
      expect(true).to.equal((error as ContractError).message);
    }
  });

  it("should not mint multiple consecutive whitespace characters", async function () {
    try {
      const value = await lexiconomy.mintFee();
      await lexiconomy.mint("a  phrase", {
        value,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect((error as ContractError).message).to.contain(INVALID_LEMMA_MSG);
    }
  });

  it("should not mint non-trimmed lemmas", async function () {
    try {
      const value = await lexiconomy.mintFee();
      await lexiconomy.mint("test	", {
        value,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect((error as ContractError).message).to.contain(INVALID_LEMMA_MSG);
    }
    try {
      const value = await lexiconomy.mintFee();
      await lexiconomy.mint(" test", {
        value,
      });
      expect(true).to.equal(false);
    } catch (error) {
      expect((error as ContractError).message).to.contain(INVALID_LEMMA_MSG);
    }
  });

  it("should allow emojis 😁", async function () {
    try {
      const value = await lexiconomy.mintFee();
      await lexiconomy.mint("😁", {
        value,
      });
    } catch (error) {
      expect(true).to.equal((error as ContractError).message);
    }
  });
});
