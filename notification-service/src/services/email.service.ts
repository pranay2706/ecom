import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private createTransporter(): nodemailer.Transporter {
    return nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'da801c1684f027',
        pass: '80cb34da19b328',
      },
    });
  }

  async send(userDetails: any): Promise<void> {
    const mailOptions = {
      from: 'Pranay Dak <dakpranay@gmail.com>',
      to: userDetails.user.user.email,
      subject: 'Email-Verification',
      text: `http://localhost:3003/api/user/verifyEmail/${userDetails.user.token}`,
    };

    const transporter = this.createTransporter();
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
