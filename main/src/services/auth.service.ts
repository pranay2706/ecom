import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { RegisterUserDto } from 'src/dtos/registeruser.dto';

@Injectable()
export class AuthService {
  constructor() {}

  register(userData: RegisterUserDto) {
    console.log(userData);
  }

  login(loginData: LoginUserDto) {
    console.log(loginData);
  }
}
