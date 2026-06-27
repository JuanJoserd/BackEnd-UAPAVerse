import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      select: {
        id: true,
        name_categoria: true,
        description_categoria: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}