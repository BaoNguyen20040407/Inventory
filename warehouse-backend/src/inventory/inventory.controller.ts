import { Controller, Get, Post, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './inventory.dto';
import { Inventory } from './inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async findAll(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateInventoryDto): Promise<Inventory> {
    return this.inventoryService.create(dto);
  }

  @Get('movements')
  async getMovements(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
  }
}
