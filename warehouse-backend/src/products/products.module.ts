import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Supplier } from '../supplier/supplier.entity';
import { Category } from '../category/category.entity';
import { Warehouse } from 'src/warehouse/warehouse.entity';
import { Unit } from 'src/unit/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Supplier, Warehouse, Unit])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
