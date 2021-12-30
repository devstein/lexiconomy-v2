import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";

describe("LemmaValidator", function () {
  it("should allow the owner to set character validity", async function () {
    const Contract = await ethers.getContractFactory("LemmaValidator");
    const contract = await Contract.deploy();
    await contract.deployed();

    try {
      await contract.setCharacterValidity(1, true);
    } catch (error) {
      expect(false).to.equal("owner should be able to set character validity");
    }
  });
  it("should not allow non-owners to set character validity", async function () {
    const Contract = await ethers.getContractFactory("LemmaValidator");
    const contract = await Contract.deploy();
    await contract.deployed();

    const [_, nonOwner] = await ethers.getSigners();
    try {
      await contract.connect(nonOwner).setCharacterValidity(1, false);
      // fail -> should not succeed
      expect(true).to.equal(false);
    } catch (error) {}
  });

  it("should allow strings with valid characters", async function () {
    const Contract = await ethers.getContractFactory("LemmaValidator");
    const contract = await Contract.deploy();
    await contract.deployed();

    const str = "valid";

    // set all chars to valid
    for (let c of str) {
      await contract.setCharacterValidity(c.codePointAt(0), true);
    }

    const valid = await contract.valid(str);
    expect(valid).to.equal(true);
  });

  it("should reject strings with an invalid character", async function () {
    const Contract = await ethers.getContractFactory("LemmaValidator");
    const contract = await Contract.deploy();
    await contract.deployed();

    const str = "valid";

    // set all chars to valid
    for (let c of str) {
      await contract.setCharacterValidity(c.codePointAt(0), true);
    }

    // make a char invalid
    await contract.setCharacterValidity(str.codePointAt(2), true);

    const valid = await contract.valid(str);
    expect(valid).to.equal(false);
  });
});
