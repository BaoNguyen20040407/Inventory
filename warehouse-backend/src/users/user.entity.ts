import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column({
      name: 'password_hash',
    })
    passwordHash: string;
  
    @Column()
    role: string;
  
    @Column({
      name: 'is_active',
      default: true,
    })
    isActive: boolean;
  
    @CreateDateColumn({
      name: 'created_at',
    })
    createdAt: Date;
  }