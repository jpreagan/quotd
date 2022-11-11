import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuotesModule } from './quotes/quotes.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    QuotesModule,
    AuthorsModule,
    CategoriesModule,
    PrismaModule,
  ],
})
export class AppModule {}
