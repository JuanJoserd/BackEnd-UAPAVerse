import {Controller, Get, Param, Put, Body,} from '@nestjs/common';

import { CompaniesService } from './companies.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('api/uapaverse/company')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
  ) {}

  @Get('list')
  findAll() {
    return this.companiesService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.companiesService.findByUser(
      Number(userId),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(
      Number(id),
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(
      Number(id),
      dto,
    );
  }
}