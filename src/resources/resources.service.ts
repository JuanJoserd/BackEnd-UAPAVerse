import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesService {
    constructor(private prisma: PrismaService) { }

    async create(createResourceDto: CreateResourceDto) {
        return this.prisma.resource.create({
            data: {
                name_recurso: createResourceDto.name_recurso,
                type_recurso: createResourceDto.type_recurso,
                route_recurso: createResourceDto.route_recurso,
                id_proyecto: createResourceDto.id_proyecto,
            },
        });
    }

    async findAll() {
        return this.prisma.resource.findMany();
    }

    async findOne(id: number) {
        return this.prisma.resource.findUnique({
            where: { id },
        });
    }

    async findByProject(projectId: number) {
        return this.prisma.resource.findMany({
            where: {
                id_proyecto: projectId,
            },
        });
    }

    async update(id: number, updateResourceDto: UpdateResourceDto) {
        return this.prisma.resource.update({
            where: { id },
            data: updateResourceDto,
        });
    }

    async remove(id: number) {
        return this.prisma.resource.delete({
            where: { id },
        });
    }
}




