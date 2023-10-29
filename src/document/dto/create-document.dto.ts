import { IsArray, IsNumber, IsString } from "class-validator";
import { UploadDocumentDto } from "./upload-document.dto";

export class CreateDocumentDto {
    @IsArray()
    documents: UploadDocumentDto[]
}