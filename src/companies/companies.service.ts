import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly companyInclude = {
    user: {
      select: {
        id: true,
        name_usuario: true,
        email_usuario: true,
        role: {
          select: {
            id: true,
            name_rol: true,
          },
        },
      },
    },
    sector: {
      select: {
        id: true,
        nombre: true,
      },
    },
    subsector: {
      select: {
        id: true,
        nombre: true,
      },
    },
    companySize: {
      select: {
        id: true,
        name: true,
      },
    },
  } as const;

  async findAll() {
    return this.prisma.company.findMany({
      include: this.companyInclude,
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findById(id: number) {
    const company = await this.prisma.company.findUnique({
      where: {
        id,
      },
      include: this.companyInclude,
    });

    if (!company) {
      throw new NotFoundException('Empresa no encontrada.');
    }

    return company;
  }

  async findByUserId(userId: number) {
    const company = await this.prisma.company.findUnique({
      where: {
        user_id: userId,
      },
      include: this.companyInclude,
    });

    if (!company) {
      throw new NotFoundException(
        'No existe una empresa asociada a este usuario.',
      );
    }

    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const companyExists = await this.prisma.company.findUnique({
      where: {
        id,
      },
    });

    if (!companyExists) {
      throw new NotFoundException('Empresa no encontrada.');
    }

    const data: any = {};

    const nombreComercial =
      updateCompanyDto.entName ?? updateCompanyDto.nombre_comercial;

    const telefono =
      updateCompanyDto.telephoneNumber ?? updateCompanyDto.telefono;

    const emailContacto =
      updateCompanyDto.companyEmail ?? updateCompanyDto.email_contacto;

    const sectorId =
      updateCompanyDto.businessSectorId ?? updateCompanyDto.sector_id;

    const companySizeId =
      updateCompanyDto.businessSizeId ?? updateCompanyDto.company_size_id;

    const subSectorId =
      updateCompanyDto.subSectorId ?? updateCompanyDto.subsector_id;

    if (nombreComercial !== undefined) {
      data.nombre_comercial = nombreComercial;
    }

    if (updateCompanyDto.logo !== undefined) {
      data.logo = updateCompanyDto.logo;
    }

    if (telefono !== undefined) {
      data.telefono = telefono;
    }

    if (emailContacto !== undefined) {
      data.email_contacto = emailContacto;
    }

    if (sectorId !== undefined) {
      data.sector_id = sectorId;
    }

    if (companySizeId !== undefined) {
      data.company_size_id = companySizeId;
    }

    if (subSectorId !== undefined) {
      data.subsector_id = subSectorId;
    }

    return this.prisma.company.update({
      where: {
        id,
      },
      data,
      include: this.companyInclude,
    });
  }
}
