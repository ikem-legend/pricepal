import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  saltRounds: process.env.SALT_ROUNDS,
}));
