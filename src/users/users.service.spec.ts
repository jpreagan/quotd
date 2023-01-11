import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  user: {
    findUnique: jest.fn().mockImplementation((args) => {
      if (args.where.username === 'johndoe') {
        return {
          id: 1,
          username: 'johndoe',
        };
      }
      return undefined;
    }),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user that exists', async () => {
      const user = await service.findOne('johndoe');

      expect(prismaService.user.findUnique).toBeCalledWith({
        where: {
          username: 'johndoe',
        },
      });

      expect(user).toEqual({
        id: 1,
        username: 'johndoe',
      });
    });

    it('should return a user that exists', async () => {
      const result = await service.findOne('invaliduser');

      expect(prismaService.user.findUnique).toBeCalledWith({
        where: {
          username: 'invaliduser',
        },
      });

      expect(result).toBeUndefined();
    });
  });
});
