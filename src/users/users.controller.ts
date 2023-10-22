import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async edit(
    @Param('id') id: string,
    @Body() editUser: UpdateUserDto,
  ): Promise<string> {
    return this.userService.edit(id, editUser);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.userService.delete(id);
  }
}
