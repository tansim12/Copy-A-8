import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
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

  findAll() {
    return `This action returns all books`;
  }

  async findSingleBookDB(bookId: string) {
    const result = await this.prisma.book.findUniqueOrThrow({
      where: {
        bookId,
      },
    });
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
