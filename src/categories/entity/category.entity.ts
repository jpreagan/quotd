import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'Wisdom' })
  name: string;
}
