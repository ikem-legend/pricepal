import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @MinLength(3, {
    message:
      'First name is too short. Minimum length is $constraint1 characters, but actual length is $value',
  })
  @MaxLength(20, {
    message:
      'First name is too long. Maximum length is $constraint1 characters, but actual length is $value',
  })
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  readonly firstName: string;

  @MinLength(3, {
    message:
      'Last name is too short. Minimum length is $constraint1 characters, but actual length is $value',
  })
  @MaxLength(20, {
    message:
      'Last name is too long. Maximum length is $constraint1 characters, but actual length is $value',
  })
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  readonly lastName: string;

  @Matches(/^[a-zA-Z]{3,}.*/, {
    message: 'Username must start with at least 3 alphabetic characters',
  })
  @MinLength(3, {
    message:
      'Username is too short. Minimum length is $constraint1 characters, but actual length is $value',
  })
  @MaxLength(30, {
    message:
      'Username is too long. Maximum length is $constraint1 characters, but actual length is $value',
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @MinLength(11, {
    message: 'Phone number is too short',
  })
  @MaxLength(15, {
    message: 'Phone number is too long',
  })
  @IsPhoneNumber('NG')
  @IsNotEmpty()
  readonly phone: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(254, {
    message:
      'Email is too long. Maximum length is $constraint1 characters, but actual length is $value',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, {
    message:
      'Password must contain at least 1 lowercase, 1 uppercase, 1 number and 8 characters',
  })
  readonly password: string;

  @IsISO8601()
  readonly dateOfBirth: Date;

  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @IsEnum(UserStatus)
  @IsNotEmpty()
  readonly status: string;

  @IsNumber()
  readonly roleID: number;
}
