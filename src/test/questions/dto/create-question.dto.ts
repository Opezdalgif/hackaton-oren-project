import { IsArray, IsNumber, IsOptional, IsSemVer, IsString } from "class-validator";
import { CreateAnswerDto } from "../answer/dto/create-answer.dto";

export class CreateQuestionDto {
    @IsString()
    question: string

    @IsOptional() 
    @IsNumber()
    testId: number

    @IsOptional()
    @IsNumber()
    testResultUserId?: number

    @IsArray()
    answers: CreateAnswerDto[]
}