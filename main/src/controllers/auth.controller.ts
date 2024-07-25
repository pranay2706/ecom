import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { RegisterUserDto } from 'src/dtos/registeruser.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      this.authService.login(loginUserDto);
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    this.authService.register(registerUserDto);
  }
}
