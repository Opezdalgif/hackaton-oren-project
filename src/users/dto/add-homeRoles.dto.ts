import { IsEnum, IsNumber, IsString } from "class-validator";
import { AccountRoleEnum } from "src/common/enums/account-role.enum";

export class AddHomeRolesDto {
    @IsNumber()
    userId: number

    @IsEnum(AccountRoleEnum)
    role: AccountRoleEnum
}