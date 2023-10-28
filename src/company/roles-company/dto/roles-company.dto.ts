import { IsString } from "class-validator";

export class CreateRolesCompanyDto {
    @IsString({message: `Наименование роли для предприятия должно быть строкой`})
    nameRole: string
}