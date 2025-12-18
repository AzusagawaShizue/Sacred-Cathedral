import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOrCreate(address: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { address } });
    if (!user) {
      user = this.userRepository.create({ address });
      await this.userRepository.save(user);
    }
    return user;
  }

  async getProfile(address: string): Promise<User> {
    return this.findOrCreate(address);
  }

  async consumeSpirit(address: string, amount: number): Promise<boolean> {
    const user = await this.findOrCreate(address);
    this.checkAndResetSpirit(user);

    if (user.spirit < amount) {
      return false;
    }

    user.spirit -= amount;
    await this.userRepository.save(user);
    return true;
  }

  private checkAndResetSpirit(user: User) {
    const now = new Date();
    const lastReset = new Date(user.lastSpiritReset);
    
    // Check if it's a new day (UTC)
    if (now.getUTCDate() !== lastReset.getUTCDate() || 
        now.getUTCMonth() !== lastReset.getUTCMonth() || 
        now.getUTCFullYear() !== lastReset.getUTCFullYear()) {
      user.spirit = user.maxSpirit;
      user.lastSpiritReset = now;
    }
  }
}
