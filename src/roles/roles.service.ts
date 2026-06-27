import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  // lista los roles disponibles
  async listarRoles() {
    return this.prisma.role.findMany({
      select: {
        id: true,
        name_rol: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}