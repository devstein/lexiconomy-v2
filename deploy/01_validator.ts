import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import {
  getIllegalCharacterCodePoints,
  getWhitespaceCodePoints,
} from "../scripts/unicode-data";

export const MINT_FEE_WEI = 1000000000000000; // .001 ETH
const VALIDATOR_CONTRACT = "LemmaValidator";

export const tags = ["Validator"];

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy, log, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const unicode = await deploy("Unicode", {
    from: deployer,
    log: true,
  });

  const validator = await deploy(VALIDATOR_CONTRACT, {
    from: deployer,
    libraries: {
      Unicode: unicode.address,
    },
    log: true,
  });

  if (!validator.newlyDeployed) return;

  const illegalCharCodepoints = await getIllegalCharacterCodePoints();

  log("setting illegal characters...");
  for (let codepoint of illegalCharCodepoints) {
    // @ts-ignore
    await execute(
      VALIDATOR_CONTRACT,
      { from: deployer },
      "setIllegalCharacter",
      codepoint,
      true
    );
  }

  const whitespaceCodePoints = await getWhitespaceCodePoints();

  log("setting whitespace characters...");
  for (let codepoint of whitespaceCodePoints) {
    // @ts-ignore
    await execute(
      VALIDATOR_CONTRACT,
      { from: deployer },
      "setWhitespaceCharacter",
      codepoint,
      true
    );
  }

  log(`${VALIDATOR_CONTRACT} contract character point validity configured`);
};

export default func;
