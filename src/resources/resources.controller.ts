import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourcesService } from './resources.service';

@Controller('api/uapaverse/resource')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post('create')
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get('list')
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get('project/:projectId')
  findByProjectId(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.resourcesService.findByProjectId(projectId);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.resourcesService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.resourcesService.remove(id);
  }
}