import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Unit } from './unit.entity';

@Injectable()
export class UnitService{
    constructor(
        @InjectRepository(Unit)
        private unitRepo: Repository<Unit>,
    ) {}

    create(data: Partial<Unit>) {
        const unit = this.unitRepo.create(data);
        return this.unitRepo.save(unit);
    }

    findAll(){
        return this.unitRepo.find();
    }

    async findOne(id: number) {
        const unit = await this.unitRepo.findOneBy({ id });
        if (!unit) {
            throw new NotFoundException(`Unit ${id} not found`);
        }
        return unit; 
    }

    async remove(id: number) {
        const unit = await this.unitRepo.findOneBy({ id });
        if (!unit) {
            throw new NotFoundException(`Unit ${id} not found`);
        }
        return this.unitRepo.remove(unit);
    }

    async update(id: number, data: Partial<Unit>) {
        const unit = await this.unitRepo.findOneBy({ id });
        if (!unit) {
            throw new NotFoundException(`Unit ${id} not found`);
        }
        Object.assign(unit, data); //gộp dữ liệu mới vào object cũ
        return this.unitRepo.save(unit);
    }
}