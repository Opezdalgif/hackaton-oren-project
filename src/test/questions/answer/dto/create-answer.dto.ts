import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAnswerDto {
    @IsString()
    text: string

    @IsBoolean()
    isCorrect: boolean

    @IsOptional()
    @IsNumber()
    questionId: number

    @IsOptional()
    @IsBoolean()
    select?: boolean
}