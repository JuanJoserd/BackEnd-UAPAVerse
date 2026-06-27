import { Module } from '@nestjs/common';
import { SubsectorsController } from './subsectors.controller';
import { SubsectorsService } from './subsectors.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SubsectorsController],
  providers: [SubsectorsService],
})
export class SubsectorsModule {}
