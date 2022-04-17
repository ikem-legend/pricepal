import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() body): Promise<string> {
    return this.userService.create(body);
  }

  @Patch(':id')
  async edit(@Param('id') id: string, @Body() editUser): Promise<string> {
    return this.userService.edit(editUser);
  }

  @Delete(':id')
  async delete(id: string): Promise<string> {
    return this.userService.delete(id);
  }
}
