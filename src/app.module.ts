import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/enities/users.enities';
import { SessionEntity } from './auth/enities/session.entity';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { TestModule } from './test/test.module';
import { OccupationModule } from './occupation/occupation.module';
import { EducationModule } from './education/education.module';
import { DocumentModule } from './document/document.module';
import { ChatModule } from './chat/chat.module';
import { ChatEntity } from './chat/entities/chat.entity';
import { ChatMessageEntity } from './chat/entities/chat-message.entity';


@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST ,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      entities: [
        UsersEntity,
        SessionEntity,
        ChatEntity,
        ChatMessageEntity
      ],
      synchronize: true,
       
      
    }),
    FilesModule,
    UsersModule,
    ChatModule,
    AuthModule,
    CompanyModule,
    TestModule,
    OccupationModule,
    EducationModule,
    DocumentModule,
  ],
})
export class AppModule {}
