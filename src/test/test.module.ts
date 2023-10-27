import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from './enities/test.entity';
import { CompanyEntity } from 'src/company/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity, CompanyEntity])],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
