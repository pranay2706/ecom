import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EmailService } from 'src/services/email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern({ cmd: 'sendEmailVerificationMail' })
  async sendEmail(userDetails: any) {
    try {
      await this.emailService.send(userDetails);
      return { status: true };
    } catch (err) {
      console.error(err);
      return { status: false };
    }
  }
}
