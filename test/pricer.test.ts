import { ethers } from "hardhat";
import { Signer } from "ethers";
import { expect } from "chai";

describe("SimplePricer", function () {
  it("should set the inital price once deployed", async function () {
    const Pricer = await ethers.getContractFactory("SimplePricer");
    const initalVal = 100;
    const pricer = await Pricer.deploy(initalVal);
    await pricer.deployed();

    expect(await pricer.price()).to.equal(initalVal);
  });

  it("should return the new price once it's changed", async function () {
    const Pricer = await ethers.getContractFactory("SimplePricer");
    const initalVal = 100;
    const pricer = await Pricer.deploy(initalVal);
    await pricer.deployed();

    expect(await pricer.price()).to.equal(initalVal);

    const newVal = 1000;
    await pricer.setPrice(newVal);
    expect(await pricer.price()).to.equal(newVal);
  });
});
