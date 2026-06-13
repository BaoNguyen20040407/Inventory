import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async findAll() {
    return this.userRepository.find({
      select: [
        'id',
        'username',
        'role',
        'isActive',
      ],
    });
  }

  // GET /users/:id
  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'username',
        'role',
        'isActive',
      ],
    });
  }

  // POST /users
  async create(data: any) {
    const passwordHash = await bcrypt.hash(
      data.password,
      10,
    );

    const user = this.userRepository.create({
      username: data.username,
      passwordHash,
      role: data.role,
      isActive: true,
    });

    return this.userRepository.save(user);
  }

  // PUT /users/:id
  async update(id: number, data: any) {
    await this.userRepository.update(id, {
      username: data.username,
      role: data.role,
      isActive: data.isActive,
    });

    return this.findOne(id);
  }

  // DELETE /users/:id
  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  // Tìm user theo id (có lấy passwordHash)
  async findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  // Cập nhật mật khẩu
  async updatePassword(
    id: number,
    passwordHash: string,
  ) {
    await this.userRepository.update(id, {
      passwordHash,
    });

    return this.userRepository.findOne({
      where: { id },
    });
  }
}