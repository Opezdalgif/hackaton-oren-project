import { IsString } from "class-validator";

export class CreateTestDto {
    @IsString({message: `Наименование теста должно быть строкой`})
    name: string
}