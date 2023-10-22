import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserCreatedEvent } from '../users/events/user-created.event';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async userConfirmation(emailData: UserCreatedEvent): Promise<void> {
    const { name, email, token } = emailData;
    const url = `https://pricepal.com/auth/confirm?token=${token}`;

    await this.mailerService
      .sendMail({
        to: email,
        subject: 'Account Registration Confirmation',
        template: './user-confirmation',
        context: {
          name,
          url,
        },
      })
      .then(() => {
        console.log('Confirmation email successfully sent');
      })
      .catch((error) => {
        console.log('Error sending confirmation email');
        console.error(error);
      });
  }
}
