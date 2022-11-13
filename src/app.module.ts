import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuotesModule } from './quotes/quotes.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    QuotesModule,
    AuthorsModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
    PrismaModule,
  ],
})
export class AppModule {}
