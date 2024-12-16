import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  async createBookDB(createBookDto: CreateBookDto) {
    // Use Prisma to insert the book into the database
    const newBook = await this.prisma.book.create({
      data: createBookDto as any,
    });
    return newBook;
  }

  async findAllBooksDB() {
    const result = await this.prisma.book.findMany();
    return result;
  }

  async findSingleBookDB(bookId: string) {
    const result = await this.prisma.book.findUniqueOrThrow({
      where: {
        bookId,
      },
    });
    return result;
  }

  async updateSingleBooksDB(id: string, payload: any) {
    await this.prisma.book.findUniqueOrThrow({
      where: {
        bookId: id,
      },
    });

    if (payload?.bookId) {
      throw new HttpException("Can't change bookId", HttpStatus.BAD_REQUEST);
    }

    const result = await this.prisma.book.update({
      where: {
        bookId: id,
      },
      data: payload,
    });
    return result;
  }

  async deleteBookDB(id: string) {
    await this.prisma.book.findUniqueOrThrow({
      where: {
        bookId: id,
      },
    });

    await this.prisma.book.delete({
      where: {
        bookId: id,
      },
    });
  }
}
