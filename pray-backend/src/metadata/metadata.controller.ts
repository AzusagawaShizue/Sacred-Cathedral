import { Controller, Post, Get, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MetadataService } from './metadata.service';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    // Note: In a real app, 'file' might need buffer conversion or stream
    const cid = await this.metadataService.uploadFile(file.buffer, file.originalname);
    return { cid };
  }

  @Post('upload/json')
  async uploadJson(@Body() body: any) {
    const cid = await this.metadataService.uploadMetadata(body);
    await this.metadataService.saveMetadataToDb(cid, body);
    return { cid };
  }

  @Get(':cid')
  async getMetadata(@Param('cid') cid: string) {
    return this.metadataService.getMetadata(cid);
  }
}
