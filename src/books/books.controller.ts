import {
  Controller,
  Get,
  Post,
  Delete,
  Req,
  Res,
  Next,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';

import { NextFunction, Request, Response } from 'express';
import { successResponse } from 'src/utils/successResponse';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.booksService.createBookDB(req?.body);
      return res.send(
        successResponse(result, HttpStatus.OK, 'Book create successfully done'),
      );
    } catch (error) {
      next(error);
    }
  }

  @Get()
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.booksService.findAllBooksDB();
      res.send(
        successResponse(result, HttpStatus.OK, 'Books find successfully'),
      );
    } catch (error) {
      next(error);
    }
  }

  @Get(':id')
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.booksService.findSingleBookDB(req?.params?.id);
      res.send(
        successResponse(result, HttpStatus.OK, 'Books retrieved successfully'),
      );
    } catch (error) {
      next(error);
    }
  }

  @Put(':id')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.booksService.updateSingleBooksDB(
        req?.params?.id,
        req?.body,
      );
      res.send(
        successResponse(result, HttpStatus.OK, 'Book updated successfully'),
      );
    } catch (error) {
      next(error);
    }
  }

  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.booksService.deleteBookDB(req?.params?.id);
      res.send(
        successResponse(result, HttpStatus.OK, 'Book successfully deleted'),
      );
    } catch (error) {
      next(error);
    }
  }
}
