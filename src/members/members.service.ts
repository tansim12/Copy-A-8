import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}
  async createMemberDB(payload: any) {
    const createMember = await this.prisma.member.create({
      data: payload as never,
    });
    return createMember;
  }

  async findAllMembersDB() {
    const result = await this.prisma.member.findMany();
    return result;
  }
  findSingleMemberDB = async (memberId: string) => {
    const result = await this.prisma.member.findUniqueOrThrow({
      where: {
        memberId,
      },
    });
    return result;
  };

  async findSingleMember(memberId: string) {
    const result = await this.prisma.member.findUniqueOrThrow({
      where: {
        memberId,
      },
    });
    return result;
  }

  async updateSingleMemberDB(memberId: string, payload: any) {
    await this.prisma.member.findUniqueOrThrow({
      where: {
        memberId,
      },
    });

    if (payload?.memberId) {
      throw new HttpException("Can't change memberId", HttpStatus.BAD_REQUEST);
    }

    const result = await this.prisma.member.update({
      where: {
        memberId,
      },
      data: payload,
    });
    return result;
  }

  async deleteMember(memberId: string) {
    await this.prisma.member.findUniqueOrThrow({
      where: {
        memberId,
      },
    });

    await this.prisma.member.delete({
      where: {
        memberId,
      },
    });
    // return result;
  }
}
