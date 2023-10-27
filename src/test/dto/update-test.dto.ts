import { IsString } from "class-validator";

export class UpdateTestDto {
    @IsString({message: `Наименование теста должно быть строкой`})
    name: string
}