import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { createPublicClient, http, PublicClient, parseAbiItem } from 'viem';
import { hardhat, baseSepolia } from 'viem/chains';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class IndexerService implements OnModuleInit {
  private readonly logger = new Logger(IndexerService.name);
  private client: PublicClient;
  private isIndexing = false;
  private readonly BATCH_SIZE = 100n;
  private readonly POLLING_INTERVAL = 5000; // 5 seconds

  // Contract Addresses (Should be in ENV)
  private contracts = {
    GraceToken: process.env.GRACE_TOKEN_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    SacredItems: process.env.SACRED_ITEMS_ADDRESS || '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    HolyRelics: process.env.HOLY_RELICS_ADDRESS || '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    GameplayLogic: process.env.GAMEPLAY_LOGIC_ADDRESS || '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  };

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    const transport = http(this.config.get('RPC_URL') || 'http://127.0.0.1:8545');
    this.client = createPublicClient({
      chain: hardhat, // Make configurable
      transport,
    }) as any;
  }

  async onModuleInit() {
    this.logger.log('Indexer Service initialized');
    this.startIndexingLoop();
    this.startTreasuryMonitoring();
  }

  private async startIndexingLoop() {
    setInterval(async () => {
      if (this.isIndexing) return;
      this.isIndexing = true;
      try {
        await this.indexBlocks();
      } catch (error) {
        this.logger.error('Error in indexing loop', error);
      } finally {
        this.isIndexing = false;
      }
    }, this.POLLING_INTERVAL);
  }

  private async indexBlocks() {
    const chainId = await this.client.getChainId();
    
    // Get last indexed block
    let state = await this.prisma.indexerState.findUnique({
      where: { chainId },
    });

    if (!state) {
      state = await this.prisma.indexerState.create({
        data: {
          chainId,
          lastBlock: 0n, // Start from genesis or config
        },
      });
    }

    const currentBlock = await this.client.getBlockNumber();
    const fromBlock = state.lastBlock + 1n;
    
    if (fromBlock > currentBlock) {
      return; // Up to date
    }

    const toBlock = fromBlock + this.BATCH_SIZE > currentBlock ? currentBlock : fromBlock + this.BATCH_SIZE;

    this.logger.log(`Indexing blocks ${fromBlock} to ${toBlock}`);

    // Fetch logs
    const logs = await this.client.getLogs({
      fromBlock,
      toBlock,
    });

    // Process logs
    for (const log of logs) {
      await this.prisma.contractEvent.create({
        data: {
          chainId,
          blockNumber: log.blockNumber,
          transactionHash: log.transactionHash,
          contractAddress: log.address,
          eventName: 'Unknown', // Need to decode to get real name
          args: JSON.parse(JSON.stringify(log)), // Raw log for now
        },
      });
      // Here we would decode specific events (Transfer, Prayer, etc.) and update other tables
    }

    // Update state
    await this.prisma.indexerState.update({
      where: { chainId },
      data: { lastBlock: toBlock },
    });
  }

  private async startTreasuryMonitoring() {
    // Monitor Treasury Balance periodically
    setInterval(async () => {
      try {
        const treasuryAddress = process.env.TREASURY_ADDRESS;
        if (!treasuryAddress) return;

        const balance = await this.client.getBalance({
            address: treasuryAddress as `0x${string}`,
        });

        await this.prisma.treasurySnapshot.create({
            data: {
                balance: balance.toString(),
                currency: 'ETH',
            }
        });
      } catch (e) {
        this.logger.error('Error monitoring treasury', e);
      }
    }, 60000); // Every minute
  }
}
