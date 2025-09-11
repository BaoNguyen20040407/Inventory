import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepo: Repository<Supplier>,
  ) {}

  create(data: Partial<Supplier>) {
    const supplier = this.supplierRepo.create(data);
    return this.supplierRepo.save(supplier);
  }

  findAll() {
    return this.supplierRepo.find();
  }

  async findOne(id: number) {
    const supplier = await this.supplierRepo.findOneBy({ id });
    if (!supplier) {
      throw new NotFoundException(`Supplier ${id} not found`);
    }
    return supplier;
  }

  async remove(id: number) {
    const supplier = await this.supplierRepo.findOneBy({ id });
    if (!supplier) {
      throw new NotFoundException(`Supplier ${id} not found`);
    }
    return this.supplierRepo.remove(supplier);
  }

  async update(id: number, data: Partial<Supplier>) {
    const supplier = await this.supplierRepo.findOneBy({ id });
    if (!supplier) {
      throw new NotFoundException(`Supplier ${id} not found`);
    }
  
    Object.assign(supplier, data); // gộp dữ liệu mới vào object cũ
    return this.supplierRepo.save(supplier);
  }  
}
