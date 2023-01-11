import { ApiProperty } from '@nestjs/swagger';
import { QuoteEntity } from '../../quotes/entity/quote.entity';

export class AuthorEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Audrey Hepburn' })
  name: string;
}

export class AuthorWithQuotesEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Audrey Hepburn' })
  name: string;
  @ApiProperty({ isArray: true })
  quotes: QuoteEntity[];
}
