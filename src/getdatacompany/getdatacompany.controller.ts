import { Controller, Get } from '@nestjs/common';
import { GetdatacompanyService } from './getdatacompany.service';

@Controller('api/getdatacompany')
export class GetdatacompanyController {
  constructor(
    private readonly getdatacompanyService: GetdatacompanyService,
  ) {}

  @Get('category')
  getCompanyCategories() {
    return this.getdatacompanyService.getCompanyCategories();
  }

  @Get('size')
  getCompanySizes() {
    return this.getdatacompanyService.getCompanySizes();
  }
}
