import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class RelayerService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;
  private readonly logger = new Logger(RelayerService.name);

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('RPC_URL');
    const privateKey = this.configService.get<string>('RELAYER_PRIVATE_KEY');
    const contractAddress = this.configService.get<string>('SACRED_ITEMS_ADDRESS');

    if (rpcUrl && privateKey && contractAddress) {
      this.provider = new ethers.JsonRpcProvider(rpcUrl);
      this.wallet = new ethers.Wallet(privateKey, this.provider);
      
      const abi = [
        "function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public"
      ];
      
      this.contract = new ethers.Contract(contractAddress, abi, this.wallet);
    } else {
        this.logger.warn('Relayer not configured: Missing env vars');
    }
  }

  async mintItems(to: string, items: { id: number; amount: number }[]) {
    if (!this.contract) {
        throw new Error('Relayer not configured');
    }

    const ids = items.map(i => i.id);
    const amounts = items.map(i => i.amount);
    const data = "0x";

    try {
      this.logger.log(`Minting items for ${to}: ${JSON.stringify(items)}`);
      const tx = await this.contract.mintBatch(to, ids, amounts, data);
      this.logger.log(`Transaction sent: ${tx.hash}`);
      
      // Wait for confirmation (optional, or use queue)
      // await tx.wait();
      
      return tx.hash;
    } catch (error) {
      this.logger.error(`Failed to mint items: ${error.message}`, error.stack);
      throw error;
    }
  }
}
