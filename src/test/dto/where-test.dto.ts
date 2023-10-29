import { IsNumber, IsOptional } from "class-validator";

export class WhereTestDto {
    @IsOptional()
    id?: number

    // @IsOptional()
    // companyId?: number

    // @IsOptional()
    // roleCompanyId?: number
}