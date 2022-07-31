import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(user: CreateUserDto) {
    const newUser = await this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async edit(id: string, editUser: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id: +id,
      ...editUser,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.save(user);
    return 'Successfully edited user';
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return 'Successfully deleted user';
  }
}
