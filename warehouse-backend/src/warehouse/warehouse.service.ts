import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './warehouse.entity';
import { Category } from 'src/category/category.entity';

@Injectable()
export class WarehouseService {
    constructor(
        @InjectRepository(Warehouse)
        private warehouseRepo: Repository<Warehouse>
    ) {}

    create(data: Partial<Warehouse>) {
        const warehouse = this.warehouseRepo.create(data);
        return this.warehouseRepo.save(warehouse);
    }

    findAll() {
        return this.warehouseRepo.find();
    }

    async findOne(id: number) {
        const warehouse = await this.warehouseRepo.findOneBy({ id });
        if(!warehouse) {
            throw new NotFoundException(`Warehouse ${id} not found`);
        }
        return warehouse;
    }

    async remove(id: number) {
        const warehouse = await this.warehouseRepo.findOneBy({ id });
        if (!warehouse) {
            throw new NotFoundException(`Warehouse ${id} not found`);
        }
        return this.warehouseRepo.remove(warehouse);
    }

    async update(id: number, data: Partial<Warehouse>) {
        const warehouse = await this.warehouseRepo.findOneBy({ id });
        if (!warehouse) {
            throw new NotFoundException(`Warehouse ${id} not found`);
        }
        Object.assign(warehouse, data);
        return this.warehouseRepo.save(warehouse);
    }
}