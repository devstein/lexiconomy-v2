import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import {
  getIllegalCharacterCodePoints,
  getWhitespaceCodePoints,
} from "../scripts/unicode-data";

const CONTRACT_NAME = "Lexiconomy";

export const tags = ["Lexiconomy"];

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const pricer = await get("FixedPricer");
  const validator = await get("LemmaValidator");

  const lexiconomy = await deploy(CONTRACT_NAME, {
    from: deployer,
    args: [pricer.address, validator.address],
    log: true,
  });
};

export default func;
