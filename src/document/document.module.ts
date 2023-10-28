import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntity } from './enities/document.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity]),
    FilesModule
  ],
  providers: [DocumentService],
  controllers: [DocumentController]
})
export class DocumentModule {}
