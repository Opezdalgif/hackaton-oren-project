import { IsOptional, IsString } from "class-validator"

export class UpdateEdicationDto {
    @IsOptional()
    @IsString({message: `Поле наименование учебного материала должно быть строкой`})
    name: string

    @IsOptional()
    @IsString({message: `Поле описания учебного материала должно быть строкой`})
    description: string
} 