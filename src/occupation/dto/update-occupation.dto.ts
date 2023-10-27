import { IsString } from "class-validator";

export class UpdateOccupationDto {
    @IsString({message: `Наименование рода деятельности должен быть строкой`})
    name: string
}