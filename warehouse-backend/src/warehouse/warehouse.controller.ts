import { Controller, Get, Post, Delete, Param, Body, Put} from "@nestjs/common";
import { WarehouseService } from "./warehouse.service";
import { Warehouse } from "./warehouse.entity";

@Controller('WAREHOUSE')
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) {}

    @Get()
    findAll() {
        return this.warehouseService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.warehouseService.findOne(+id);
    }

    @Post()
    create(@Body() data: Partial<Warehouse>){
        return this.warehouseService.create(data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.warehouseService.remove(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<Warehouse>) {
        return this.warehouseService.update(+id, data);
    }
}