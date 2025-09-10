// src/products/products.controller.ts
import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Lấy danh sách tất cả sản phẩm
  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  // Nhập kho (+ quantity)
  @Patch(':id/import')
  importProduct(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ): Product | undefined {
    return this.productsService.importProduct(+id, quantity);
  }

  // Xuất kho (- quantity)
  @Patch(':id/export')
  exportProduct(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ): Product | undefined {
    return this.productsService.exportProduct(+id, quantity);
  }
}
