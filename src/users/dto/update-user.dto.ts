import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @Exclude()
  createdAt: Date;

  @IsOptional()
  @Exclude()
  updatedAt: Date;
}
