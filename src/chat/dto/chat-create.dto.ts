import { IsNotEmpty, isNumber, IsNumber, IsOptional } from "class-validator"

export class ChatCreateDto {

    @IsOptional()
    @IsNumber({})
    readonly memberId?: number

    @IsOptional()
    @IsNumber({})
    readonly senderId?: number

    @IsOptional()
    readonly isClosed?: boolean

}
