// src/products/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Supplier } from '../supplier/supplier.entity';
import { Category } from '../category/category.entity';
import { Warehouse } from 'src/warehouse/warehouse.entity';
import { Unit } from 'src/unit/unit.entity';

@Entity('PRODUCT')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('int', { default: 0 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, category => category.products, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;
  
  @ManyToOne(() => Supplier, supplier => supplier.products, { nullable: true })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @ManyToOne(() => Warehouse, warehouse => warehouse.products, { nullable: true })
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: Warehouse;

  @ManyToOne(() => Unit, unit => unit.products, {nullable: true})
  @JoinColumn({ name: 'unit_id'})
  unit: Unit;
}
