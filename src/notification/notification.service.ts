import { forwardRef, Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationStatusEnum } from 'src/common/enums/notification-status.enum';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/notification-create.dto';
import { NotificationEntity } from './entity/notification.entity';
import { Expo } from 'expo-server-sdk'
import { PushNotificationService } from './push-notification.sevice';
import { GetNotificationDto } from './dto/notification-get.dto';
import {WebSocketServer} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/services/users.service';
import { MessagesGateway } from 'src/chat/gateways/messages.gateway';
import { EChatGatewayEvents } from 'src/common/enums/chat-gateway-events.enum';

@Injectable()
export class NotificationService {

    @WebSocketServer()
    server: Server

    private readonly logger = new Logger('NOTIFICATION-SERVICE')

    constructor(
        @InjectRepository(NotificationEntity)
        private notificationRepository: Repository<NotificationEntity>,

        private pushNotificationService: PushNotificationService,

        private readonly userService: UsersService,
        @Inject(forwardRef(() => MessagesGateway))
        private readonly messagesGateway: MessagesGateway
    ){}

    async create(dto: CreateNotificationDto, type: NotificationStatusEnum, senderId: number){
        const notification = await this.notificationRepository.create({
            userId: dto.userId,
            senderId: senderId,
            type: dto.type
        })

        const notifications = await this.getAllSelf(dto.userId)

        const user = await this.userService.find({
            id: dto.userId
        })

        this.pushNotificationService.sendPushNotification(
            user.pushToken,
            'Cupid', /* Header уведомления */
            type === NotificationStatusEnum.like ? 'Вы получили лайк' : type === NotificationStatusEnum.match ? 'У вас появилась пара' : 'Вашу страницу посетили', /* Body уведомления */
            'Cupid' /*  */
        )
        
        await this.messagesGateway.server.emit(EChatGatewayEvents.ReturnSelfNotifications, notifications)
        
        try {
            await notification.save()
            return notification
        } catch (err) {
            this.logger.log(err)
            throw new InternalServerErrorException('Ошибка в создание пользователя')
        }
    }

    async getAllSelf(userId: number){
        const notifications = this.notificationRepository.find({
            select: {
                id: true,
                userId: true,
                senderId: true,
                createdAt: true
            },
            relations: {
             
            },
            where: {
                userId: userId
            }
        })   

        return notifications
    }

    async getExist(whereDto: GetNotificationDto){
        const notification = await this.notificationRepository.findOne({
            select: {
                id: true,
                userId: true,
                senderId: true
            }
        })

        return notification
    }

}
