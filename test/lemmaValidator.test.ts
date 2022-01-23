import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";

const VALIDATOR_CONTRACT = "LemmaValidator";

const deploy = async () => {
  const Lib = await ethers.getContractFactory("Unicode");
  const lib = await Lib.deploy();
  const Validator = await ethers.getContractFactory(VALIDATOR_CONTRACT, {
    libraries: {
      Unicode: lib.address,
    },
  });
  const validator = await Validator.deploy();
  await validator.deployed();

  return validator;
};
describe("LemmaValidator", function () {
  it("should allow the owner to set illegal characters", async function () {
    const contract = await deploy();

    try {
      await contract.setIllegalCharacter(1, false);
    } catch (error) {
      expect(false).to.equal("owner should be able to set character validity");
    }
  });
  it("should not allow non-owners to set illegal characters", async function () {
    const contract = await deploy();

    const [_, nonOwner] = await ethers.getSigners();
    try {
      await contract.connect(nonOwner).setIllegalCharacter(1, false);
      // fail -> should not succeed
      expect(true).to.equal(false);
    } catch (error) {}
  });

  it("should allow the owner to set whitespace characters", async function () {
    const contract = await deploy();

    try {
      await contract.setWhitespaceCharacter(1, true);
    } catch (error) {
      expect(false).to.equal("owner should be able to set character validity");
    }
  });
  it("should not allow non-owners to set whitespace characters", async function () {
    const contract = await deploy();

    const [_, nonOwner] = await ethers.getSigners();
    try {
      await contract.connect(nonOwner).setWhitespaceCharacter(1, true);
      // fail -> should not succeed
      expect(true).to.equal(false);
    } catch (error) {}
  });

  it("should allow strings with valid characters", async function () {
    const contract = await deploy();

    const str = "valid";

    // set all chars to valid
    for (let c of str) {
      await contract.setIllegalCharacter(c.codePointAt(0), false);
    }

    const valid = await contract.valid(str);
    expect(valid).to.equal(true);
  });

  it("should reject strings with an invalid character", async function () {
    const contract = await deploy();

    const str = "valid";

    // set all chars to valid
    for (let c of str) {
      await contract.setIllegalCharacter(c.codePointAt(0), false);
    }

    // make a char invalid
    await contract.setIllegalCharacter(str.codePointAt(2), true);

    const valid = await contract.valid(str);
    expect(valid).to.equal(false);
  });

  it("should allow strings with single separators", async function () {
    const contract = await deploy();

    const str = "a b c";
    await contract.setWhitespaceCharacter(" ".codePointAt(0), true);

    const valid = await contract.valid(str);
    expect(valid).to.equal(true);
  });

  it("should reject strings with multiple consecutive separators", async function () {
    const contract = await deploy();

    const str = "a  c";
    await contract.setWhitespaceCharacter(" ".codePointAt(0), true);

    const valid = await contract.valid(str);
    expect(valid).to.equal(false);
  });

  it("should reject strings with whitespace prefix", async function () {
    const contract = await deploy();

    const str = " abc";
    await contract.setWhitespaceCharacter(" ".codePointAt(0), true);

    const valid = await contract.valid(str);
    expect(valid).to.equal(false);
  });

  it("should reject strings with trailing whitespace", async function () {
    const contract = await deploy();

    const str = "abc ";
    await contract.setWhitespaceCharacter(" ".codePointAt(0), true);

    const valid = await contract.valid(str);
    expect(valid).to.equal(false);
  });
});
