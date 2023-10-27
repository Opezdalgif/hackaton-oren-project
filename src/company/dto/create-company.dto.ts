import { IsString } from "class-validator";

export class CreateCompanyDto {
    @IsString({message: "Название компании должно быть строкой"})
    name: string;

    @IsString()
    icon: string
}