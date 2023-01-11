import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

const createQuoteValidator = (
  text: string,
  author: string,
  category: string,
) => {
  return Prisma.validator<Prisma.QuoteCreateInput>()({
    text,
    author: {
      connectOrCreate: {
        where: { name: author },
        create: { name: author },
      },
    },
    category: {
      connectOrCreate: {
        where: { name: category },
        create: { name: category },
      },
    },
  });
};

const selectQuoteValidator = Prisma.validator<Prisma.QuoteSelect>()({
  id: true,
  text: true,
  author: {
    select: {
      id: true,
      name: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
    },
  },
});

@Injectable()
export class QuotesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createQuoteDto: CreateQuoteDto) {
    const {
      text,
      author: { name: author },
      category: { name: category },
    } = createQuoteDto;
    return this.prisma.quote.create({
      data: createQuoteValidator(text, author, category),
      select: selectQuoteValidator,
    });
  }

  findAll() {
    return this.prisma.quote.findMany({
      select: selectQuoteValidator,
    });
  }

  async findRandom() {
    const count = await this.prisma.quote.count();
    const random = Math.floor(Math.random() * count) + 1;
    return this.findOne(random);
  }

  findOne(id: number) {
    return this.prisma.quote.findUnique({
      where: { id },
      select: selectQuoteValidator,
    });
  }

  update(id: number, updateQuoteDto: UpdateQuoteDto) {
    const {
      text,
      author: { name: author },
      category: { name: category },
    } = updateQuoteDto;
    return this.prisma.quote.update({
      where: { id },
      data: createQuoteValidator(text, author, category),
      select: selectQuoteValidator,
    });
  }

  remove(id: number) {
    return this.prisma.quote.delete({
      where: { id },
    });
  }
}
