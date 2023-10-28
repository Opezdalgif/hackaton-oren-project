import { IsArray, IsNumber } from "class-validator";
import { CreateQuestionDto } from "../questions/dto/create-question.dto";

export class CreateTestResultUserDto {
    @IsNumber()
    testId: number

    @IsArray()
    questions: CreateQuestionDto[]
}