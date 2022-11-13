import { ApiProperty } from '@nestjs/swagger';

export class AuthorEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Audrey Hepburn' })
  name: string;
}
