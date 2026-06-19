import { Injectable } from '@nestjs/common';
import cloudinary from '../config/cloudinary.config';
import { CloudinaryUploadResult } from './cloudinary-result.interface';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      
      if (!file?.buffer) {
        return reject('File buffer is empty');
      }

      const stream = cloudinary.uploader.upload_stream(
        { folder: 'products' },
        (error, result) => {
          if (error) {
            console.error('CLOUDINARY ERROR:', error);
            return reject(error);
          }

          if (!result) {
            return reject('Cloudinary returned empty result');
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        },
      );

      stream.end(file.buffer);
    });
  }
}