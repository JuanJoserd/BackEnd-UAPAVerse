import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
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

  async create(createCompanyDto: CreateCompanyDto) {
    const nombreComercial =
      createCompanyDto.entName ?? createCompanyDto.nombre_comercial;

    const telefono =
      createCompanyDto.telephoneNumber ?? createCompanyDto.telefono;

    const emailContacto =
      createCompanyDto.companyEmail ?? createCompanyDto.email_contacto;

    const sectorId =
      createCompanyDto.businessSectorId ?? createCompanyDto.sector_id;

    const companySizeId =
      createCompanyDto.businessSizeId ?? createCompanyDto.company_size_id;

    const subSectorId =
      createCompanyDto.subSectorId ?? createCompanyDto.subsector_id;

    const userId = createCompanyDto.userId ?? createCompanyDto.user_id;

    if (!nombreComercial) {
      throw new BadRequestException('El nombre comercial es obligatorio.');
    }

    if (!telefono) {
      throw new BadRequestException('El teléfono es obligatorio.');
    }

    if (!emailContacto) {
      throw new BadRequestException('El correo de contacto es obligatorio.');
    }

    if (!sectorId) {
      throw new BadRequestException('El sector es obligatorio.');
    }

    if (!companySizeId) {
      throw new BadRequestException('El tamaño de la empresa es obligatorio.');
    }

    if (!userId) {
      throw new BadRequestException('El ID del usuario es obligatorio.');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('El usuario indicado no existe.');
    }

    const existingCompany = await this.prisma.company.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (existingCompany) {
      throw new BadRequestException(
        'Este usuario ya tiene una empresa registrada.',
      );
    }

    const sector = await this.prisma.sector.findUnique({
      where: {
        id: sectorId,
      },
    });

    if (!sector) {
      throw new NotFoundException('El sector indicado no existe.');
    }

    const companySize = await this.prisma.companySize.findUnique({
      where: {
        id: companySizeId,
      },
    });

    if (!companySize) {
      throw new NotFoundException(
        'El tamaño de empresa indicado no existe.',
      );
    }

    if (subSectorId !== undefined) {
      const subsector = await this.prisma.subSector.findUnique({
        where: {
          id: subSectorId,
        },
      });

      if (!subsector) {
        throw new NotFoundException('El subsector indicado no existe.');
      }

      if (subsector.sector_id !== sectorId) {
        throw new BadRequestException(
          'El subsector no pertenece al sector indicado.',
        );
      }
    }

    return this.prisma.company.create({
      data: {
        nombre_comercial: nombreComercial,
        logo: createCompanyDto.logo,
        telefono,
        email_contacto: emailContacto,
        user_id: userId,
        sector_id: sectorId,
        company_size_id: companySizeId,
        subsector_id: subSectorId,
      },
      include: this.companyInclude,
    });
  }

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
      const sector = await this.prisma.sector.findUnique({
        where: {
          id: sectorId,
        },
      });

      if (!sector) {
        throw new NotFoundException('El sector indicado no existe.');
      }

      data.sector_id = sectorId;
    }

    if (companySizeId !== undefined) {
      const companySize = await this.prisma.companySize.findUnique({
        where: {
          id: companySizeId,
        },
      });

      if (!companySize) {
        throw new NotFoundException(
          'El tamaño de empresa indicado no existe.',
        );
      }

      data.company_size_id = companySizeId;
    }

    if (subSectorId !== undefined) {
      const subsector = await this.prisma.subSector.findUnique({
        where: {
          id: subSectorId,
        },
      });

      if (!subsector) {
        throw new NotFoundException('El subsector indicado no existe.');
      }

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