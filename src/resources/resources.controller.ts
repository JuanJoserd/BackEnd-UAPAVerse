import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Controller('api/uapaverse/resource')
export class ResourcesController {
    constructor(private readonly resourcesService: ResourcesService) { }

    @Post('create')
    create(@Body() createResourceDto: CreateResourceDto) {
        return this.resourcesService.create(createResourceDto);
    }

    @Get('list')
    findAll() {
        return this.resourcesService.findAll();
    }

    @Get('project/:projectId')
    findByProject(@Param('projectId') projectId: string) {
        return this.resourcesService.findByProject(Number(projectId));
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.resourcesService.findOne(Number(id));
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
        return this.resourcesService.update(Number(id), updateResourceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.resourcesService.remove(Number(id));
    }


}