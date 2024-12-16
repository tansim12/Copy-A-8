import {
  Controller,
  Req,
  Res,
  Next,
  Post,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { NextFunction, Request, Response } from 'express';
import { successResponse } from 'src/utils/successResponse';

@Controller('api/borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post()
  async crateBorrow(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.borrowService.borrowDB(req?.body);
      return res.send(
        successResponse(
          result,
          HttpStatus.OK,
          ' create borrow successfully done',
        ),
      );
    } catch (error) {
      next(error);
    }
  }
  @Post('/return')
  async returnBook(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.borrowService.returnDB(req?.body);
      return res.send(
        successResponse(
          result,
          HttpStatus.OK,
          ' return borrow successfully done',
        ),
      );
    } catch (error) {
      next(error);
    }
  }
  @Get('/overdue')
  async borrowOverdue(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.borrowService.borrowOverdueDB();
      return res.send(
        successResponse(
          result,
          HttpStatus.OK,
          '  borrow over dew successfully done',
        ),
      );
    } catch (error) {
      next(error);
    }
  }
}
