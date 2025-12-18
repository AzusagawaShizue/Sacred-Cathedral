import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { IndexerModule } from './indexer/indexer.module';
import { MetadataModule } from './metadata/metadata.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    IndexerModule,
    MetadataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
