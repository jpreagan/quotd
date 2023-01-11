import { Test, TestingModule } from '@nestjs/testing';
import { QuotesService } from './quotes.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { CreateAuthorDto } from '../authors/dto/create-author.dto';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

const mockPrismaService = {
  quote: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      text: 'The rain in Spain stays mainly in the plain.',
      author: {
        name: 'Audrey Hepburn',
      },
      category: {
        name: 'Wisdom',
      },
    }),
    findMany: jest.fn().mockResolvedValue([
      {
        id: 1,
        text: 'The rain in Spain stays mainly in the plain.',
        author: {
          name: 'Audrey Hepburn',
        },
        category: {
          name: 'Wisdom',
        },
      },
      {
        id: 2,
        text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
        author: {
          name: 'Nelson Mandela',
        },
        category: {
          name: 'Inspirational',
        },
      },
      {
        id: 3,
        text: 'The way to get started is to quit talking and begin doing.',
        author: {
          name: 'Walt Disney',
        },
        category: {
          name: 'Inspirational',
        },
      },
    ]),
    findUnique: jest.fn().mockResolvedValue({
      id: 1,
      text: 'The rain in Spain stays mainly in the plain.',
      author: {
        name: 'Audrey Hepburn',
      },
      category: {
        name: 'Wisdom',
      },
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      text: 'I believe in being strong when everything seems to be going wrong.',
      author: {
        name: 'Audrey Hepburn',
      },
      category: {
        name: 'Wisdom',
      },
    }),
    delete: jest.fn().mockResolvedValue({
      id: 1,
    }),
    count: jest.fn().mockResolvedValue(2),
  },
};

describe('QuotesService', () => {
  let service: QuotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<QuotesService>(QuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a quote', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'Audrey Hepburn',
      };
      const createCategoryDto: CreateCategoryDto = {
        name: 'Wisdom',
      };
      const createQuoteDto: CreateQuoteDto = {
        text: 'The rain in Spain stays mainly in the plain.',
        author: createAuthorDto,
        category: createCategoryDto,
      };

      const result = await service.create(createQuoteDto);
      expect(result).toEqual({
        id: 1,
        text: 'The rain in Spain stays mainly in the plain.',
        author: {
          name: 'Audrey Hepburn',
        },
        category: {
          name: 'Wisdom',
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return a list of all quotes', async () => {
      const result = await service.findAll();
      expect(result).toEqual([
        {
          id: 1,
          text: 'The rain in Spain stays mainly in the plain.',
          author: {
            name: 'Audrey Hepburn',
          },
          category: {
            name: 'Wisdom',
          },
        },
        {
          id: 2,
          text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
          author: {
            name: 'Nelson Mandela',
          },
          category: {
            name: 'Inspirational',
          },
        },
        {
          id: 3,
          text: 'The way to get started is to quit talking and begin doing.',
          author: {
            name: 'Walt Disney',
          },
          category: {
            name: 'Inspirational',
          },
        },
      ]);
    });
  });

  describe('findRandom', () => {
    it('should return a random quote', async () => {
      const result = await service.findRandom();
      expect(result).toEqual({
        id: 1,
        text: 'The rain in Spain stays mainly in the plain.',
        author: {
          name: 'Audrey Hepburn',
        },
        category: {
          name: 'Wisdom',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a quote by its ID', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual({
        id: 1,
        text: 'The rain in Spain stays mainly in the plain.',
        author: {
          name: 'Audrey Hepburn',
        },
        category: {
          name: 'Wisdom',
        },
      });
    });
  });

  describe('update', () => {
    it('should update a quote by its ID', async () => {
      const updateQuoteDto: UpdateQuoteDto = {
        text: 'I believe in being strong when everything seems to be going wrong.',
        author: {
          name: 'Audrey Hepburn',
        },
        category: {
          name: 'Wisdom',
        },
      };
      const result = await service.update(1, updateQuoteDto);
      expect(result).toEqual({
        id: 1,
        text: 'I believe in being strong when everything seems to be going wrong.',
        author: {
          name: 'Audrey Hepburn',
        },
        category: {
          name: 'Wisdom',
        },
      });
    });
  });

  describe('remove', () => {
    it('should remove a quote by its ID', async () => {
      const result = await service.remove(1);
      expect(result).toEqual({ id: 1 });
    });
  });
});
