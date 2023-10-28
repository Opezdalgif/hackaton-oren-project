import { IsNumber } from "class-validator";

export class WhereRolesCompanyDto {
    @IsNumber()
    rolesCompanyId?: number

    @IsNumber()
    companyId?: number
}