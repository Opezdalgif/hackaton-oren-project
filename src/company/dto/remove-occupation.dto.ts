import { IsNumber } from "class-validator"

export class RemoveOccupationDto {
    @IsNumber()
    companyId: number

    @IsNumber()
    occupationId: number
}