import { IsNumber } from "class-validator"

export class AddOccupationDto {
    @IsNumber()
    companyId: number

    @IsNumber()
    occupationId: number
}