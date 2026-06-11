import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from 'src/users/user.module';

import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
      UsersModule,
  
      PassportModule,
  
      JwtModule.register({
        secret: 'warehouse-secret-key',
        signOptions: {
          expiresIn: '1d',
        },
      }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
    ]
  })
  export class AuthModule {}