import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentEntity } from './enities/document.entity';
import { Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { url } from 'inspector';
import { UploadDocumentDto } from './dto/upload-document.dto';

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
            const documentPath = await this.filesService.uploadFileBase64(dto.documents[i].documentBase64, true, dto.documents[i].name,'document')
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

    async find(documentId: number) {
        const document = await this.documentRepository.findOne({
            where: {id: documentId}
        })

        if(!document) {
            throw new NotFoundException(`Такого документа нету`)
        }

        return document
    }

    async update(dto: UploadDocumentDto, documentId: number) {
        const document = await this.find(documentId)

        for(let key in dto) {
            document[key] = dto[key]
        }

        try {
            await document.save()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка обновления документа`)
        }
    }

    async remove(documentId: number) {
        const document = await this.find(documentId)

        try {
            await document.remove()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка удаления документа`)
        }
    }
}
