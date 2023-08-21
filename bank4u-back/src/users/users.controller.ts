import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) {
  }

  @Get('profile')
  async profile(@Res() response: Response, @Req() request: Request) {
    const user = request['user'];

    const {password, ...profile} = await this.userService.findOne(user.telephone)

    response.send({profile})
  }
}
