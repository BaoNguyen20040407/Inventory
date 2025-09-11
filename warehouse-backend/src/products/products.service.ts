// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';   // <- Bắt buộc
import { Repository } from 'typeorm';               // <- Bắt buộc
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  findAll() { return this.productRepo.find({ relations: ['category', 'supplier'] }); }

  findOne(id: number) { 
    return this.productRepo.findOne({ where: { id }, relations: ['category', 'supplier'] });
  }

  create(data: Partial<Product>) { 
    return this.productRepo.save(this.productRepo.create(data)); 
  }

  update(id: number, data: Partial<Product>) { 
    return this.productRepo.update(id, data); 
  }

  remove(id: number) { 
    return this.productRepo.delete(id); 
  }
}
