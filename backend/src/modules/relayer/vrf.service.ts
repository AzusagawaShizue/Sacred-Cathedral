import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class VrfService implements OnModuleInit {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  private readonly logger = new Logger(VrfService.name);

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('RPC_URL');
    const contractAddress = this.configService.get<string>('VRF_CONTRACT_ADDRESS');

    if (rpcUrl && contractAddress) {
      this.provider = new ethers.JsonRpcProvider(rpcUrl);
      
      const abi = [
        "event RandomnessFulfilled(uint256 requestId, uint256[] randomWords)"
      ];
      
      this.contract = new ethers.Contract(contractAddress, abi, this.provider);
    }
  }

  onModuleInit() {
    if (this.contract) {
      this.logger.log('Starting VRF Event Listener...');
      this.contract.on('RandomnessFulfilled', (requestId, randomWords) => {
        this.handleRandomnessFulfilled(requestId, randomWords);
      });
    }
  }

  async handleRandomnessFulfilled(requestId: bigint, randomWords: bigint[]) {
    this.logger.log(`VRF Fulfilled! Request: ${requestId}, Words: ${randomWords.join(', ')}`);
    
    // TODO: 
    // 1. Find the pending "Open Box" request by requestId
    // 2. Use randomWords[0] to determine the item
    // 3. Update DB / Mint item
  }
}
