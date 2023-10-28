import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntity } from './enities/document.entity';
import { Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(DocumentEntity)
        private readonly documentRepository: Repository<DocumentEntity>,
        private readonly filesService: FilesService
    ){}

    async create() {
        // const documentPath = await this.filesService.uploadFileBase64()
        // const document = await this.
    }
}
