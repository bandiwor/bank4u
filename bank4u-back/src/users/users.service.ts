import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    })
  }

  async gets() {
    return this.prisma.user.findMany({

    })
  }

  async findOne(telephone: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        telephone
      }
    })
  }

  async findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }
}