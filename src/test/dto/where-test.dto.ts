import { IsNumber } from "class-validator";

export class WhereTestDto {
    @IsNumber()
    testId?: number

    @IsNumber()
    companyId?: number
}