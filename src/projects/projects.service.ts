/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateProjectDto) {
        return this.prisma.project.create({
            data: {
                name_proyecto: data.name_proyecto,
                descripcion_proyecto: data.descripcion_proyecto,

                category: {
                    connect: { id: data.categoryId },
                },

                user: {
                    connect: { id: data.userId },
                },
            },


        });
    }

    async findAll() {
        return this.prisma.project.findMany();
    }

    async findOne(id: number) {
        return this.prisma.project.findUnique({ where: { id } });
    }

    async update(id: number, data: UpdateProjectDto) {
        return this.prisma.project.update({
            where: { id },
            data: {
                name_proyecto: data.name_proyecto,
                descripcion_proyecto: data.descripcion_proyecto,
                
            },
        });
    }

    async remove(id: number) {
        return this.prisma.project.delete({ where: { id } });
    }
}
