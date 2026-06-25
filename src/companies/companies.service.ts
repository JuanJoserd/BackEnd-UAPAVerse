import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.company.findMany({
      include: {
        user: true,
        sector: true,
        subsector: true,
        companySize: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.company.findUnique({
      where: { id },
      include: {
        user: true,
        sector: true,
        subsector: true,
        companySize: true,
      },
    });
  }

  async findByUser(userId: number) {
    // Se usa findFirst en lugar de findUnique porque user_id
    // puede no estar marcado como @unique en el modelo Company
    // del schema de Prisma. Si en tu schema.prisma 'user_id' SÍ
    // tiene @unique, puedes volver a usar findUnique sin problema.
    return this.prisma.company.findFirst({
      where: {
        user_id: userId,
      },
      include: {
        user: true,
        sector: true,
        subsector: true,
        companySize: true,
      },
    });
  }

  async update(id: number, dto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id },
      data: dto,
    });
  }
}
