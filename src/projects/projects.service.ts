import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly projectInclude = {
    category: {
      select: {
        id: true,
        name_categoria: true,
        description_categoria: true,
      },
    },
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
    resources: {
      select: {
        id: true,
        name_recurso: true,
        type_recurso: true,
        route_recurso: true,
      },
      orderBy: {
        id: 'asc',
      },
    },
  } as const;

  async create(createProjectDto: CreateProjectDto) {
    const nameProyecto =
      createProjectDto.name_proyecto ?? createProjectDto.nameProyecto;

    const descripcionProyecto =
      createProjectDto.descripcion_proyecto ??
      createProjectDto.descripcionProyecto;

    const estadoProyecto =
      createProjectDto.estado_proyecto ?? createProjectDto.estadoProyecto;

    const carreraAsociada =
      createProjectDto.carrera_asociada ?? createProjectDto.carreraAsociada;

    const tecnologiasUtilizadas =
      createProjectDto.tecnologias_utilizadas ??
      createProjectDto.tecnologiasUtilizadas;

    const nivelMadurezTecnologica =
      createProjectDto.nivel_madurez_tecnologica ??
      createProjectDto.nivelMadurezTecnologica;

    const estadoDesarrollo =
      createProjectDto.estado_desarrollo ?? createProjectDto.estadoDesarrollo;

    const informacionTecnica =
      createProjectDto.informacion_tecnica ??
      createProjectDto.informacionTecnica;

    const informacionComercial =
      createProjectDto.informacion_comercial ??
      createProjectDto.informacionComercial;

    const demoUrl = createProjectDto.demo_url ?? createProjectDto.demoUrl;

    const contactoNombre =
      createProjectDto.contacto_nombre ?? createProjectDto.contactoNombre;

    const contactoTelefono =
      createProjectDto.contacto_telefono ?? createProjectDto.contactoTelefono;

    const contactoCorreo =
      createProjectDto.contacto_correo ?? createProjectDto.contactoCorreo;

    const nombreGrupo =
      createProjectDto.nombre_grupo ?? createProjectDto.nombreGrupo;

    const contactoRol =
      createProjectDto.contacto_rol ?? createProjectDto.contactoRol;

    const categoryId =
      createProjectDto.id_categoria ??
      createProjectDto.idCategoria ??
      createProjectDto.categoryId;

    const userId =
      createProjectDto.id_usuario ??
      createProjectDto.idUsuario ??
      createProjectDto.userId;

    if (!nameProyecto) {
      throw new BadRequestException('El nombre del proyecto es obligatorio.');
    }

    if (!descripcionProyecto) {
      throw new BadRequestException(
        'La descripción del proyecto es obligatoria.',
      );
    }

    if (!categoryId) {
      throw new BadRequestException('El ID de la categoría es obligatorio.');
    }

    if (!userId) {
      throw new BadRequestException('El ID del usuario es obligatorio.');
    }

    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('La categoría indicada no existe.');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('El usuario indicado no existe.');
    }

    return this.prisma.project.create({
      data: {
        name_proyecto: nameProyecto,
        descripcion_proyecto: descripcionProyecto,
        estado_proyecto: estadoProyecto ?? 'PENDIENTE',
        carrera_asociada: carreraAsociada,
        tecnologias_utilizadas: tecnologiasUtilizadas,
        nivel_madurez_tecnologica: nivelMadurezTecnologica,
        estado_desarrollo: estadoDesarrollo,
        informacion_tecnica: informacionTecnica,
        informacion_comercial: informacionComercial,
        demo_url: demoUrl,
        contacto_nombre: contactoNombre,
        contacto_telefono: contactoTelefono,
        contacto_correo: contactoCorreo,
        nombre_grupo: nombreGrupo,
        contacto_rol: contactoRol,
        id_categoria: categoryId,
        id_usuario: userId,
      },
      include: this.projectInclude,
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: this.projectInclude,
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findById(id: number) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: this.projectInclude,
    });

    if (!project) {
      throw new NotFoundException('Proyecto no encontrado.');
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const projectExists = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!projectExists) {
      throw new NotFoundException('Proyecto no encontrado.');
    }

    const data: {
      name_proyecto?: string;
      descripcion_proyecto?: string;
      estado_proyecto?: string;
      carrera_asociada?: string;
      tecnologias_utilizadas?: string;
      nivel_madurez_tecnologica?: string;
      estado_desarrollo?: string;
      informacion_tecnica?: string;
      informacion_comercial?: string;
      demo_url?: string;
      contacto_nombre?: string;
      contacto_telefono?: string;
      contacto_correo?: string;
      nombre_grupo?: string;
      contacto_rol?: string;
      id_categoria?: number;
      id_usuario?: number;
    } = {};

    const nameProyecto =
      updateProjectDto.name_proyecto ?? updateProjectDto.nameProyecto;

    const descripcionProyecto =
      updateProjectDto.descripcion_proyecto ??
      updateProjectDto.descripcionProyecto;

    const estadoProyecto =
      updateProjectDto.estado_proyecto ?? updateProjectDto.estadoProyecto;

    const carreraAsociada =
      updateProjectDto.carrera_asociada ?? updateProjectDto.carreraAsociada;

    const tecnologiasUtilizadas =
      updateProjectDto.tecnologias_utilizadas ??
      updateProjectDto.tecnologiasUtilizadas;

    const nivelMadurezTecnologica =
      updateProjectDto.nivel_madurez_tecnologica ??
      updateProjectDto.nivelMadurezTecnologica;

    const estadoDesarrollo =
      updateProjectDto.estado_desarrollo ?? updateProjectDto.estadoDesarrollo;

    const informacionTecnica =
      updateProjectDto.informacion_tecnica ??
      updateProjectDto.informacionTecnica;

    const informacionComercial =
      updateProjectDto.informacion_comercial ??
      updateProjectDto.informacionComercial;

    const demoUrl = updateProjectDto.demo_url ?? updateProjectDto.demoUrl;

    const contactoNombre =
      updateProjectDto.contacto_nombre ?? updateProjectDto.contactoNombre;

    const contactoTelefono =
      updateProjectDto.contacto_telefono ?? updateProjectDto.contactoTelefono;

    const contactoCorreo =
      updateProjectDto.contacto_correo ?? updateProjectDto.contactoCorreo;

    const nombreGrupo =
      updateProjectDto.nombre_grupo ?? updateProjectDto.nombreGrupo;

    const contactoRol =
      updateProjectDto.contacto_rol ?? updateProjectDto.contactoRol;

    const categoryId =
      updateProjectDto.id_categoria ??
      updateProjectDto.idCategoria ??
      updateProjectDto.categoryId;

    const userId =
      updateProjectDto.id_usuario ??
      updateProjectDto.idUsuario ??
      updateProjectDto.userId;

    if (nameProyecto !== undefined) {
      data.name_proyecto = nameProyecto;
    }

    if (descripcionProyecto !== undefined) {
      data.descripcion_proyecto = descripcionProyecto;
    }

    if (estadoProyecto !== undefined) {
      data.estado_proyecto = estadoProyecto;
    }

    if (carreraAsociada !== undefined) {
      data.carrera_asociada = carreraAsociada;
    }

    if (tecnologiasUtilizadas !== undefined) {
      data.tecnologias_utilizadas = tecnologiasUtilizadas;
    }

    if (nivelMadurezTecnologica !== undefined) {
      data.nivel_madurez_tecnologica = nivelMadurezTecnologica;
    }

    if (estadoDesarrollo !== undefined) {
      data.estado_desarrollo = estadoDesarrollo;
    }

    if (informacionTecnica !== undefined) {
      data.informacion_tecnica = informacionTecnica;
    }

    if (informacionComercial !== undefined) {
      data.informacion_comercial = informacionComercial;
    }

    if (demoUrl !== undefined) {
      data.demo_url = demoUrl;
    }

    if (contactoNombre !== undefined) {
      data.contacto_nombre = contactoNombre;
    }

    if (contactoTelefono !== undefined) {
      data.contacto_telefono = contactoTelefono;
    }

    if (contactoCorreo !== undefined) {
      data.contacto_correo = contactoCorreo;
    }

    if (nombreGrupo !== undefined) {
      data.nombre_grupo = nombreGrupo;
    }

    if (contactoRol !== undefined) {
      data.contacto_rol = contactoRol;
    }

    if (categoryId !== undefined) {
      const category = await this.prisma.category.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw new NotFoundException('La categoría indicada no existe.');
      }

      data.id_categoria = categoryId;
    }

    if (userId !== undefined) {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException('El usuario indicado no existe.');
      }

      data.id_usuario = userId;
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'Debe enviar al menos un campo para actualizar.',
      );
    }

    return this.prisma.project.update({
      where: {
        id,
      },
      data,
      include: this.projectInclude,
    });
  }

  async remove(id: number) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      throw new NotFoundException('Proyecto no encontrado.');
    }

    await this.prisma.resource.deleteMany({
      where: {
        id_proyecto: id,
      },
    });

    await this.prisma.project.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Proyecto eliminado correctamente.',
      deletedProjectId: id,
    };
  }
}