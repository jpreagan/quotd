import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

const mockPrismaService = {
  author: {
    create: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Audrey Hepburn',
    }),
    findMany: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'Audrey Hepburn',
      },
    ]),
    findUnique: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Audrey Hepburn',
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
      name: 'George Bernard Shaw',
    }),
    delete: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Audrey Hepburn',
    }),
  },
};

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates a new author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'Audrey Hepburn',
      };

      const result = await service.create(createAuthorDto);

      expect(result).toEqual({
        id: 1,
        name: 'Audrey Hepburn',
      });
    });
  });

  describe('findAll', () => {
    it('retrieves a list of all authors', async () => {
      const result = await service.findAll();

      expect(result).toEqual([
        {
          id: 1,
          name: 'Audrey Hepburn',
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('retrieves a single author by id', async () => {
      const result = await service.findOne(1);

      expect(result).toEqual({
        id: 1,
        name: 'Audrey Hepburn',
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
    it('updates an existing author', async () => {
      const updateAuthorDto: UpdateAuthorDto = {
        name: 'George Bernard Shaw',
      };
      const result = await service.update(1, updateAuthorDto);

      expect(result).toEqual({
        id: 1,
        name: 'George Bernard Shaw',
      });
    });
  });

  describe('remove', () => {
    it('deletes an existing author', async () => {
      const result = await service.remove(1);
      expect(result).toEqual({
        id: 1,
        name: 'Audrey Hepburn',
      });
    });
  });
});
