import { Controller, Get } from '@nestjs/common';
import { CompanySizesService } from './company-sizes.service';

@Controller('api/getdatacompany')
export class CompanySizesController {
  constructor(
    private readonly companySizesService: CompanySizesService,
  ) {}

  @Get('size')
  getSizes() {
    return this.companySizesService.getSizes();
  }

  @Get('category')
  getCategories() {
    return this.companySizesService.getCategories();
  }
}