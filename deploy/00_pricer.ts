import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const PRICER_CONTRACT = "FixedPricer";
export const MINT_FEE_WEI = 1000000000000000; // .001 ETH

export const tags = ["Pricer"];

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const pricer = await deploy(PRICER_CONTRACT, {
    from: deployer,
    args: [MINT_FEE_WEI],
    log: true,
  });
};

export default func;
