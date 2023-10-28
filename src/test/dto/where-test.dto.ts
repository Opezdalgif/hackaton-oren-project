import { IsNumber } from "class-validator";

export class WhereTestDto {
    @IsNumber()
    id?: number

    @IsNumber()
    testId?: number

    @IsNumber()
    companyId?: number
}