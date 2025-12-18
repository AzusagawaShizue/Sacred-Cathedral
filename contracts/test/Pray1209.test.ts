import { expect } from "chai";
import { ethers } from "hardhat";
import { GraceToken, SacredItems, HolyRelics, GameplayLogic } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("Pray1209 Ecosystem", function () {
  let graceToken: GraceToken;
  let sacredItems: SacredItems;
  let holyRelics: HolyRelics;
  let gameplayLogic: GameplayLogic;

  let owner: SignerWithAddress;
  let player: SignerWithAddress;
  let dao: SignerWithAddress;
  let dev: SignerWithAddress;

  beforeEach(async function () {
    [owner, player, dao, dev] = await ethers.getSigners();

    // Deploy Tokens
    const GraceTokenFactory = await ethers.getContractFactory("GraceToken");
    graceToken = await GraceTokenFactory.deploy();

    const SacredItemsFactory = await ethers.getContractFactory("SacredItems");
    sacredItems = await SacredItemsFactory.deploy("https://api.example.com/items/{id}");

    const HolyRelicsFactory = await ethers.getContractFactory("HolyRelics");
    holyRelics = await HolyRelicsFactory.deploy();

    // Deploy Logic
    const GameplayLogicFactory = await ethers.getContractFactory("GameplayLogic");
    gameplayLogic = await GameplayLogicFactory.deploy(
      await graceToken.getAddress(),
      await sacredItems.getAddress(),
      await holyRelics.getAddress(),
      dao.address,
      dev.address
    );

    // Grant Roles
    const MINTER_ROLE = await holyRelics.MINTER_ROLE();
    await holyRelics.grantRole(MINTER_ROLE, await gameplayLogic.getAddress());

    const ITEMS_MINTER_ROLE = await sacredItems.MINTER_ROLE();
    await sacredItems.grantRole(ITEMS_MINTER_ROLE, await gameplayLogic.getAddress());

    // Mint initial items to player for testing
    // We need to grant owner minter role temporarily or use logic to mint?
    // Owner has minter role by default in our contracts constructor.
    await sacredItems.mint(player.address, 1, 10, "0x"); // 10 Wood
    await sacredItems.mint(player.address, 2, 5, "0x");  // 5 Candles

    // Mint GRACE to player
    await graceToken.mint(player.address, ethers.parseEther("100"));
    
    // Approve logic contract to spend player's GRACE and Items
    await graceToken.connect(player).approve(await gameplayLogic.getAddress(), ethers.MaxUint256);
    await sacredItems.connect(player).setApprovalForAll(await gameplayLogic.getAddress(), true);
  });

  it("Should allow crafting a relic", async function () {
    // 1. Add Recipe
    // 3 Wood (ID 1) + 1 Candle (ID 2) + 10 GRACE = Common Relic (ID 0)
    await gameplayLogic.addRecipe(
      [1, 2], // IDs
      [3, 1], // Amounts
      ethers.parseEther("10"), // Cost
      0, // Rarity.COMMON
      10, // Power
      "ipfs://relic_metadata",
      10000 // 100% success
    );

    // 2. Check Balances Before
    expect(await sacredItems.balanceOf(player.address, 1)).to.equal(10);
    expect(await graceToken.balanceOf(player.address)).to.equal(ethers.parseEther("100"));

    // 3. Craft
    await gameplayLogic.connect(player).craft(0);

    // 4. Check Balances After
    expect(await sacredItems.balanceOf(player.address, 1)).to.equal(7); // 10 - 3
    expect(await sacredItems.balanceOf(player.address, 2)).to.equal(4); // 5 - 1
    expect(await graceToken.balanceOf(player.address)).to.equal(ethers.parseEther("90")); // 100 - 10

    // 5. Check Relic Minted
    expect(await holyRelics.ownerOf(0)).to.equal(player.address);
    expect(await holyRelics.tokenURI(0)).to.equal("ipfs://relic_metadata");
  });

  it("Should distribute fees to DAO and Dev", async function () {
    // Add recipe with cost
    await gameplayLogic.addRecipe(
        [1], [1], ethers.parseEther("100"), 0, 10, "uri", 10000
    );

    await gameplayLogic.connect(player).craft(0);

    // 50% to DAO, 50% to Dev
    expect(await graceToken.balanceOf(dao.address)).to.equal(ethers.parseEther("50"));
    expect(await graceToken.balanceOf(dev.address)).to.equal(ethers.parseEther("50"));
  });
});
