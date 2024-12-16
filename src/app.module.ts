import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [BooksModule, MembersModule, BorrowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
