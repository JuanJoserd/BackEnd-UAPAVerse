/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateCategoryDto) {
        return this.prisma.category.create({
            data: {
                name_categoria: data.name_categoria,
                description_categoria: data.description_categoria,
            },
        });
    }

    async findAll() {
        return this.prisma.category.findMany();
    }

    async findOne(id: number) {
        return this.prisma.category.findUnique({ where: { id } });
    }

    async update(id: number, data: UpdateCategoryDto) {
        return this.prisma.category.update({
            where: { id },
            data: {
                name_categoria: data.name_categoria,
            },
        });
    }

    async remove(id: number) {
        return this.prisma.category.delete({ where: { id } });
    }
}
