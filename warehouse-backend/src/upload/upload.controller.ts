import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), // 👈 CỰC KỲ QUAN TRỌNG
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log("📥 FILE RECEIVED:", file);

    return this.uploadService.uploadImage(file);
  }
}