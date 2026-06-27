import { Module } from '@nestjs/common';
import { GetdatacompanyController } from './getdatacompany.controller';
import { GetdatacompanyService } from './getdatacompany.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GetdatacompanyController],
  providers: [GetdatacompanyService],
})
export class GetdatacompanyModule {}