import { ethers } from "hardhat";

async function main() {
  const [deployer, daoTreasury, devWallet] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // 1. Deploy GraceToken
  const GraceToken = await ethers.getContractFactory("GraceToken");
  const graceToken = await GraceToken.deploy();
  await graceToken.waitForDeployment();
  console.log(`GraceToken deployed to: ${await graceToken.getAddress()}`);

  // 2. Deploy SacredItems
  const SacredItems = await ethers.getContractFactory("SacredItems");
  const sacredItems = await SacredItems.deploy("https://api.pray1209.com/items/{id}.json");
  await sacredItems.waitForDeployment();
  console.log(`SacredItems deployed to: ${await sacredItems.getAddress()}`);

  // 3. Deploy HolyRelics
  const HolyRelics = await ethers.getContractFactory("HolyRelics");
  const holyRelics = await HolyRelics.deploy();
  await holyRelics.waitForDeployment();
  console.log(`HolyRelics deployed to: ${await holyRelics.getAddress()}`);

  // 4. Deploy GameplayLogic
  // Using deployer addresses as placeholder for DAO/Dev if not specified
  const daoAddress = daoTreasury ? daoTreasury.address : deployer.address;
  const devAddress = devWallet ? devWallet.address : deployer.address;

  const GameplayLogic = await ethers.getContractFactory("GameplayLogic");
  const gameplayLogic = await GameplayLogic.deploy(
    await graceToken.getAddress(),
    await sacredItems.getAddress(),
    await holyRelics.getAddress(),
    daoAddress,
    devAddress
  );
  await gameplayLogic.waitForDeployment();
  const gameplayLogicAddress = await gameplayLogic.getAddress();
  console.log(`GameplayLogic deployed to: ${gameplayLogicAddress}`);

  // 5. Setup Permissions
  // Grant MINTER_ROLE to GameplayLogic for HolyRelics (to mint rewards)
  const MINTER_ROLE = await holyRelics.MINTER_ROLE();
  await holyRelics.grantRole(MINTER_ROLE, gameplayLogicAddress);
  console.log("Granted MINTER_ROLE on HolyRelics to GameplayLogic");

  // Grant MINTER_ROLE to GameplayLogic for SacredItems (if logic needs to mint items, which it usually does for drops)
  // Note: In PRD, gameplay drops items. So logic needs to mint items.
  const ITEMS_MINTER_ROLE = await sacredItems.MINTER_ROLE();
  await sacredItems.grantRole(ITEMS_MINTER_ROLE, gameplayLogicAddress);
  console.log("Granted MINTER_ROLE on SacredItems to GameplayLogic");

  // Grant MINTER_ROLE to GameplayLogic for GraceToken (if logic mints tokens as rewards)
  const GRACE_MINTER_ROLE = await graceToken.MINTER_ROLE();
  await graceToken.grantRole(GRACE_MINTER_ROLE, gameplayLogicAddress);
  console.log("Granted MINTER_ROLE on GraceToken to GameplayLogic");

  console.log("Deployment complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
