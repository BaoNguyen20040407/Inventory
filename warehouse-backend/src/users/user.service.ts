import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 🔥 giữ nguyên cái bạn đang có
  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  // ✅ THÊM: lấy toàn bộ users (cho bảng frontend)
  async findAll() {
    return this.userRepository.find({
      select: [
        'id',
        'username',
        'role',
      ],
    });
  }

  // ✅ THÊM: xóa user
  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}