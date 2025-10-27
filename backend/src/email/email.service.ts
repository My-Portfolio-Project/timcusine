import {
  BadRequestException,
  ConflictException,
  Injectable
} from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigService
  ) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    try {
      const { to, subject, html } = sendEmailDto;

      if (!to || !subject || !html) {
        throw new BadRequestException('Please fill in all fields');
      }

      const config = {
        from: this.configService.get<string>('EMAIL_USER'),
        to,
        html,
        subject
      };

      await this.mailService.sendMail(config);
      console.log('✅Email sent successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new ConflictException();
    }
  }
}
