import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SectorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.sector.findMany({
      orderBy: {
        nombre: 'asc',
      },
    });
  }
}
