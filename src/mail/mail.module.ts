import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';
import appConfig from '../config/app.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: appConfig().supportEmailHost,
          secure: true,
          auth: {
            user: appConfig().supportEmailAddress,
            pass: appConfig().supportEmailPassword,
          },
        },
        defaults: {
          from: '"Support Team" <support@pricepal.com>',
        },
        preview: true,
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
