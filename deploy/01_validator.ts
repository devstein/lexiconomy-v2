import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import {
  getIllegalCharacterCodePoints,
  getWhitespaceCodePoints,
} from "../scripts/unicode-data";

export const MINT_FEE_WEI = 1000000000000000; // .001 ETH
const VALIDATOR_CONTRACT = "LemmaValidator";

export const tags = ["Validator"];

const printInitializationProgress = (
  count: number,
  total: number,
  codepoint: number
) => {
  process.stdout.clearLine(1);
  process.stdout.write(
    `${count} of ${total}\t${((count / total) * 100).toFixed(
      2
    )}% \t ${codepoint}\r`
  );
};

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

  // only init new contracts
  if (!validator.newlyDeployed) return;

  const illegalCharCodepoints = await getIllegalCharacterCodePoints();
  const chunkSize = 100;
  let numChunks = Math.ceil(illegalCharCodepoints.length / chunkSize);

  log("setting illegal characters...");
  for (let i = 0; i < numChunks; i++) {
    const codePoints = illegalCharCodepoints.slice(
      chunkSize * i,
      chunkSize * (i + 1)
    );
    printInitializationProgress(i + 1, numChunks, codePoints[0]);
    await execute(
      VALIDATOR_CONTRACT,
      { from: deployer },
      "batchSetIllegalCharacters",
      codePoints,
      true
    );
  }

  const whitespaceCodePoints = await getWhitespaceCodePoints();
  numChunks = Math.ceil(whitespaceCodePoints.length / chunkSize);

  log("setting whitespace characters...");
  for (let i = 0; i < numChunks; i++) {
    const codePoints = whitespaceCodePoints.slice(
      chunkSize * i,
      chunkSize * (i + 1)
    );
    printInitializationProgress(i + 1, numChunks, codePoints[0]);
    await execute(
      VALIDATOR_CONTRACT,
      { from: deployer },
      "batchSetWhitespaceCharacters",
      codePoints,
      true
    );
  }

  log(`${VALIDATOR_CONTRACT} contract character point validity configured`);
};

export default func;
