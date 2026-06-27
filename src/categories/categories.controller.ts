import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('uapaverse/category')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get('list')
    async findAll() {
        return this.categoriesService.findAll();
    }
}
