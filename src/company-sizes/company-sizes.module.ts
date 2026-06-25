import { Module } from '@nestjs/common';
import { CompanySizesController } from './company-sizes.controller';
import { CompanySizesService } from './company-sizes.service';

@Module({
  controllers: [CompanySizesController],
  providers: [CompanySizesService],
})
export class CompanySizesModule {}