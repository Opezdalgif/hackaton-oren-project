import { IsNumber, IsOptional } from "class-validator";

export class WhereRolesCompanyDto {
    @IsOptional()
    id?: number

    @IsOptional()
    companyId?: number

    @IsOptional()
    nameRole?: string
}