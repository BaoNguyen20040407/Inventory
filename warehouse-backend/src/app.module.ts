import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { Category } from './category/category.entity';
import { Supplier } from './supplier/supplier.entity';
import { ProductsModule } from './products/products.module';
import { SupplierModule } from './supplier/supplier.module';
import { CategoryModule } from './category/category.module';
import { InventoryModule } from './inventory/inventory.module';
import { Inventory } from './inventory/inventory.entity';
import { Warehouse } from './warehouse/warehouse.entity';
import { WarehouseModule } from './warehouse/warehouse.module';
import { Unit } from './unit/unit.entity';
import { UnitModule } from './unit/unit.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
    
      entities: [Product, Category, Supplier, Inventory, Warehouse, Unit, User],
    
      synchronize: true,
    
      autoLoadEntities: true,
    
      ssl: {
        rejectUnauthorized: false,
      },
    
      logging: true,
    }),
    ProductsModule,
    SupplierModule,
    CategoryModule,
    InventoryModule,
    WarehouseModule,
    UnitModule,
    UsersModule,
    AuthModule,
    UploadModule
  ],
})
export class AppModule {}
