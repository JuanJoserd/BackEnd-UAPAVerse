import { Controller, Get } from '@nestjs/common';
import { SubsectorsService } from './subsectors.service';

@Controller('api/uapaverse/subsector')
export class SubsectorsController {
  constructor(
    private readonly subsectorsService: SubsectorsService,
  ) {}

  @Get('list')
  findAll() {
    return this.subsectorsService.findAll();
  }
}