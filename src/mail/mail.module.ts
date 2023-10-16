import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import mailerConfig from 'src/common/config/mailer.config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: mailerConfig.transport,
      defaults: mailerConfig.defaults,
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
