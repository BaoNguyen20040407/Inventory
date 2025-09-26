import { Product } from 'src/products/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('UNIT')
export class Unit{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string; 

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}