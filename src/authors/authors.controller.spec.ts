import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsService } from './authors.service';

describe('AuthorsController', () => {
  let controller: AuthorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((createAuthorDto: CreateAuthorDto) =>
                Promise.resolve({ id: 1, ...createAuthorDto }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'Audrey Hepburn',
              },
              {
                id: 2,
                name: 'Nelson Mandela',
              },
              {
                id: 3,
                name: 'Walt Disney',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) => {
              const authors = {
                '1': 'Audrey Hepburn',
                '2': 'George Bernard Shaw',
              };
              return Promise.resolve({
                id,
                name: authors[id],
              });
            }),
            update: jest
              .fn()
              .mockImplementation(
                (id: string, updateAuthorDto: UpdateAuthorDto) =>
                  Promise.resolve({ id, ...updateAuthorDto }),
              ),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new author', async () => {
      const createAuthorDto: CreateAuthorDto = {
        name: 'Audrey Hepburn',
      };
      await expect(controller.create(createAuthorDto)).resolves.toMatchObject({
        id: 1,
        ...createAuthorDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        {
          id: 1,
          name: 'Audrey Hepburn',
        },
        {
          id: 2,
          name: 'Nelson Mandela',
        },
        {
          id: 3,
          name: 'Walt Disney',
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a single author when the author exists', async () => {
      await expect(controller.findOne('1')).resolves.toEqual({
        id: 1,
        name: 'Audrey Hepburn',
      });
      await expect(controller.findOne('2')).resolves.toEqual({
        id: 2,
        name: 'George Bernard Shaw',
      });
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      const updateAuthorDto: UpdateAuthorDto = {
        name: 'Audrey Hepburn',
      };
      await expect(controller.update('1', updateAuthorDto)).resolves.toEqual({
        id: 1,
        ...updateAuthorDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove an author', async () => {
      const id = '1';
      await expect(controller.remove(id)).resolves.toBeUndefined();
    });
  });
});
