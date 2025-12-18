# Pray1209 Backend Service

High-performance Game Server and Relayer for Pray1209, built with NestJS and Fastify.

## Features

- **High Performance**: Uses Fastify adapter for maximum throughput (1000+ TPS capable).
- **Game Logic**: Prayer mechanics, RNG drops, Spirit (energy) system, Temporary Inventory.
- **Anti-Cheat**: Rate limiting (Redis-based) and Device Fingerprinting.
- **Blockchain Integration**: 
  - Relayer service for gasless minting (ERC-4337 ready).
  - VRF Event Listener for fair rare drops.
- **Database**: PostgreSQL for persistence, Redis for caching/queues.

## Prerequisites

- Node.js v18+
- Docker & Docker Compose (for DB/Redis)

## Installation

```bash
cd backend
npm install
```

## Configuration

Copy `.env.example` (or create `.env`) and configure:

```env
PORT=3000
DATABASE_URL=postgresql://admin:password@localhost:5432/pray_db
REDIS_HOST=localhost
REDIS_PORT=6379
RELAYER_PRIVATE_KEY=your_private_key
RPC_URL=https://sepolia.base.org
SACRED_ITEMS_ADDRESS=0x...
```

## Running the app

1. Start Infrastructure (Postgres + Redis):
```bash
docker-compose up -d
```

2. Start the server:
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API Documentation

Swagger UI is available at `http://localhost:3000/api` when the server is running.

## Architecture

- **Modules**:
  - `GameModule`: Core gameplay (Pray, Inventory).
  - `UserModule`: User profile, Spirit management.
  - `RelayerModule`: Blockchain interactions (Minting, VRF).
  - `AuthModule`: Authentication (Placeholder).
- **Guards**:
  - `CustomThrottlerGuard`: Limits requests based on IP and Device ID.
