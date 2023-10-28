import { IsString } from "class-validator";

export class UpdateRolesCompanyDto {
    @IsString({message: `Наименование роли для предприятия должно быть строкой`})
    nameRole: string
}