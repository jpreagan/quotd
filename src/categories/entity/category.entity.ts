import { ApiProperty } from '@nestjs/swagger';
import { QuoteEntity } from '../../quotes/entity/quote.entity';

export class CategoryEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Wisdom' })
  name: string;
}

export class CategoryWithQuotesEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Wisdom' })
  name: string;
  @ApiProperty({ isArray: true })
  quotes: QuoteEntity[];
}
