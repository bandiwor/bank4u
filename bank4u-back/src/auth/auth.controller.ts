import { Body, Controller, Post, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginUserDto from './dto/login-user.dto';
import RegisterUserDto from './dto/register-user.dto';
import { Public } from './auth.public';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDto) {
    return this.authService.signIn(signInDto.telephone, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() signUpDto: RegisterUserDto) {
    if ((signUpDto.telephone.length === 1 && signUpDto.password.length >= 8 && signUpDto.username.length >= 4)) {
      throw new BadRequestException()
    }
    return this.authService.signUp(signUpDto.username, signUpDto.telephone, signUpDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() refreshDto: RefreshTokenDto) {
    return this.authService.refresh(refreshDto.refreshToken);
  }
}