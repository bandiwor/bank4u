import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [TokenService, PrismaService],
  exports: [TokenService]
})
export class TokenModule {
}
