import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne('' + id);
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<string> {
    return this.userService.create(body);
  }

  @Patch(':id')
  async edit(
    @Param('id') id: string,
    @Body() editUser: UpdateUserDto,
  ): Promise<string> {
    return this.userService.edit(id, editUser);
  }

  @Delete(':id')
  async delete(id: string): Promise<string> {
    return this.userService.delete(id);
  }
}
