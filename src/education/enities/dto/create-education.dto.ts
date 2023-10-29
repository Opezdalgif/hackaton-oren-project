import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { UploadDocumentDto } from "src/document/dto/upload-document.dto";

export class CreateEducationDto {
    @IsNotEmpty({message: `Должно быть заполнено`})
    @IsString({message: `Поле наименование учебного материала должно быть строкой`})
    name: string

    @IsNotEmpty({message: `Должно быть заполнено`})
    @IsString({message: `Поле описания учебного материала должно быть строкой`})
    description: string

    @IsArray()
    documents: UploadDocumentDto[]
}