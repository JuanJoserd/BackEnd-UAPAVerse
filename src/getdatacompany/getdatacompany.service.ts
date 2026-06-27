import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GetdatacompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyCategories() {
    const sectors = await this.prisma.sector.findMany({
      select: {
        id: true,
        nombre: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return sectors.map((sector) => ({
      Id_Category: sector.id,
      Name: sector.nombre,
    }));
  }

  async getCompanySizes() {
    const sizes = await this.prisma.companySize.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return sizes.map((size) => ({
      Id_Size: size.id,
      Name: size.name,
    }));
  }
}