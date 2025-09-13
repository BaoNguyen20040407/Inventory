import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Product } from '../products/product.entity';

@Entity('INVENTORY')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({
    type: 'enum',
    enum: ['Import', 'Export'],
  })
  type: 'Import' | 'Export';

  @Column({type: 'varchar', length: 255, nullable: true})
  reason: string;

  @CreateDateColumn({name: 'created'})
  created: Date;
}
