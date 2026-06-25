import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubsectorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.subSector.findMany({
      include: {
        sector: true,
      },
    });
  }
}