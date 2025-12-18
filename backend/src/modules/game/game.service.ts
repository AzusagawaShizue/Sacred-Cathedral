import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { InventoryItem } from './entities/inventory-item.entity';
import { UserService } from '../user/user.service';
import { RelayerService } from '../relayer/relayer.service';

const ITEM_ID_MAP: Record<string, number> = {
  wood: 1,
  candle: 2,
  scripture_fragment: 3,
  holy_water: 4,
};

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(InventoryItem)
    private inventoryRepository: Repository<InventoryItem>,
    private userService: UserService,
    private relayerService: RelayerService,
  ) {}

  async pray(address: string) {
    const hasSpirit = await this.userService.consumeSpirit(address, 1);
    if (!hasSpirit) {
      throw new BadRequestException('Not enough spirit');
    }

    const drop = this.calculateDrop();

    const user = await this.userService.findOrCreate(address);
    const item = this.inventoryRepository.create({
      user,
      itemId: drop.itemId,
      amount: drop.amount,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    await this.inventoryRepository.save(item);

    return {
      success: true,
      drop,
      remainingSpirit: user.spirit,
    };
  }

  private calculateDrop() {
    // Simple RNG: 
    // 80% Wood
    // 15% Candle
    // 5% Scripture Fragment
    const rand = Math.random();
    if (rand < 0.8) return { itemId: 'wood', amount: 1 };
    if (rand < 0.95) return { itemId: 'candle', amount: 1 };
    return { itemId: 'scripture_fragment', amount: 1 };
  }

  async getInventory(address: string) {
    const user = await this.userService.findOrCreate(address);
    return this.inventoryRepository.find({ where: { user: { address: user.address } } });
  }

  async withdraw(address: string) {
    const user = await this.userService.findOrCreate(address);
    const items = await this.inventoryRepository.find({ where: { user: { address: user.address } } });

    if (items.length === 0) {
      throw new BadRequestException('Inventory is empty');
    }

    // Group items by ID
    const groupedItems: Record<number, number> = {};
    items.forEach(item => {
      const tokenId = ITEM_ID_MAP[item.itemId];
      if (tokenId) {
        groupedItems[tokenId] = (groupedItems[tokenId] || 0) + item.amount;
      }
    });

    const mintPayload = Object.entries(groupedItems).map(([id, amount]) => ({
      id: Number(id),
      amount,
    }));

    if (mintPayload.length === 0) {
       throw new BadRequestException('No valid items to withdraw');
    }

    // Call Relayer
    const txHash = await this.relayerService.mintItems(address, mintPayload);

    // Delete items from DB on success
    // Note: In production, use a transaction or 'processed' flag to avoid data loss if DB delete fails
    await this.inventoryRepository.remove(items);

    return {
      success: true,
      txHash,
      minted: mintPayload,
    };
  }
}
