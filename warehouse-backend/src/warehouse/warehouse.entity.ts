import { Product } from 'src/products/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

@Entity('WAREHOUSE')
export class Warehouse{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    manager: string; 

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}