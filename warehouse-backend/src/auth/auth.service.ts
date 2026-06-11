import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  
  import * as bcrypt from 'bcrypt';
  
  import { UsersService } from 'src/users/user.service';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthService {
  
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
    ) {}
  
    async login(
      username: string,
      password: string,
    ) {
  
      const user =
        await this.usersService.findByUsername(
          username,
        );
  
      if (!user) {
        throw new UnauthorizedException(
          'Sai tài khoản',
        );
      }
  
      const isMatch =
        await bcrypt.compare(
          password,
          user.passwordHash,
        );
  
      if (!isMatch) {
        throw new UnauthorizedException(
          'Sai mật khẩu',
        );
      }
  
      const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
      };
  
      const access_token =
        this.jwtService.sign(payload);
  
      return {
        success: true,
        access_token,
        username: user.username,
        role: user.role,
      };
    }
  }