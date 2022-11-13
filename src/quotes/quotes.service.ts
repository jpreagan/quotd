import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

const createQuoteWithAuthorAndCategory = (
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

const quoteWithAuthorAndCategory = Prisma.validator<Prisma.QuoteSelect>()({
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
      data: createQuoteWithAuthorAndCategory(text, author, category),
      select: quoteWithAuthorAndCategory,
    });
  }

  findAll() {
    return this.prisma.quote.findMany({
      select: quoteWithAuthorAndCategory,
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
      select: quoteWithAuthorAndCategory,
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
      data: createQuoteWithAuthorAndCategory(text, author, category),
      select: quoteWithAuthorAndCategory,
    });
  }

  remove(id: number) {
    return this.prisma.quote.delete({
      where: { id },
    });
  }
}
