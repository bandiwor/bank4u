import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { CryptModule } from '../crypt/crypt.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    UsersModule,
    TokenModule,
    CryptModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    AuthService
  ],
  controllers: [AuthController],

}) export class AuthModule {
}