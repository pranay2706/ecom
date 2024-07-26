import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { RegisterUserDto } from 'src/dtos/registeruser.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('user')
export class AuthController {
  private client: ClientProxy;
  private authClient: ClientProxy;

  constructor(private readonly authService: AuthService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3004,
      },
    });

    this.authClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    });
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.authService.login(loginUserDto);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    this.authService.register(registerUserDto);
    try {
      const newUser = await this.authService.register(registerUserDto);
      const pattern = { cmd: 'sendEmailVerificationMail' };
      this.client.emit(pattern, { newUser });
      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('verifyEmail/:token')
  async verifyEmail(@Param('token') token: string) {
    const pattern = { cmd: 'verifyEmail' };
    this.client.emit(pattern, { token });
    try {
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
