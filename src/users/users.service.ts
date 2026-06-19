import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // lista los usuarios sin mostrar la contraseña
  async listarUsuarios() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name_usuario: true,
        email_usuario: true,
        rol_id: true,
        role: {
          select: {
            id: true,
            name_rol: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  // busca un usuario por su id
  async obtenerUsuario(id: number) {
    const usuario = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name_usuario: true,
        email_usuario: true,
        rol_id: true,
        role: {
          select: {
            id: true,
            name_rol: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException('usuario no encontrado');
    }

    return usuario;
  }

  // actualiza solamente los datos básicos
  async actualizarUsuario(
    id: number,
    datos: {
      name_usuario?: string;
      email_usuario?: string;
      rol_id?: number;
    },
  ) {
    await this.obtenerUsuario(id);

    return this.prisma.user.update({
      where: { id },
      data: datos,
      select: {
        id: true,
        name_usuario: true,
        email_usuario: true,
        rol_id: true,
        role: {
          select: {
            id: true,
            name_rol: true,
          },
        },
        updated_at: true,
      },
    });
  }
}