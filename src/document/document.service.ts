import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntity } from './enities/document.entity';
import { Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { url } from 'inspector';

@Injectable()
export class DocumentService {
    private logger = new Logger(`DOCUMENT-SERVICE`)
    constructor(
        @InjectRepository(DocumentEntity)
        private readonly documentRepository: Repository<DocumentEntity>,
        private readonly filesService: FilesService
    ){}

    async create(dto: CreateDocumentDto, educationId: number) {
        
        console.log(dto.documents.length)
        for(let i = 0; i < dto.documents.length; i++ ) {
            const documentPath = await this.filesService.uploadFileBase64(dto.documents[i].documentBase64, 'document')
            console.log(documentPath.publicPath)
            const document = await this.documentRepository.create({
                name: dto.documents[i].name,
                url: documentPath.publicPath,
                educationId: educationId
            })

            try {
                await document.save()
            } catch(e) {
                this.logger.error(e)
                throw new BadRequestException(`Произошла ошибка в добавлении документов`)
            }
        }
        
    }
}
