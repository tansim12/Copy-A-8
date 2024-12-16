import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}
  async borrowDB(payload: any) {
    await this.prisma.book.findUniqueOrThrow({
      where: {
        bookId: payload?.bookId,
      },
    });
    await this.prisma.member.findUniqueOrThrow({
      where: {
        memberId: payload?.memberId,
      },
    });
    const result = await this.prisma.borrowRecord.create({
      data: payload,
    });
    return result;
  }
  async returnDB(payload: any) {
    const borrow = await this.prisma.borrowRecord.findUniqueOrThrow({
      where: {
        borrowId: payload?.borrowId,
      },
    });

    if (borrow?.returnDate !== null) {
      throw new HttpException(
        'This book already returned',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.prisma.borrowRecord.update({
      where: {
        borrowId: payload?.borrowId,
      },
      data: {
        returnDate: new Date(),
      },
    });
    return result;
  }
  async borrowOverdueDB() {
    const dayDiffer = new Date();
    dayDiffer.setDate(dayDiffer.getDate() - 14);
    console.log(dayDiffer);

    // Find all overdue borrow records
    const findOverdueRecords = await this.prisma.borrowRecord.findMany({
      where: {
        borrowDate: {
          lte: dayDiffer,
        },
        returnDate: null,
      },
      include: {
        book: {
          select: { title: true },
        },
        member: {
          select: { name: true },
        },
      },
    });

    // Map the results to calculate overdue days and format response
    const result = findOverdueRecords?.map((item) => {
      const overdueDays =
        Math.ceil(
          (new Date().getTime() - new Date(item.borrowDate).getTime()) /
            (1000 * 60 * 60 * 24),
        ) - 14;

      return {
        borrowId: item.borrowId,
        bookTitle: item.book.title,
        borrowerName: item.member.name,
        overdueDays,
      };
    });
    return result;
  }
}
