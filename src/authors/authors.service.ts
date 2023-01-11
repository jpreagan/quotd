import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

const authorWithQuotes = Prisma.validator<Prisma.AuthorSelect>()({
  id: true,
  name: true,
  quotes: {
    select: {
      id: true,
      text: true,
    },
  },
});

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAuthorDto: CreateAuthorDto) {
    const { name } = createAuthorDto;
    return this.prisma.author.create({
      data: {
        name,
      },
    });
  }

  findAll() {
    return this.prisma.author.findMany();
  }

  findOne(id: number) {
    return this.prisma.author.findUnique({
      where: { id },
      select: authorWithQuotes,
    });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const { name } = updateAuthorDto;
    return this.prisma.author.update({
      where: { id },
      data: {
        name,
      },
    });
  }

  remove(id: number) {
    return this.prisma.author.delete({
      where: { id },
    });
  }
}
