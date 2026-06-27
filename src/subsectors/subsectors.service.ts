import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubsectorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(sectorId?: number) {
    return this.prisma.subSector.findMany({
      where: sectorId
        ? {
            sector_id: sectorId,
          }
        : undefined,
      select: {
        id: true,
        nombre: true,
        sector_id: true,
        sector: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}
