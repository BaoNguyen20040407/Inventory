import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/user.service';

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

    console.log('USER LOGIN:', user);

    if (!user) {
      throw new UnauthorizedException(
        'Sai tài khoản',
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Tài khoản đã bị khóa. Liên hệ quản trị viên.',
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

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const user =
      await this.usersService.findById(
        userId,
      );

    if (!user) {
      throw new UnauthorizedException(
        'Người dùng không tồn tại',
      );
    }

    const isMatch =
      await bcrypt.compare(
        oldPassword,
        user.passwordHash,
      );

    if (!isMatch) {
      throw new UnauthorizedException(
        'Mật khẩu cũ không đúng',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10,
      );

    await this.usersService.updatePassword(
      userId,
      hashedPassword,
    );

    return {
      success: true,
      message: 'Đổi mật khẩu thành công',
    };
  }
}