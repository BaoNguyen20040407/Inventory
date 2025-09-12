import { Controller, Get, Post, Delete, Param, Body, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Category } from "./category.entity";

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(+id);
    }

    @Post()
    create(@Body() data: Partial<Category>) {
        return this.categoryService.create(data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoryService.remove(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: Partial<Category>) {
        return this.categoryService.update(+id, data);
    }
}