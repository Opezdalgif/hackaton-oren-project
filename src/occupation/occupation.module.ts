import { Module } from '@nestjs/common';
import { OccupationController } from './occupation.controller';
import { OccupationService } from './occupation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OccupationEntity } from './entity/occupation.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OccupationEntity, CompanyEntity])],
  controllers: [OccupationController],
  providers: [OccupationService],
  exports: [OccupationService]
})
export class OccupationModule {}
