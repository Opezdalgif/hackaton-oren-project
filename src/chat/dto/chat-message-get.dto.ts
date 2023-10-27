import { IsInt, IsNumber } from 'class-validator';

export class ChatMessageGetDto {
    @IsNumber(
        { allowInfinity: false, allowNaN: false },
        { message: 'Должно быть числом' },
    )
    readonly chatId?: number;

    @IsInt()
    offset?: number;
}
