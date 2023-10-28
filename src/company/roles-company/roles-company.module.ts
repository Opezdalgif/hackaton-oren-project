import { Module } from '@nestjs/common';
import { RolesCompanyController } from './roles-company.controller';
import { RolesCompanyService } from './roles-company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesCompanyEntity } from './enities/roles.company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesCompanyEntity])],
  controllers: [RolesCompanyController],
  providers: [RolesCompanyService],
  exports: [RolesCompanyService]
})
export class RolesCompanyModule {}
