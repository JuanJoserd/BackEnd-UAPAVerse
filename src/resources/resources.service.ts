import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly resourceInclude = {
    project: {
      select: {
        id: true,
        name_proyecto: true,
        descripcion_proyecto: true,
        estado_proyecto: true,
      },
    },
  } as const;

  async create(createResourceDto: CreateResourceDto) {
    const nameRecurso =
      createResourceDto.name_recurso ?? createResourceDto.nameRecurso;

    const typeRecurso =
      createResourceDto.type_recurso ?? createResourceDto.typeRecurso;

    const routeRecurso =
      createResourceDto.route_recurso ?? createResourceDto.routeRecurso;

    const projectId =
      createResourceDto.id_proyecto ??
      createResourceDto.idProyecto ??
      createResourceDto.projectId;

    if (!nameRecurso) {
      throw new BadRequestException('El nombre del recurso es obligatorio.');
    }

    if (!typeRecurso) {
      throw new BadRequestException('El tipo del recurso es obligatorio.');
    }

    if (!routeRecurso) {
      throw new BadRequestException('La ruta del recurso es obligatoria.');
    }

    if (!projectId) {
      throw new BadRequestException('El ID del proyecto es obligatorio.');
    }

    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('El proyecto indicado no existe.');
    }

    return this.prisma.resource.create({
      data: {
        name_recurso: nameRecurso,
        type_recurso: typeRecurso,
        route_recurso: routeRecurso,
        id_proyecto: projectId,
      },
      include: this.resourceInclude,
    });
  }

  async findAll() {
    return this.prisma.resource.findMany({
      include: this.resourceInclude,
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findById(id: number) {
    const resource = await this.prisma.resource.findUnique({
      where: {
        id,
      },
      include: this.resourceInclude,
    });

    if (!resource) {
      throw new NotFoundException('Recurso no encontrado.');
    }

    return resource;
  }

  async findByProjectId(projectId: number) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('El proyecto indicado no existe.');
    }

    return this.prisma.resource.findMany({
      where: {
        id_proyecto: projectId,
      },
      include: this.resourceInclude,
      orderBy: {
        id: 'asc',
      },
    });
  }

  async update(id: number, updateResourceDto: UpdateResourceDto) {
    const resourceExists = await this.prisma.resource.findUnique({
      where: {
        id,
      },
    });

    if (!resourceExists) {
      throw new NotFoundException('Recurso no encontrado.');
    }

    const data: {
      name_recurso?: string;
      type_recurso?: string;
      route_recurso?: string;
      id_proyecto?: number;
    } = {};

    const nameRecurso =
      updateResourceDto.name_recurso ?? updateResourceDto.nameRecurso;

    const typeRecurso =
      updateResourceDto.type_recurso ?? updateResourceDto.typeRecurso;

    const routeRecurso =
      updateResourceDto.route_recurso ?? updateResourceDto.routeRecurso;

    const projectId =
      updateResourceDto.id_proyecto ??
      updateResourceDto.idProyecto ??
      updateResourceDto.projectId;

    if (nameRecurso !== undefined) {
      data.name_recurso = nameRecurso;
    }

    if (typeRecurso !== undefined) {
      data.type_recurso = typeRecurso;
    }

    if (routeRecurso !== undefined) {
      data.route_recurso = routeRecurso;
    }

    if (projectId !== undefined) {
      const project = await this.prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      if (!project) {
        throw new NotFoundException('El proyecto indicado no existe.');
      }

      data.id_proyecto = projectId;
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'Debe enviar al menos un campo para actualizar.',
      );
    }

    return this.prisma.resource.update({
      where: {
        id,
      },
      data,
      include: this.resourceInclude,
    });
  }

  async remove(id: number) {
    const resource = await this.prisma.resource.findUnique({
      where: {
        id,
      },
    });

    if (!resource) {
      throw new NotFoundException('Recurso no encontrado.');
    }

    await this.prisma.resource.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Recurso eliminado correctamente.',
      deletedResourceId: id,
    };
  }
}