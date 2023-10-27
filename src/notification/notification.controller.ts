import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtPayloadParam } from 'src/common/decorators/jwt-payload.decorator';
import { NotificationStatusEnum } from 'src/common/enums/notification-status.enum';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { CreateNotificationDto } from './dto/notification-create.dto';
import { NotificationService } from './notification.service';

@UseGuards(AccessTokenGuard)
@Controller('notification')
export class NotificationController {

    constructor(
        private notificationService: NotificationService
    ){}

    @Post('/create')
    create(@Body() dto: CreateNotificationDto, type: NotificationStatusEnum, @JwtPayloadParam() JwtPayload: JwtPayload){
        return this.notificationService.create(dto, type, JwtPayload.userId)
    }

    @Get('/getSelf')
    getSelf(@JwtPayloadParam() JwtPayload: JwtPayload){
        return this.notificationService.getAllSelf(JwtPayload.userId)
    }   
}
