import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { Category } from './category/category.entity';
import { Supplier } from './supplier/supplier.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'warehouse',
      entities: [Product, Category, Supplier],
      synchronize: false,
    }),
    ProductsModule,
  ],
})
export class AppModule {}
