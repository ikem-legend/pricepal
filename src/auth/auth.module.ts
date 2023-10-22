import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import appConfig from '../config/app.config';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserCreatedListener } from '../users/listeners/user-created.listener';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: appConfig().jwtSecretKey,
        signOptions: { expiresIn: '1h' },
      }),
    }),
    MailModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserCreatedListener],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
