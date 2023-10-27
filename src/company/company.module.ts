import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { UsersEntity } from 'src/users/enities/users.enities';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';
import { OccupationModule } from 'src/occupation/occupation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity, 
      UsersEntity
    ]), 
    FilesModule,
    UsersModule,
    OccupationModule
  ],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
