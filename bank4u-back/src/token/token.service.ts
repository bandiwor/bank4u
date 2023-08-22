import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';


type RefreshTokenPayload = {
  sub: number
}

type AccessTokenPayload = {
  username: string
  telephone: string
} & RefreshTokenPayload

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) {
  }

  async generateTokenPairs(tokenPayload: AccessTokenPayload): Promise<{access_token: string, refresh_token: string}> {
    const access_token = await this.jwtService.signAsync(tokenPayload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.accessTokenExpires
    });

    const refresh_token = await this.jwtService.signAsync({sub: tokenPayload.sub}, {
      secret: jwtConstants.refreshSecret,
      expiresIn: jwtConstants.refreshTokenExpires
    })

    return {
      access_token, refresh_token
    }
  }

  async decodeAccessToken(token: string): Promise<AccessTokenPayload | null> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
    } catch {
      return null;
    }
  }

  async decodeRefreshToken(token: string): Promise<RefreshTokenPayload | null> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.refreshSecret
      });
    } catch {
      return null;
    }
  }

  async getUserRefreshToken(userId: number) {
    return this.prismaService.user.findUnique({
      where: {
        id: userId
      },
      select: {
        refreshToken: true
      }
    });
  }

  async setUserRefreshToken(userId: number, refreshToken: string) {
    await this.prismaService.user.update({
      where: {
        id: userId
      },
      data: {
        refreshToken
      }
    })
  }
}