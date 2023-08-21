import {Injectable, UnauthorizedException, ConflictException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { CryptService } from '../crypt/crypt.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cryptService: CryptService
  ) {
  }

  async signIn(telephone: string, pass: string) {
    const user = await this.usersService.findOne(telephone);

    if (!user || !(await this.cryptService.matchPassword(pass, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = {sub: user.id, username: user.name, telephone: user.telephone};
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.accessTokenExpires
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.refreshSecret,
        expiresIn: jwtConstants.refreshTokenExpires
      })
    };
  }

  async signUp(username: string, telephone: string, password: string) {
    const user = await this.usersService.findOne(telephone);
    if (user !== null) {
      throw new ConflictException();
    }

    const hashedPassword = await this.cryptService.hashPassword(password);
    await this.usersService.create({name: username, telephone, password: hashedPassword});

    return {
      ok: true
    }
  }

  async refresh(refreshToken: string) {
    try {
      const {sub, username, telephone} = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.refreshSecret
      })

      const payload = {sub, username, telephone};
      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: jwtConstants.secret,
          expiresIn: jwtConstants.accessTokenExpires
        })
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
