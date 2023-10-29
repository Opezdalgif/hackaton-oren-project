import { IsArray, IsNumber, IsString } from "class-validator";
import { CreateQuestionDto } from "../questions/dto/create-question.dto";

export class CreateTestDto {
    @IsString({message: `Наименование теста должно быть строкой`})
    name: string 

    @IsArray()
    questions: CreateQuestionDto[]

    @IsNumber() 
    roleCompanyId: number
}