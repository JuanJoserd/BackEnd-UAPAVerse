import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('uapaverse/project')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post('create')
    async create(@Body() data: CreateProjectDto) {
        return this.projectsService.create(data);
    }

    @Get('list')
    async findAll() {
        return this.projectsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.projectsService.findOne(Number(id));
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateProjectDto) {
        return this.projectsService.update(Number(id), data);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.projectsService.remove(Number(id));
    }
}
