import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItem } from './entities/inventory-item.entity';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { UserModule } from '../user/user.module';
import { RelayerModule } from '../relayer/relayer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryItem]),
    UserModule,
    RelayerModule,
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
