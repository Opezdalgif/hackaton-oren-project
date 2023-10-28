import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from './enities/test.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { QuestionsEntity } from './questions/entites/questions.entity';
import { AnswerEntity } from './questions/answer/enities/answer.entity';
import { QuestionsService } from './questions/questions.service';
import { AnswerService } from './questions/answer/answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity, CompanyEntity, QuestionsEntity, AnswerEntity]),],
  controllers: [TestController],
  providers: [TestService, QuestionsService, AnswerService]
})
export class TestModule {}
