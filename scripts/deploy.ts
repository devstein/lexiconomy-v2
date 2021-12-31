import { ethers } from "hardhat";

import { getIllegalCharacterCodepoints } from "./unicode-data";

const PRICER_CONTRACT = "FixedPricer";
const VALIDATOR_CONTRACT = "LemmaValidator";

async function main() {
  // 1. Deploy FixedPricer Contract
  const MINT_FEE_WEI = 1000000000000000; // .001 ETH
  const Pricer = await ethers.getContractFactory(PRICER_CONTRACT);
  const pricer = await Pricer.deploy(MINT_FEE_WEI);
  await pricer.deployed();
  console.log(`${PRICER_CONTRACT} contract deployed: ${pricer.address}`);

  // 2. Deploy LemmaValidator Contract
  // - Set invalid characters
  const Validator = await ethers.getContractFactory(VALIDATOR_CONTRACT);
  const validator = await Validator.deploy();
  await validator.deployed();
  console.log(`${VALIDATOR_CONTRACT} contract deployed: ${validator.address}`);

  const illegalCharCodepoints = await getIllegalCharacterCodepoints();

  for (let codepoint of illegalCharCodepoints) {
    await validator.setCharacterValidity(codepoint, false);
  }
  console.log("validator contract character point validity configured.");

  // 3. Deploy Lexiconomy
  const Lexiconomy = await ethers.getContractFactory("Lexiconomy");
  const lexiconomy = await Lexiconomy.deploy(pricer.address, validator.address);
  await lexiconomy.deployed();
  console.log(`Lexiconomy deployed 🎉: ${lexiconomy.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
