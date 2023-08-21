import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { CryptModule } from '../crypt/crypt.module';

@Module({
  imports: [
    UsersModule,
    JwtModule,
    CryptModule
  ],
  providers: [
    AuthService, JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController],

}) export class AuthModule {
}