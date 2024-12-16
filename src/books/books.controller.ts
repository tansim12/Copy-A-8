import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Next,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { UpdateBookDto } from './dto/update-book.dto';
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
  findAll() {
    return this.booksService.findAll();
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
