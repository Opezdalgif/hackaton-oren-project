import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {
    forwardRef,
    Inject,
    Logger,
    UseFilters,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { GatewayFilter } from './gateway.filter';
import { IAuthorizedSocket } from 'src/common/interfaces/authorized-socket.interface';
import { GatewaySessionManagerService } from '../gateway-session-manager.service';
import { GatewayMessageSendDto } from '../dto/gateway-message-send.dto';
import { ChatMessageService } from '../chat-message.service';
import { EChatGatewayEvents } from 'src/common/enums/chat-gateway-events.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessageEntity } from '../entities/chat-message.entity';
import { Repository } from 'typeorm';
import { ChatsService } from '../chat.service';
import { ChatCreateDto } from '../dto/chat-create.dto';
import { Server } from 'socket.io';
import { NotificationService } from 'src/notification/notification.service';

@WebSocketGateway({
    pingInterval: 10000,
    pingTimeout: 15000,
    cors: {
        origin: '*',
        credentials: true,
    },
})
@UseFilters(GatewayFilter)
export class MessagesGateway
    implements OnGatewayConnection, OnGatewayDisconnect
{
    private readonly logger = new Logger('Message-Gateway');

    @WebSocketServer()
    server: Server

    constructor(
        @Inject(forwardRef(() => GatewaySessionManagerService))
        private readonly gatewaySessionManagerService: GatewaySessionManagerService,
        @Inject(forwardRef(() => ChatMessageService))
        private readonly chatMessageService: ChatMessageService,
        @Inject(forwardRef(() => ChatsService))
        private readonly chatService: ChatsService,
    ) {}

    /**
     * Регистрация сесии
     * @param socket
     */
    handleConnection(socket: IAuthorizedSocket): any {
        this.logger.log(`Client ${socket.user.firstName} connected!`);
        this.gatewaySessionManagerService.registerClient(socket);
        socket.emit(EChatGatewayEvents.ClientConnected, 'success');
    }

    /**
     * Закрытие сессии
     * @param socket
     */
    async handleDisconnect(socket: IAuthorizedSocket) {
        this.logger.log(`Client disconnected!`);
        this.gatewaySessionManagerService.logoutClient(socket);
        socket.emit(EChatGatewayEvents.ClientDisconnected, 'success')
    }

    /**
     * Отправка сообщения всем участникам чата
     * @param socket
     * @param dto
     */
     @SubscribeMessage(EChatGatewayEvents.SendMessage)
        @UsePipes(new ValidationPipe())
        async handleSendMessage(
            @ConnectedSocket() socket: IAuthorizedSocket,
            @MessageBody() dto: GatewayMessageSendDto,
        ) {
            try {
                dto.senderId = socket.user.id;
                const message = await this.chatMessageService.send(dto, dto.senderId);
                const members = await this.gatewaySessionManagerService.getMembersFromChat(socket, dto.chatId);
                
                for (const member of members) {
                    member.emit(EChatGatewayEvents.ReceivedMessage, message);
                }
                
                socket.emit(EChatGatewayEvents.SuccessSend, {
                    indexInChat: dto.indexInChat,
                });

                for (const member of members) {
                    await this.gatewaySessionManagerService.getChatMembersForSocket(member);
                }
            } catch (error) {
                // Обработка ошибок
            }
        }

     @SubscribeMessage(EChatGatewayEvents.CreateChat)
    async handleCreateChat(
        @ConnectedSocket() socket: IAuthorizedSocket,
        @MessageBody() dto: ChatCreateDto
    ){
        const chat = await this.chatService.get(socket.user.id)

        socket.emit(EChatGatewayEvents.ReturnSelfChats, chat)
    }

    @SubscribeMessage(EChatGatewayEvents.ReadMessage)
    async handleReadMessage(
        @ConnectedSocket() soket: IAuthorizedSocket,
        @MessageBody() messageId: number
    ) {
        soket.emit('messageRead', messageId)
        console.log('message Read');
        
        // await this.chatMessageService.marMessageRead(messageId)
    }

    @SubscribeMessage(EChatGatewayEvents.GetSelfChats)
    async handelGetChats(
        @ConnectedSocket() socket: IAuthorizedSocket
    ) {
        const chats = await this.chatService.getSelf(socket.user.id)
        socket.emit(EChatGatewayEvents.ReturnSelfChats, chats)
    }
}
