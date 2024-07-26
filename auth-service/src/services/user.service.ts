import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/dto/loginUser.dto';
import { RegisterUserDto } from 'src/dto/registerUser.dto';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(userData: RegisterUserDto) {
    const newUser = await this.userRepository.save(userData);
    return newUser;
  }

  loginUser(loginData: LoginUserDto) {
    console.log(loginData);
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async generateToken(id: number) {
    let token = jwt.sign({ id }, 'this-is-secret-key', { expiresIn: 90 });
    return token;
  }

  async verifyEmail(token: string) {}
}
