import { IsString } from "class-validator";

export class UploadDocumentDto {
    @IsString()
    documentBase64: string

    @IsString() 
    name: string
}