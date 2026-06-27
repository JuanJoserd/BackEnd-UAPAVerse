import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SectorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.sector.findMany({
      select: {
        id: true,
        nombre: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
