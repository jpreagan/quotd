import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const mockPrismaService = {
  category: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Inspirational',
    }),
    findMany: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'Inspirational',
      },
      {
        id: 2,
        name: 'Funny',
      },
    ]),
    findUnique: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Inspirational',
      quotes: [
        {
          id: 1,
          text: 'Quote 1',
        },
        {
          id: 2,
          text: 'Quote 2',
        },
      ],
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Motivational',
    }),
    delete: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Inspirational',
    }),
  },
};

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates a new category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Inspirational',
      };

      const result = await service.create(createCategoryDto);

      expect(result).toEqual({
        id: 1,
        name: 'Inspirational',
      });
    });
  });

  describe('findAll', () => {
    it('finds all categories', async () => {
      const result = await service.findAll();

      expect(result).toEqual([
        {
          id: 1,
          name: 'Inspirational',
        },
        {
          id: 2,
          name: 'Funny',
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('finds a single category by id', async () => {
      const result = await service.findOne(1);

      expect(result).toEqual({
        id: 1,
        name: 'Inspirational',
        quotes: [
          {
            id: 1,
            text: 'Quote 1',
          },
          {
            id: 2,
            text: 'Quote 2',
          },
        ],
      });
    });
  });

  describe('update', () => {
    it('updates a single category by id', async () => {
      const updateCategoryDto: UpdateCategoryDto = {
        name: 'Motivational',
      };

      const result = await service.update(1, updateCategoryDto);

      expect(result).toEqual({
        id: 1,
        name: 'Motivational',
      });
    });
  });

  describe('remove', () => {
    it('deletes a single category by id', async () => {
      const result = await service.remove(1);

      expect(result).toEqual({
        id: 1,
        name: 'Inspirational',
      });
    });
  });
});
