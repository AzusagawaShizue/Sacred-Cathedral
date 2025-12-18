# Pray1209 Smart Contracts

This directory contains the smart contracts for the Pray1209 ecosystem.

## Contracts Overview

### 1. `$GRACE` Token (`GraceToken.sol`)
- **Standard**: ERC-20
- **Features**: Burnable, AccessControl
- **Usage**: Main utility token for crafting, purchasing, and rewards.

### 2. Sacred Items (`SacredItems.sol`)
- **Standard**: ERC-1155
- **Features**: Batch Minting/Burning, AccessControl
- **Usage**: Game items like Wood, Candles, Scripture Fragments.
- **IDs**:
  - `1`: Wood
  - `2`: Candle
  - `3`: Scripture Fragment
  - `4`: Holy Water

### 3. Holy Relics (`HolyRelics.sol`)
- **Standard**: ERC-721
- **Features**: URIStorage, AccessControl, Dynamic Metadata (Inscription)
- **Usage**: Rare/Legendary items crafted from Sacred Items.
- **Rarity**: Common, Rare, Legendary.

### 4. Gameplay Logic (`GameplayLogic.sol`)
- **Features**:
  - **The Foundry**: Crafting system where players burn Items + GRACE to mint Relics.
  - **Charity Vault**: Distributes spent GRACE between DAO Treasury (50%) and Dev Wallet (50%).
  - **Recipe Management**: Owner can add new crafting recipes dynamically.

## Development

### Prerequisites
- Node.js
- npm

### Installation
```bash
npm install
```

### Compile
```bash
npx hardhat compile
```

### Test
```bash
npx hardhat test
```

### Deploy
To deploy to Sepolia testnet:
1. Create a `.env` file with `SEPOLIA_RPC_URL` and `PRIVATE_KEY`.
2. Run:
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

## Security & Architecture
- **Access Control**: All minting/burning privileges are restricted to the `GameplayLogic` contract or Admin.
- **Upgradeability**: Currently immutable. Logic updates would require deploying a new `GameplayLogic` contract and migrating roles.
- **Randomness**: Uses pseudo-randomness (`keccak256`) for crafting success rates. **Note: For Mainnet, integrate Chainlink VRF.**
