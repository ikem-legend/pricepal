import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { compare, hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { generateConfirmationToken } from '../helpers/utils';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserCreatedEvent } from '../users/events/user-created.event';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private eventEmitter: EventEmitter2,
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

  async login(user: LoginUserDto & { id: string }) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    const saltRounds = Number(this.configService.get('saltRounds', 10));
    const hashedPassword = await hash(user.password, saltRounds);
    const confirmationToken = generateConfirmationToken();
    const updatedUser = {
      ...user,
      password: hashedPassword,
      confirmationToken,
    };
    const userExists = await this.userService.findOneByEmail(updatedUser.email);
    if (userExists) {
      throw new BadRequestException(
        'Error creating user',
        'Email already exists',
      );
    } else {
      try {
        await this.userService.create(updatedUser);
        const userCreatedEvent = new UserCreatedEvent();
        userCreatedEvent.name = updatedUser.firstName;
        userCreatedEvent.email = updatedUser.email;
        userCreatedEvent.token = updatedUser.confirmationToken;
        this.eventEmitter.emit('user.created', userCreatedEvent);
        return 'Successfully created user';
      } catch (err) {
        throw new InternalServerErrorException(
          'Error creating user. Please try again',
        );
      }
    }
  }
}
