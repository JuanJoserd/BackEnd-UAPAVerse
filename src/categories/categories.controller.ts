import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('api/uapaverse/category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('list')
  findAll() {
    return this.categoriesService.findAll();
  }
}