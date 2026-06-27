import { Controller, Get, Query } from '@nestjs/common';
import { SubsectorsService } from './subsectors.service';

@Controller('api/uapaverse/subsector')
export class SubsectorsController {
  constructor(private readonly subsectorsService: SubsectorsService) {}

  @Get('list')
  findAll(@Query('sectorId') sectorId?: string) {
    const parsedSectorId = sectorId ? Number(sectorId) : undefined;
    return this.subsectorsService.findAll(parsedSectorId);
  }
}