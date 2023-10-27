import { forwardRef, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatFindDto } from './dto/chat-find.dto';
import { ChatEntity } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { ChatCreateDto } from './dto/chat-create.dto';
import { ChatUpdateDto } from './dto/chat-update.dto';
import {WebSocketServer} from '@nestjs/websockets'
import { Server } from 'socket.io';
import { EChatGatewayEvents } from 'src/common/enums/chat-gateway-events.enum';
import { MessagesGateway } from './gateways/messages.gateway';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { GatewaySessionManagerService } from './gateway-session-manager.service';

@Injectable()
export class ChatsService {
    private readonly logger: Logger = new Logger('Chats-Service');

    @WebSocketServer()
    server: Server
    
    constructor(
        @InjectRepository(ChatEntity)
        private readonly chatRepository: Repository<ChatEntity>,
        @Inject(forwardRef(() => MessagesGateway))
        private readonly messagesGateWay: MessagesGateway,
        @Inject(forwardRef(() => GatewaySessionManagerService))
        private readonly gatewaySessionManagerService: GatewaySessionManagerService
    ) {}

    async getChatsByUserId(userId: number): Promise<ChatEntity[]> {
        return this.chatRepository.find({
            where: [
                { senderId: userId },
                { memberId: userId },
            ],
        });
    }

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

    async create(dto: ChatCreateDto, sender: JwtPayload | number) {
        let chat = await this.chatRepository.create(dto);
    
        try {
            await chat.save();
    
            let selfChats;
        
            if (typeof sender === 'number') {
                selfChats = await this.getSelf(sender);
            } else {
                selfChats = await this.getSelf(sender.userId);
            }
    
            await this.updateChatListForParticipants(chat, selfChats);
        } catch (err) {
            this.logger.error(err);
            throw new InternalServerErrorException('Ошибка в создание чата');
        }
    
        return chat;
    }

    async findOne(whereDto: ChatFindDto) {
        let chats = await this.chatRepository.findOne({
            
            where: { ...whereDto },
            select: {
                id: true,
                senderId: true,
                memberId: true,
                lastMessageId: true,
                isClosed: true,
            }, 
            relations: {
                lastMessage: {},
                member: {},
                sender: {},
            }
        });

        return chats
    }

    async getOne(whereDto: ChatFindDto) {
        const chat = await this.findOne(whereDto);

        if (!chat) {
            throw new NotFoundException();
        }

        return chat;
    }

    async updateLastMessage(message: any, id: number) {
        try {
            await this.chatRepository.update(id, {
                lastMessageId: message.id,
                lastMessage: message,
            });
        } catch (error) {
            this.logger.log(error);
        }
    }

    async getSelf(userId: number){
        const chatMember = await this.chatRepository.find({
            where: [{memberId: userId}, {senderId: userId}],
            select: {
                id: true,
                senderId: true,
                memberId: true,
                lastMessageId: true,
                isClosed: true
            }, 
            relations: {
                sender: {
                    
                },
                member: {
                    
                },
                lastMessage: {}
            }
        });

        const filteredChats = chatMember.filter(chat => chat.senderId === userId || chat.memberId === userId);
        
        return filteredChats;
    }
   
    async get(userId: any) {
        return this.chatRepository.find({
            where: userId,
            select: {
                id: true,
                senderId: true,
                memberId: true,
                lastMessageId: true,
                isClosed: true
            }, 
            relations: {
                sender: {
                },
                member: {
                },
                lastMessage: {}
            }
        });
    }
}