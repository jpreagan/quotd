import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CategoryEntity,
  CategoryWithQuotesEntity,
} from './entity/category.entity';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new category' })
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Returns a list of categories' })
  @Get()
  findAll(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Returns a category for a given id' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CategoryWithQuotesEntity> {
    return this.categoriesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Updates an existing category' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a category by id' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoriesService.remove(+id);
  }
}
