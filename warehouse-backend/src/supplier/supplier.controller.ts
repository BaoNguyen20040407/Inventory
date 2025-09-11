import { Controller, Get, Post, Body } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.entity';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  create(@Body() body: Partial<Supplier>) {
    return this.supplierService.create(body);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }
}
