import { IsString } from "class-validator";

export class UpdateCompanyDto {
    @IsString({message: "Название компании должно быть строкой"})
    name: string;

    @IsString()
    icon: string
}