// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'Sách', quantity: 100, price: 20000 },
    { id: 2, name: 'Bút bi', quantity: 200, price: 5000 },
    { id: 3, name: 'Vở học sinh', quantity: 150, price: 12000 },
  ];

  findAll(): Product[] {
    return this.products;
  }

  importProduct(id: number, quantity: number): Product | undefined {
    const product = this.products.find((p) => p.id === id);
    if (product) product.quantity += quantity;
    return product;
  }

  exportProduct(id: number, quantity: number): Product | undefined {
    const product = this.products.find((p) => p.id === id);
    if (product && product.quantity >= quantity) {
      product.quantity -= quantity;
    }
    return product;
  }
}
