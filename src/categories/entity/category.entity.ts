import { ApiProperty } from '@nestjs/swagger';
import { QuoteWithAuthorEntity } from '../../quotes/entity/quote.entity';

export class CategoryEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Wisdom' })
  name: string;
}

export class CategoryWithAuthorAndQuotesEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Wisdom' })
  name: string;
  @ApiProperty({ isArray: true })
  quotes: QuoteWithAuthorEntity[];
}
