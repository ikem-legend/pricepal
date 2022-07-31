import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { generateConfirmationToken } from '../../helpers/utils';

export enum UserStatus {
  Active = 'Active',
  Pending = 'Pending',
  Inactive = 'Inactive',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  firstName: string;

  @Column({ type: 'varchar', length: 20 })
  lastName: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  phone: string;

  @Column({ type: 'varchar', length: 254, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 30 })
  location: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Inactive })
  status: string;

  @Column({ type: 'int', width: 10, default: generateConfirmationToken() })
  confirmationToken: number;

  @Column({ type: 'int', width: 20 })
  roleID: number;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
