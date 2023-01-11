import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { QuotesService } from './quotes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  QuoteEntity,
  QuoteWithAuthorAndCategoryEntity,
} from './entity/quote.entity';

@Controller('quotes')
@ApiTags('Quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new quote' })
  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto): Promise<QuoteEntity> {
    return this.quotesService.create(createQuoteDto);
  }

  @ApiOperation({ summary: 'Returns a list of quotes' })
  @Get()
  findAll(): Promise<QuoteEntity[]> {
    return this.quotesService.findAll();
  }

  @ApiOperation({ summary: 'Returns a random quote' })
  @Get('random')
  findRandom(): Promise<QuoteEntity> {
    return this.quotesService.findRandom();
  }

  @ApiOperation({ summary: 'Returns a quote for a given id' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<QuoteWithAuthorAndCategoryEntity> {
    return this.quotesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Updates an existing quote' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuoteDto: UpdateQuoteDto,
  ): Promise<QuoteEntity> {
    return this.quotesService.update(+id, updateQuoteDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a quote by id' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.quotesService.remove(+id);
  }
}
