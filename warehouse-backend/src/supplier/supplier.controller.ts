import { Controller, Get, Post, Delete, Param, Body, Put } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.entity';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<Supplier>) {
    return this.supplierService.create(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Supplier>) {
    return this.supplierService.update(+id, data);
  }
}
