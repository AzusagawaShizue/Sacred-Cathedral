# Pray1209 Monorepo

Welcome to the Pray1209 project monorepo. This repository contains the source code for the entire Pray1209 ecosystem, including the frontend, backend services, and smart contracts.

## Project Structure

The project is organized into the following workspaces:

-   **`frontend/`**: The React-based web application (Vite + Tailwind CSS).
-   **`backend/`**: The main Game Server and Relayer service (NestJS). Handles game logic, inventory, and blockchain transactions.
-   **`pray-backend/`**: The Indexer and Data Service (NestJS + Prisma). Indexes blockchain events and provides data APIs.
-   **`contracts/`**: Smart Contracts (Hardhat). Solidity contracts for the game economy.

## Quick Start

### Prerequisites

-   Node.js (v18+)
-   npm (v9+) or pnpm

### Installation

Install dependencies for all workspaces from the root:

```bash
npm install
```

### Running the Project (Development)

You can run individual services using the root scripts:

1.  **Smart Contracts (Local Node)**
    ```bash
    cd contracts
    npx hardhat node
    # In a new terminal, deploy contracts:
    npx hardhat run scripts/deploy.ts --network localhost
    ```

2.  **Frontend**
    ```bash
    npm run dev:frontend
    ```
    Access at `http://localhost:5173`

3.  **Game Server (Backend)**
    ```bash
    npm run dev:backend
    ```
    Access API at `http://localhost:3000`

4.  **Indexer Service**
    ```bash
    npm run dev:indexer
    ```
    Access API at `http://localhost:3001`

## Workspaces Detail

### Frontend
Built with React, Vite, Tailwind CSS, and RainbowKit/Wagmi for Web3 integration.
-   Location: `./frontend`

### Backend (Game Server)
Built with NestJS. Handles off-chain game logic (spirit system, drop rates) and relays transactions for gasless experiences.
-   Location: `./backend`
-   Database: SQLite (local dev) / PostgreSQL (prod)

### Indexer (Pray-Backend)
Built with NestJS and Prisma. Indexes events from the blockchain to provide fast queries for user inventory and history.
-   Location: `./pray-backend`
-   Database: SQLite (local dev)

### Contracts
Hardhat project containing the Solidity smart contracts: `GraceToken`, `SacredItems`, `HolyRelics`, etc.
-   Location: `./contracts`

## Development Notes

-   **Monorepo**: This project uses npm workspaces. Dependencies are hoisted to the root `node_modules` where possible.
-   **Environment**: Check `.env` files in each workspace for configuration.
