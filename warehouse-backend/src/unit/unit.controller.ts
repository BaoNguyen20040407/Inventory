import { Controller, Get, Post, Delete, Param, Body, Put } from "@nestjs/common";
import { UnitService } from "./unit.service";
import { Unit } from "./unit.entity";

@Controller('unit')
export class UnitController{
    constructor (private readonly unitService: UnitService) {}

    @Get()
    findAll() {
        return this.unitService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.unitService.findOne(+id);
    }

    @Post()
    create(@Body() data: Partial<Unit>) {
        return this.unitService.create(data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.unitService.remove(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<Unit>) {
        return this.unitService.update(+id, data);
    }
}