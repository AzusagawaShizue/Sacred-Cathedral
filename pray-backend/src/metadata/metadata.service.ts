import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';
import * as FormData from 'form-data';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MetadataService {
  private readonly logger = new Logger(MetadataService.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  /**
   * Uploads file to IPFS (Mock/Pinata implementation)
   */
  async uploadFile(file: Buffer, filename: string): Promise<string> {
    // In a real implementation, use Pinata SDK or generic IPFS node
    // For now, we simulate or check if API key is present
    const pinataJwt = this.config.get('PINATA_JWT');
    if (!pinataJwt) {
      this.logger.warn('PINATA_JWT not set, returning mock CID');
      return `ipfs://mock-cid-${Date.now()}`;
    }

    try {
      const data = new FormData();
      data.append('file', file, filename);
      
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
        headers: {
          'Authorization': `Bearer ${pinataJwt}`,
          ...data.getHeaders()
        },
        maxBodyLength: Infinity
      });
      
      return `ipfs://${res.data.IpfsHash}`;
    } catch (error) {
      this.logger.error('Failed to upload to IPFS', error);
      throw new Error('IPFS Upload Failed');
    }
  }

  async uploadMetadata(metadata: any): Promise<string> {
     const pinataJwt = this.config.get('PINATA_JWT');
    if (!pinataJwt) {
      return `ipfs://mock-metadata-cid-${Date.now()}`;
    }

    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', metadata, {
        headers: {
          'Authorization': `Bearer ${pinataJwt}`,
          'Content-Type': 'application/json'
        }
      });
      return `ipfs://${res.data.IpfsHash}`;
    } catch (error) {
       this.logger.error('Failed to upload metadata', error);
       throw new Error('IPFS Metadata Upload Failed');
    }
  }

  async saveMetadataToDb(cid: string, metadata: any) {
    return this.prisma.nftMetadata.create({
      data: {
        id: cid,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        attributes: metadata.attributes ?? {},
      }
    });
  }

  async getMetadata(cid: string) {
    return this.prisma.nftMetadata.findUnique({
      where: { id: cid }
    });
  }
}
