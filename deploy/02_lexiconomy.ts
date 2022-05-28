import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";
import { DeployFunction } from "hardhat-deploy/types";

const CONTRACT_NAME = "Lexiconomy";

export const tags = ["Lexiconomy"];

const OpenSeaProxyRegistries = {
  // Mainet
  1: "0xa5409ec958c83c3f309868babaca7c86dcb077c1",
  // Rinkeby
  4: "0xf57b2c51ded3a29e6891aba85459d600256cf317",
};

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  getChainId,
}: HardhatRuntimeEnvironment) {
  const { deploy, get, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  const pricer = await get("FixedPricer");
  const validator = await get("LemmaValidator");

  await deploy(CONTRACT_NAME, {
    from: deployer,
    args: [pricer.address, validator.address],
    log: true,
  });

  // @ts-ignore
  const proxyRegistryAddress = OpenSeaProxyRegistries[chainId];

  // do nothing if there is no proxy
  if (!proxyRegistryAddress) return;

  await execute(
    CONTRACT_NAME,
    { from: deployer },
    "setProxyRegistryAddress",
    proxyRegistryAddress
  );
};

export default func;
