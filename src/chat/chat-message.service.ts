import {
    ForbiddenException,
    forwardRef,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { ChatMessageEntity } from './entities/chat-message.entity';
import { ChatMessageSendDto } from './dto/chat-message-send.dto';
import { ChatMessageFindDto } from './dto/chat-message-find.dto';
import { ChatMessageGetDto } from './dto/chat-message-get.dto';
import { ChatsService } from './chat.service';
import { ChatEntity } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessageStatusEnum } from 'src/common/enums/chat-message-status.enum';
import { GatewaySessionManagerService } from './gateway-session-manager.service';
import { EChatGatewayEvents } from 'src/common/enums/chat-gateway-events.enum';
import { JwtPayload } from 'src/common/types/JwtPayload.types';

@Injectable()
export class ChatMessageService {
    private readonly logger: Logger = new Logger('Chat-Message-Service');

    constructor(
        @InjectRepository(ChatMessageEntity)
        private readonly chatMessageRepository: Repository<ChatMessageEntity>,
        @Inject(forwardRef(() => ChatsService))
        private readonly chatService: ChatsService,
        @Inject(forwardRef(() => GatewaySessionManagerService))
        private readonly gatewaySessionManagerService: GatewaySessionManagerService
    ) {}

    private async updateChatListForParticipants(chat: ChatEntity, updatedChats: ChatEntity[]) {
        const participants = [chat.senderId, chat.memberId];
    
        for (const participantId of participants) {
            const sockets = this.gatewaySessionManagerService.getSocketsByUserId(participantId);
            if (sockets && sockets.length > 0) {
                for (const socket of sockets) {
                    socket.emit(EChatGatewayEvents.ReturnSelfChats, updatedChats);
                }
            }
        }
    }

    /**
     * Отправить сообщение
     * @param dto
     * @returns
     */
    async send(dto: ChatMessageSendDto, sender: number) {
        const chat = await this.chatService.getOne({ id: dto.chatId });

        if (chat.isClosed) {
            throw new ForbiddenException('Чат не активен');
        }

        let message = await this.chatMessageRepository.create({
            ...dto,
            chatId: chat.id,
            isRead: false
        });
        
        try {
            await message.save()
            await this.chatService.updateLastMessage(message, chat.id)

            const selfChats = await this.chatService.getSelf(sender)

            await this.updateChatListForParticipants(chat, selfChats);
            
        } catch (e) {
            this.logger.error(e);
            throw new InternalServerErrorException('Ошибка отправки сообщения');
        }

        return message;
    }

    /**
     * Поиск сообщения
     * @param whereDto
     * @returns
     */
    async findOne(whereDto: ChatMessageFindDto) {
        return this.chatMessageRepository.findOne({
            where: { ...whereDto },
            select: {
                id: true,
                chatId: true,
                senderId: true,
                text: true
            }, 
        });
    }

    async marMessageRead(messageId: number){
        const message = await this.findOne({id: messageId})

        if (!message) {
            throw new InternalServerErrorException('Сообщение не найдено')
        }

        message.isRead = true
        
        try{
            await message.save()
        } catch(err) {
            console.log(err);
            throw new InternalServerErrorException('произошла ошибка в изменение статуса сообщения')
        }

        return message
    }

    /**
     * Проверка на существование и получение сообщения
     * @param whereDto
     * @returns
     */
    async getOne(whereDto) {
        const message = await this.findOne(whereDto);

        if (!message) {
            throw new NotFoundException();
        }

        return message;
    }

    /**
     * Получение списка сообщений
     * @param whereDto
     * @param offset
     * @returns
     */
    async get(whereDto: ChatMessageGetDto, offset: number = 0) {
        return this.chatMessageRepository.find({
            where: { ...whereDto },
            select: {
                id: true,
                chatId: true,
                senderId: true,
                text: true,
                createdAt: true,
                isRead: true,
                type: true,
            }
        });
    }
}