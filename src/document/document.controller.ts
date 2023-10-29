import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import { DocumentService } from './document.service';
import { UploadDocumentDto } from './dto/upload-document.dto';

@Controller('document')
export class DocumentController {
    constructor(
        private readonly documentService: DocumentService
    ){}

    @Patch('update/:documentId')
    update(@Body() dto: UploadDocumentDto, @Param('documentId') documentId: number) {
        return this.documentService.update(dto, documentId)
    }

    @Delete('remove/:documentId')
    remove(@Param('documentId') documentId: number) {
        return this.documentService.remove(documentId)
    }
}
