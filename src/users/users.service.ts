import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User as UserModel } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(username: string): Promise<UserModel> | undefined {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
