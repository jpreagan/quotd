import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((createCategoryDto: CreateCategoryDto) =>
                Promise.resolve({ id: 1, ...createCategoryDto }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                name: 'Wisdom',
              },
              {
                id: 2,
                name: 'Inspirational',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) => {
              const categories = {
                '1': 'Wisdom',
                '2': 'Inspirational',
              };
              return Promise.resolve({
                id,
                name: categories[id],
                quotes: [
                  {
                    id: 1,
                    text: 'The rain in Spain stays mainly in the plain.',
                  },
                ],
              });
            }),
            update: jest
              .fn()
              .mockImplementation(
                (id: string, updateCategoryDto: UpdateCategoryDto) =>
                  Promise.resolve({ id, ...updateCategoryDto }),
              ),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new author', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Wisdom',
      };
      await expect(controller.create(createCategoryDto)).resolves.toMatchObject(
        {
          id: 1,
          ...createCategoryDto,
        },
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        {
          id: 1,
          name: 'Wisdom',
        },
        {
          id: 2,
          name: 'Inspirational',
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a single author', async () => {
      await expect(controller.findOne('1')).resolves.toEqual({
        id: 1,
        name: 'Wisdom',
        quotes: [
          {
            id: 1,
            text: 'The rain in Spain stays mainly in the plain.',
          },
        ],
      });
      await expect(controller.findOne('2')).resolves.toEqual({
        id: 2,
        name: 'Inspirational',
        quotes: [
          {
            id: 1,
            text: 'The rain in Spain stays mainly in the plain.',
          },
        ],
      });
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const updateAuthorDto: UpdateCategoryDto = {
        name: 'Inspirational',
      };
      await expect(controller.update('1', updateAuthorDto)).resolves.toEqual({
        id: 1,
        ...updateAuthorDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const id = '1';
      await expect(controller.remove(id)).resolves.toBeUndefined();
    });
  });
});
