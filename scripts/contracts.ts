import { ethers } from "hardhat";
import { Contract } from "ethers";

import {
  getIllegalCharacterCodePoints,
  getWhitespaceCodePoints,
} from "./unicode-data";

export const MINT_FEE_WEI = 1000000000000000; // .001 ETH

const PRICER_CONTRACT = "FixedPricer";
const VALIDATOR_CONTRACT = "LemmaValidator";

export const deployPricer = async (): Promise<Contract> => {
  const Pricer = await ethers.getContractFactory(PRICER_CONTRACT);
  const pricer = await Pricer.deploy(MINT_FEE_WEI);
  await pricer.deployed();
  console.log(`${PRICER_CONTRACT} contract deployed: ${pricer.address}`);
  return pricer;
};

export const deployValidator = async (): Promise<Contract> => {
  const Test = await ethers.getContractFactory(
    "unicode-eth/contracts/Unicode.sol"
  );
  const test = await Test.deploy();
  const Validator = await ethers.getContractFactory(VALIDATOR_CONTRACT, {
    libraries: {
      Unicode: test.address,
    },
  });
  const validator = await Validator.deploy();
  await validator.deployed();
  console.log(`${VALIDATOR_CONTRACT} contract deployed: ${validator.address}`);

  const illegalCharCodepoints = await getIllegalCharacterCodePoints();

  console.log("setting illegal characters...");
  for (let codepoint of illegalCharCodepoints) {
    await validator.setIllegalCharacter(codepoint, true);
  }

  const whitespaceCodePoints = await getWhitespaceCodePoints();

  console.log("setting whitespace characters...");
  for (let codepoint of whitespaceCodePoints) {
    await validator.setWhitespaceCharacter(codepoint, true);
  }

  console.log(
    `${VALIDATOR_CONTRACT} contract character point validity configured`
  );
  return validator;
};

export const deployLexiconomy = async (
  pricer: Contract,
  validator: Contract
): Promise<Contract> => {
  const Lexiconomy = await ethers.getContractFactory("Lexiconomy");
  const lexiconomy = await Lexiconomy.deploy(pricer.address, validator.address);
  await lexiconomy.deployed();
  console.log(`Lexiconomy deployed 🎉: ${lexiconomy.address}`);
  return lexiconomy;
};

export const deployAll = async (): Promise<Contract> => {
  // 1. Deploy FixedPricer Contract
  const pricer = await deployPricer();

  // 2. Deploy LemmaValidator Contract
  // - Set invalid characters
  const validator = await deployValidator();

  // 3. Deploy Lexiconomy
  const lexiconomy = await deployLexiconomy(pricer, validator);

  // unpause the lexiconomy
  await lexiconomy.unpause();

  return lexiconomy;
};
