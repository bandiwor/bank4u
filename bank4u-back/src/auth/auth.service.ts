import {Injectable, UnauthorizedException, ConflictException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import { jwtConstants } from './constants';
import { CryptService } from '../crypt/crypt.service';
import { TokenService } from '../token/token.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private cryptService: CryptService
  ) {
  }

  async signIn(telephone: string, pass: string) {
    console.log(telephone);
    const user = await this.usersService.findOne(telephone);

    if (!user || !(await this.cryptService.matchPassword(pass, user.password))) {
      console.log('sd');
      throw new UnauthorizedException();
    }

    const tokenPairs = await this.tokenService.generateTokenPairs({
      sub: user.id,
      username: user.name,
      telephone: user.telephone
    })

    await this.tokenService.setUserRefreshToken(user.id, tokenPairs.refresh_token);

    return tokenPairs;
  }

  async signUp(username: string, telephone: string, password: string) {
    const user = await this.usersService.findOne(telephone);
    if (user !== null) {
      throw new ConflictException();
    }

    await this.usersService.create({
      name: username,
      telephone,
      password: await this.cryptService.hashPassword(password),
    });

    return {
      ok: true
    }
  }

  async refresh(token: string) {
    // Getting and decode JWT
    const decodedRefresh = await this.tokenService.decodeRefreshToken(token);
    if (!decodedRefresh) {
      throw new UnauthorizedException();
    }

    // Find user with that ID
    const {refreshToken, id, telephone, name} = await this.usersService.findById(decodedRefresh.sub);

    if (refreshToken !== token) {
      throw new UnauthorizedException();
    }

    const tokenPairs = await this.tokenService.generateTokenPairs({telephone, username: name, sub: id});
    await this.tokenService.setUserRefreshToken(id, tokenPairs.refresh_token);

    return tokenPairs;
  }
}
