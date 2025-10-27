import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('EMAIL_HOST'),
          port: parseInt(config.get<string>('EMAIL_PORT') ?? '465', 10),
          secure: true,
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASSWORD')
          },
          pool: true,
          maxConnections: 5,
          maxMessages: 100,
          tls: {
            rejectUnauthorized: false
          }
        },
        defaults: {
          from: `"No Reply" <${config.get('EMAIL_USER')}>`
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
