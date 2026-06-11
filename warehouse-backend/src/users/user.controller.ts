import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(
      Number(id),
    );
  }

  @Post()
  create(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: any,
  ) {
    return this.usersService.update(
      Number(id),
      body,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.deleteUser(
      Number(id),
    );
  }
}