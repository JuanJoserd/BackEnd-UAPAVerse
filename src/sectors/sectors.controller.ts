import { Controller, Get } from '@nestjs/common';
import { SectorsService } from './sectors.service';

@Controller('api/uapaverse/sector')
export class SectorsController {
  constructor(
    private readonly sectorsService: SectorsService,
  ) {}

  @Get('list')
  findAll() {
    return this.sectorsService.findAll();
  }
}