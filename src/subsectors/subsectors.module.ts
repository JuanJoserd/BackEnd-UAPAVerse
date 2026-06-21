import { Module } from '@nestjs/common';
import { SubsectorsController } from './subsectors.controller';
import { SubsectorsService } from './subsectors.service';

@Module({
  controllers: [SubsectorsController],
  providers: [SubsectorsService],
})
export class SubsectorsModule {}