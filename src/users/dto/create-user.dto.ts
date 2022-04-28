import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsAlpha()
  @MinLength(3, {
    message:
      'First name is too short. Minimum length is $constraint1 characters, but actual length is $value',
  })
  @MaxLength(20, {
    message:
      'First name is too long. Maximum length is $constraint1 characters, but actual length is $value',
  })
  readonly firstName: string;

  @IsString()
  @IsAlpha()
  @MinLength(3, {
    message:
      'Last name is too short. Minimum length is $constraint1 characters, but actual length is $value',
  })
  @MaxLength(20, {
    message:
      'Last name is too long. Maximum length is $constraint1 characters, but actual length is $value',
  })
  readonly lastName: string;

  @IsString()
  @IsAlpha()
  @MinLength(3, {
    message:
      'Username is too short. Minimum length is $constraint1 characters, but actual length is $value',
  })
  @MaxLength(30, {
    message:
      'Username is too long. Maximum length is $constraint1 characters, but actual length is $value',
  })
  readonly username: string;

  @IsPhoneNumber()
  @MinLength(11, {
    message: 'Phone number is too short',
  })
  @MaxLength(15, {
    message: 'Phone number is too long',
  })
  readonly phone: string;

  @IsEmail()
  @MaxLength(254, {
    message:
      'Email is too long. Maximum length is $constraint1 characters, but actual length is $value',
  })
  readonly email: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, {
    message:
      'Password must contain at least 1 lowercase, 1 uppercase, 1 number and 8 characters',
  })
  readonly password: string;

  @IsISO8601()
  readonly dateOfBirth: Date;

  @IsString()
  @MaxLength(30)
  readonly location: string;

  @IsEnum(UserStatus)
  readonly status: string;
}
