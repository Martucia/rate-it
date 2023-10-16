import { Injectable } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class MailService {
  constructor(private readonly mailerSercive: MailerService) { }

  async sendMail(dto: MailDto) {
    console.log("MailService dto", dto)

    const result = await this.mailerSercive.sendMail({
      to: dto.to,
      subject: dto.subject,
      text: dto.text,
      from: dto.from
    });

    console.log("result", result);

    return {
      message: "Email send succesfully"
    };
  }
}
