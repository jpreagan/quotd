import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from './quotes.controller';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { CreateAuthorDto } from '../authors/dto/create-author.dto';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { QuotesService } from './quotes.service';

describe('QuotesController', () => {
  let controller: QuotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotesController],
      providers: [
        {
          provide: QuotesService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((createQuoteDto: CreateQuoteDto) =>
                Promise.resolve({ id: 1, ...createQuoteDto }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                text: 'The rain in Spain stays mainly in the plain.',
                author: 'Audrey Hepburn',
                category: 'Wisdom',
              },
              {
                id: 2,
                text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
                author: 'Nelson Mandela',
                category: 'Inspirational',
              },
              {
                id: 3,
                text: 'The way to get started is to quit talking and begin doing.',
                author: 'Walt Disney',
                category: 'Inspirational',
              },
            ]),
            findRandom: jest.fn().mockResolvedValue({
              id: 3,
              text: 'The way to get started is to quit talking and begin doing.',
              author: 'Walt Disney',
              category: 'Inspirational',
            }),
            findOne: jest.fn().mockImplementation((id: string) => {
              const quotes = {
                '1': {
                  id: 1,
                  text: 'The rain in Spain stays mainly in the plain.',
                  author: 'Audrey Hepburn',
                  category: 'Wisdom',
                },
                '2': {
                  id: 2,
                  text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
                  author: 'Nelson Mandela',
                  category: 'Inspirational',
                },
              };
              return Promise.resolve({
                ...quotes[id],
              });
            }),
            update: jest
              .fn()
              .mockImplementation(
                (id: string, updateQuoteDto: UpdateQuoteDto) =>
                  Promise.resolve({ id: +id, ...updateQuoteDto }),
              ),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();
    controller = module.get<QuotesController>(QuotesController);
  });

  describe('create', () => {
    it('should create a new quote', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'Audrey Hepburn',
      };
      const createCategoryDto: CreateCategoryDto = {
        name: 'Wisdom',
      };
      const createQuoteDto: CreateQuoteDto = {
        text: 'The rain in Spain stays mainly on the plain.',
        author: createAuthorDto,
        category: createCategoryDto,
      };

      const result = await controller.create(createQuoteDto);
      expect(result).toEqual({ id: 1, ...createQuoteDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of quotes', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        {
          id: 1,
          text: 'The rain in Spain stays mainly in the plain.',
          author: 'Audrey Hepburn',
          category: 'Wisdom',
        },
        {
          id: 2,
          text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
          author: 'Nelson Mandela',
          category: 'Inspirational',
        },
        {
          id: 3,
          text: 'The way to get started is to quit talking and begin doing.',
          author: 'Walt Disney',
          category: 'Inspirational',
        },
      ]);
    });
  });

  describe('findRandom', () => {
    it('should return a random quote', async () => {
      const result = await controller.findRandom();
      expect(result).toEqual({
        id: 3,
        text: 'The way to get started is to quit talking and begin doing.',
        author: 'Walt Disney',
        category: 'Inspirational',
      });
    });
  });

  describe('findOne', () => {
    it('should return the quote with id 1', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual({
        id: 1,
        text: 'The rain in Spain stays mainly in the plain.',
        author: 'Audrey Hepburn',
        category: 'Wisdom',
      });
    });
    it('should return the quote with id 2', async () => {
      const result = await controller.findOne('2');
      expect(result).toEqual({
        id: 2,
        text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
        author: 'Nelson Mandela',
        category: 'Inspirational',
      });
    });
  });

  describe('update', () => {
    it('should update an existing quote', async () => {
      const updateQuoteDto: UpdateQuoteDto = {
        text: 'I believe in being strong when everything seems to be going wrong.',
      };
      const result = await controller.update('1', updateQuoteDto);
      expect(result).toEqual({ id: 1, ...updateQuoteDto });
    });
  });

  describe('remove', () => {
    it('should delete a quote by id', async () => {
      await controller.remove('1');
    });
  });
});
