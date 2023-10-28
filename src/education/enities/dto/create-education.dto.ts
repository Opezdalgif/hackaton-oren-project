import { IsNotEmpty, IsString } from "class-validator";

export class CreateEducationDto {
    @IsNotEmpty({message: `Должно быть заполнено`})
    @IsString({message: `Поле наименование учебного материала должно быть строкой`})
    name: string

    @IsNotEmpty({message: `Должно быть заполнено`})
    @IsString({message: `Поле описания учебного материала должно быть строкой`})
    description: string
}