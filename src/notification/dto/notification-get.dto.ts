import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { NotificationStatusEnum } from '../../common/enums/notification-status.enum'

export class GetNotificationDto{

    @IsOptional()
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly id?: number;

    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly type?: NotificationStatusEnum

    @IsNumber({}, {message: 'Поле должно быть'})
    userId: number

}