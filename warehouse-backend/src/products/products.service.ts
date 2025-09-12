// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';
import { Supplier } from '../supplier/supplier.entity';
import { Repository, DeepPartial } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Supplier) private supplierRepo: Repository<Supplier>,
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['category', 'supplier'] });
  }

  findOne(id: number) {
    return this.productRepo.findOne({ where: { id }, relations: ['category', 'supplier'] });
  }

  async create(data: any) {
    let category: Category | null = null;
    let supplier: Supplier | null = null;
  
    // FE gửi { category: { id: 3 } }
    if (data.category?.id) {
      category = await this.categoryRepo.findOne({ where: { id: data.category.id } });
    }
  
    // FE gửi { supplier: { id: 1 } }
    if (data.supplier?.id) {
      supplier = await this.supplierRepo.findOne({ where: { id: data.supplier.id } });
    }
  
    const product: Partial<Product> = {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      category: category || undefined,
      supplier: supplier || undefined,
    };
  
    return this.productRepo.save(product);
  }  
  
  update(id: number, data: Partial<Product>) {
    return this.productRepo.update(id, data);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
