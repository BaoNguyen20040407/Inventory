import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('SUPPLIER')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 200, nullable: true })
  address: string;

  @Column({ length: 15, unique: true, nullable: true })
  phone: string;

  @OneToMany(() => Product, product => product.supplier)
  products: Product[];
}
