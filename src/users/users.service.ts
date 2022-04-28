import { Injectable } from '@nestjs/common';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly userModel = [];

  async findAll(): Promise<Users[]> {
    return this.userModel;
  }

  async create(user: CreateUserDto) {
    this.userModel.push(user);
    return 'Successfully created user';
  }

  async edit(editUser: Users) {
    const userIndex = this.userModel.findIndex(
      (user) => user.username == editUser.username,
    );
    this.userModel.splice(userIndex, 1, editUser);
    return 'Successfully edited user';
  }

  async delete(id: string) {
    this.userModel.filter((user) => user.username !== id);
    return 'Successfully deleted user';
  }
}
