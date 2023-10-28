import { Module } from '@nestjs/common';
import { TestController } from './controllers/test.controller';
import { TestService } from './service/test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from './enities/test.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { QuestionsEntity } from './questions/entites/questions.entity';
import { AnswerEntity } from './questions/answer/enities/answer.entity';
import { QuestionsService } from './questions/questions.service';
import { AnswerService } from './questions/answer/answer.service';
import { TestResultUserEntity } from './enities/test-result-user.entity';
import { TestResultUserService } from './service/test-result-user.service';
import { TestResultUserController } from './controllers/test-result-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity, CompanyEntity, QuestionsEntity, AnswerEntity, TestResultUserEntity]),],
  controllers: [TestController, TestResultUserController],
  providers: [TestService, QuestionsService, AnswerService, TestResultUserService]
})
export class TestModule {}
