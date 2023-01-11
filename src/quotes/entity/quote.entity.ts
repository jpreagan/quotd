import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../../categories/entity/category.entity';
import { AuthorEntity } from '../../authors/entity/author.entity';

export class QuoteEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'The rain in Spain stays mainly in the plain.' })
  text: string;
}

export class QuoteWithAuthorAndCategoryEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'The rain in Spain stays mainly in the plain.' })
  text: string;

  author: AuthorEntity;
  category: CategoryEntity;
}
