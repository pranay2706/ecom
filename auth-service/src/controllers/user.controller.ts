import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginUserDto } from 'src/dto/loginUser.dto';
import { RegisterUserDto } from 'src/dto/registerUser.dto';
import { UserService } from 'src/services/user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'registerUser' })
  async registeruser(userData: RegisterUserDto) {
    try {
      const { name, email, password } = userData;
      if (!name || !email || !password) {
        throw new Error('All details must be present during registration');
      }

      const existedUser = await this.userService.findUserByEmail(email);

      if (existedUser) {
        throw new Error('user already exists.Please login');
      }

      userData.password = await bcrypt.hash(password, 10);

      const user = await this.userService.registerUser(userData);
      delete user.password;
      const token = await this.userService.generateToken(user.id);

      return { success: true, user, token };
    } catch (err) {
      console.error('Registration error:', err.message);
      return { success: false, message: err.message };
    }
  }

  @MessagePattern({ cmd: 'loginUser' })
  async loginUser(loginData: LoginUserDto) {
    try {
      const { email, password } = loginData;
      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid password');
      }

      const token = await this.userService.generateToken(user.id);
      delete user.password;
      delete user.isAcive;
      return { success: true, user, token };
    } catch (err) {
      console.error('Login error:', err.message);
      return { success: false, message: err.message };
    }
  }

  @MessagePattern({ cmd: 'verifyEmail' })
  async verifyEmail(token: string) {
    await this.userService.verifyEmail(token);
  }
}
