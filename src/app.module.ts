/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { GetdatacompanyModule } from './getdatacompany/getdatacompany.module';
import { SectorsModule } from './sectors/sectors.module';
import { SubsectorsModule } from './subsectors/subsectors.module';
import { CompaniesModule } from './companies/companies.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    CategoriesModule,
    UsersModule,
     RolesModule,
     GetdatacompanyModule,
     SectorsModule,
     SubsectorsModule,
     CompaniesModule,
     ResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}