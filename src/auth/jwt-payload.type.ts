import { User } from '../users/entities/user.entity';

export type JwtPayload = User & {
  username: string;
  sub: number;
  iat: number;
  exp: number;
};
