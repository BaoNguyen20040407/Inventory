import { Controller, Get, Delete, Param } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}