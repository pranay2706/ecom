import { Body, Inject, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { RegisterUserDto } from 'src/dtos/registeruser.dto';

@Injectable()
export class AuthService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    });
  }

  async register(userData: RegisterUserDto): Promise<any> {
    const pattern = { cmd: 'registerUser' };
    return this.client.send(pattern, userData).toPromise();
  }

  login(loginData: LoginUserDto) {
    const pattern = { cmd: 'loginUser' };
    return this.client.send(pattern, loginData).toPromise();
  }
}
