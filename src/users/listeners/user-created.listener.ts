import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '../events/user-created.event';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class UserCreatedListener {
  constructor(private readonly mailService: MailService) {}

  @OnEvent('user.created')
  handleUserCreatedEvent(event: UserCreatedEvent): void {
    this.mailService.userConfirmation(event);
  }
}
