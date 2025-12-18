// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "./GraceToken.sol";
import "./SacredItems.sol";
import "./HolyRelics.sol";

/**
 * @title GameplayLogic
 * @dev Main game logic handling crafting (The Foundry) and Charity Vault distribution.
 */
contract GameplayLogic is Ownable {
    GraceToken public graceToken;
    SacredItems public sacredItems;
    HolyRelics public holyRelics;

    // Charity Vault configuration
    address public daoTreasury;
    address public devWallet;
    uint256 public constant DAO_SHARE_BP = 5000; // 50% in basis points (10000 = 100%)
    
    // Crafting Recipes
    struct Recipe {
        uint256[] requiredItemIds;
        uint256[] requiredItemAmounts;
        uint256 graceCost;
        HolyRelics.Rarity resultRarity;
        uint256 resultPower;
        string resultUri;
        uint256 successRateBp; // Basis points (10000 = 100%)
    }

    mapping(uint256 => Recipe) public recipes;
    uint256 public recipeCount;

    event Crafted(address indexed player, uint256 indexed recipeId, uint256 indexed resultTokenId, bool success);
    event FundsDistributed(uint256 total, uint256 daoAmount, uint256 devAmount);

    constructor(
        address _graceToken,
        address _sacredItems,
        address _holyRelics,
        address _daoTreasury,
        address _devWallet
    ) Ownable(msg.sender) {
        graceToken = GraceToken(_graceToken);
        sacredItems = SacredItems(_sacredItems);
        holyRelics = HolyRelics(_holyRelics);
        daoTreasury = _daoTreasury;
        devWallet = _devWallet;
    }

    /**
     * @dev Add a new crafting recipe.
     */
    function addRecipe(
        uint256[] memory itemIds,
        uint256[] memory amounts,
        uint256 graceCost,
        HolyRelics.Rarity rarity,
        uint256 power,
        string memory uri,
        uint256 successRateBp
    ) external onlyOwner {
        require(itemIds.length == amounts.length, "Arrays length mismatch");
        
        recipes[recipeCount] = Recipe({
            requiredItemIds: itemIds,
            requiredItemAmounts: amounts,
            graceCost: graceCost,
            resultRarity: rarity,
            resultPower: power,
            resultUri: uri,
            successRateBp: successRateBp
        });
        recipeCount++;
    }

    /**
     * @dev Craft a Holy Relic using items and GRACE tokens.
     */
    function craft(uint256 recipeId) external {
        Recipe memory recipe = recipes[recipeId];
        require(recipe.requiredItemAmounts.length > 0, "Recipe does not exist");

        // Burn GRACE tokens
        if (recipe.graceCost > 0) {
            graceToken.transferFrom(msg.sender, address(this), recipe.graceCost);
            // Distribute fees immediately or keep in contract?
            // PRD says burn or distribute. Let's distribute for now to simulate "Vault".
            _distributeFunds(recipe.graceCost);
        }

        // Burn Ingredients
        sacredItems.burnBatch(msg.sender, recipe.requiredItemIds, recipe.requiredItemAmounts);

        // Calculate Success
        // NOTE: In production, use Chainlink VRF for randomness.
        // This pseudo-randomness is unsafe for high stakes but sufficient for demo/dev.
        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.prevrandao))) % 10000;

        if (rand < recipe.successRateBp) {
            // Success: Mint Relic
            uint256 tokenId = holyRelics.safeMint(msg.sender, recipe.resultUri, recipe.resultRarity, recipe.resultPower);
            emit Crafted(msg.sender, recipeId, tokenId, true);
        } else {
            // Failure: Just emit event (ingredients already burned)
            emit Crafted(msg.sender, recipeId, 0, false);
        }
    }

    function _distributeFunds(uint256 amount) internal {
        uint256 daoAmount = (amount * DAO_SHARE_BP) / 10000;
        uint256 devAmount = amount - daoAmount;

        // Assuming GRACE is burnable, maybe we just burn it? 
        // Or if we treat it as revenue:
        graceToken.transfer(daoTreasury, daoAmount);
        graceToken.transfer(devWallet, devAmount);

        emit FundsDistributed(amount, daoAmount, devAmount);
    }
}
