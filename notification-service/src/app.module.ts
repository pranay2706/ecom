import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailController } from './controllers/email.controller';
import { EmailService } from './services/email.service';

@Module({
  imports: [],
  controllers: [AppController, EmailController],
  providers: [AppService, EmailService],
})
export class AppModule {}
