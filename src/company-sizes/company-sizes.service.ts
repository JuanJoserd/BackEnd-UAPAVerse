import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompanySizesService {
  constructor(private readonly prisma: PrismaService) {}

  async getSizes() {
    return this.prisma.companySize.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getCategories() {
    return this.prisma.category.findMany({
      orderBy: {
        name_categoria: 'asc',
      },
    });
  }
}