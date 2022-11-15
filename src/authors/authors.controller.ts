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
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsService } from './authors.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthorEntity } from './entity/author.entity';

@Controller('authors')
@ApiTags('Authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new author' })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Returns a list of authors' })
  @Get()
  findAll(): Promise<AuthorEntity[]> {
    return this.authorsService.findAll();
  }

  @ApiOperation({ summary: 'Returns an author for a given id' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<AuthorEntity> {
    return this.authorsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Updates an existing author' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorEntity> {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete an author by id' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.authorsService.remove(+id);
  }
}
