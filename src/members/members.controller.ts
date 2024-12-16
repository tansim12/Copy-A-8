import {
  Controller,
  Get,
  Post,
  Delete,
  Req,
  Next,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { MembersService } from './members.service';

import { NextFunction, Request, Response } from 'express';
import { successResponse } from 'src/utils/successResponse';

@Controller('api/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  async createMember(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.membersService.createMemberDB(req?.body);
      return res.send(
        successResponse(
          result,
          HttpStatus.OK,
          'Member create successfully done',
        ),
      );
    } catch (error) {
      next(error);
    }
  }

  @Get()
  async findAllMembers(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.membersService.findAllMembersDB();
      return res.send(
        successResponse(
          result,
          HttpStatus.OK,
          'Member create successfully done',
        ),
      );
    } catch (error) {
      next(error);
    }
  }
  @Get(':memberId')
  async findSingleMember(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.membersService.findSingleMember(
        req?.params?.memberId,
      );
      return res.send(
        successResponse(
          result,
          HttpStatus.OK,
          'single member find  successfully done',
        ),
      );
    } catch (error) {
      next(error);
    }
  }

  @Put(':memberId')
  async singleMemberUpdate(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.membersService.updateSingleMemberDB(
        req?.params?.memberId,
        req?.body,
      );
      return res.send(
        successResponse(
          result,
          HttpStatus.OK,
          'update single member successfully done',
        ),
      );
    } catch (error) {
      next(error);
    }
  }

  @Delete(':memberId')
  async deleteSingleMember(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const result = await this.membersService.deleteMember(
        req?.params?.memberId,
      );
      return res.send(
        successResponse(
          result,
          HttpStatus.OK,
          'single member delete  successfully done',
        ),
      );
    } catch (error) {
      next(error);
    }
  }
}
