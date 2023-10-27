import { IsString } from "class-validator";

export class CreateOccupationDto {
    @IsString({message: `Наименование рода деятельности должен быть строкой`})
    name: string
}