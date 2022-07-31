import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { generateConfirmationToken } from '../helpers/utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const passwordCompare = await compare(pass, user.password);
    if (!passwordCompare) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User) {
    const saltRounds = Number(this.configService.get('saltRounds', 10));
    user.password = await hash(user.password, saltRounds);
    user.confirmationToken = generateConfirmationToken();
    const userExists = await this.userService.findOneByEmail(user.email);
    if (userExists) {
      throw new BadRequestException(
        'Error creating user',
        'Email already exists',
      );
    } else {
      try {
        await this.userService.create(user);
        return 'Successfully created user';
      } catch (err) {
        throw new InternalServerErrorException(
          'Error creating user. Please try again',
        );
      }
    }
  }
}
