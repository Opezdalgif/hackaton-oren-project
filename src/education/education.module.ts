import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationEntity } from './enities/education.entity';
import { DocumentModule } from 'src/document/document.module';

@Module({
  imports: [TypeOrmModule.forFeature([EducationEntity]), DocumentModule],
  controllers: [EducationController],
  providers: [EducationService]
})
export class EducationModule {}
