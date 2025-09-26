// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';
import { Supplier } from '../supplier/supplier.entity';
import { Repository, DeepPartial } from 'typeorm';
import { Warehouse } from 'src/warehouse/warehouse.entity';
import { Unit } from 'src/unit/unit.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Supplier) private supplierRepo: Repository<Supplier>,
    @InjectRepository(Warehouse) private warehouseRepo: Repository<Warehouse>,
    @InjectRepository(Unit) private unitRepo: Repository<Unit>
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['category', 'supplier', 'warehouse', 'unit'] });
  }

  findOne(id: number) {
    return this.productRepo.findOne({ where: { id }, relations: ['category', 'supplier', 'warehouse' , 'unit'] });
  }

  async create(data: any) {
    let category: Category | null = null;
    let supplier: Supplier | null = null;
    let warehouse: Warehouse | null = null; 
    let unit: Unit | null = null;
  
    // FE gửi { category: { id: 3 } }
    if (data.category?.id) {
      category = await this.categoryRepo.findOne({ where: { id: data.category.id } });
    }
  
    // FE gửi { supplier: { id: 1 } }
    if (data.supplier?.id) {
      supplier = await this.supplierRepo.findOne({ where: { id: data.supplier.id } });
    }

    if (data.warehouse?.id) {
      warehouse = await this.warehouseRepo.findOne({ where: { id: data.warehouse.id }})
    }

    if (data.unit?.id) {
      unit = await this.unitRepo.findOne({ where: { id: data.unit.id }})
    }
  
    const product: Partial<Product> = {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      category: category || undefined,
      supplier: supplier || undefined,
      warehouse: warehouse || undefined,
      unit: unit || undefined,
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
