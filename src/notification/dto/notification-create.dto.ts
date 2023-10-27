import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { NotificationStatusEnum } from "src/common/enums/notification-status.enum";

export class CreateNotificationDto{

    @IsOptional()
    @IsNumber({}, {message: 'Полу должно быть числом'})
    readonly id?: number

    @IsOptional()
    @IsEnum({},{message: `Должно быть enum`})
    readonly type?: NotificationStatusEnum

    @IsOptional()
    @IsNumber({}, {message: 'Поле должно быть числом'})
    readonly userId?: number

}