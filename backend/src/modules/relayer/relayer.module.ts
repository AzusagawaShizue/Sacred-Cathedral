import { Module } from '@nestjs/common';
import { RelayerService } from './relayer.service';
import { VrfService } from './vrf.service';

@Module({
  providers: [RelayerService, VrfService],
  exports: [RelayerService, VrfService],
})
export class RelayerModule {}
