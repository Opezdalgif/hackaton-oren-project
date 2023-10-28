import { IsNumber } from "class-validator";

export class AddRoleCompanyDto {
    @IsNumber()
    rolesCompanyId: number

    @IsNumber()
    userId: number
}