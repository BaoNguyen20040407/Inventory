// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Supplier } from '../supplier/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Supplier])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
