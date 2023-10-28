import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersEntity } from './enities/users.enities';
import { UsersService } from './services/users.service';
import { SessionEntity } from 'src/auth/enities/session.entity';
import { UsersController } from './controller/users.controller';
import { IconModule } from 'src/icon/icon.module';
import { FilesModule } from 'src/files/files.module';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { RolesCompanyModule } from 'src/company/roles-company/roles-company.module';


@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      SessionEntity,
      CompanyEntity
    ]),
    FilesModule,
    RolesCompanyModule
],
  controllers:[UsersController],
  providers: [UsersService], 
  exports:[
    UsersService,
  ]
})
export class UsersModule {}
