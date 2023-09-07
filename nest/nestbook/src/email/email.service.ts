import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transporter: Mail;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport(config.get('emailOptions'));
  }

  sendMail(to: string, token: string) {
    console.log('🚀  to:', to, token);
    const url = `${this.config.get(
      'baseUrl',
    )}/api/0.1/users/verify?token=${token}&email=${to}`;
    console.log('🚀  url:', url);

    this.transporter.sendMail({
      to,
      subject: '[소셜북마크] 이메일 가입 인증',
      html: `
        <a href=${url}>이메일인증</a>
      `,
    });
  }
}
