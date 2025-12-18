import { Module } from '@nestjs/common';
import { IndexerService } from './indexer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [IndexerService],
  exports: [IndexerService],
})
export class IndexerModule {}
