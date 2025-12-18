# Pray1209 Backend Service

## Architecture
- **Framework**: NestJS (Modular, scalable)
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis (configured in docker-compose)
- **Indexer**: Custom IndexerService using Viem to listen to chain events and track block heights.
- **Metadata**: IPFS integration (Pinata) for NFT metadata storage.

## Modules
1. **Indexer Module**: 
   - Polls blockchain events (configurable interval).
   - Tracks last indexed block in DB.
   - Monitors Treasury balance.
2. **Metadata Module**:
   - Uploads images and JSON to IPFS.
   - Stores metadata references in DB for fast access.
3. **Prisma Module**:
   - Database connection management.

## Setup
1. Copy `.env.example` to `.env` (already done).
2. Start Database:
   ```bash
   docker-compose up -d
   ```
3. Run Migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Start Server:
   ```bash
   npm run start:dev
   ```

## API Endpoints
- `POST /metadata/upload/image`: Upload image to IPFS.
- `POST /metadata/upload/json`: Upload metadata JSON to IPFS.
- `GET /metadata/:cid`: Get metadata from DB.
