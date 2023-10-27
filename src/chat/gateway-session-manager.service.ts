import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IAuthorizedSocket } from 'src/common/interfaces/authorized-socket.interface';
import { ChatsService } from './chat.service';
import { ChatEntity } from './entities/chat.entity';
import { AccountRoleEnum } from 'src/common/enums/account-role.enum'
import { EChatGatewayEvents } from 'src/common/enums/chat-gateway-events.enum';

interface IChatMembers {
    chatId: number;
    userId: number;
    memberSockets: IAuthorizedSocket[];
}

@Injectable()
export class GatewaySessionManagerService {
    private readonly chatMembers: IChatMembers[] = [];
    constructor(
        @Inject(forwardRef(() => ChatsService))
        private readonly chatsService: ChatsService
    ) {}

    getSocketsByUserId(userId: number): IAuthorizedSocket[] {
        const sockets: IAuthorizedSocket[] = [];

        for (const chat of this.chatMembers) {
            if (chat.userId === userId) {
                for (const socket of chat.memberSockets) {
                    const existingSocket = sockets.find(existingSocket => existingSocket.id === socket.id);
                    if (!existingSocket) {
                        sockets.push(socket);
                    }
                }
            }
        }

        return sockets;
    }

    /**
     * Получение списка чатов, в которых участвует пользователь
     * @param socket
     * @returns
     */
     async getChatMembersForSocket(socket: IAuthorizedSocket) {
        let chats = [];
        const chat = await this.chatsService.findOne({id: socket.handshake.query.chatId});

        
        
        if (!chat) {
            return null;
        } else if (socket.user.id === chat.senderId) {
            chats = await this.chatsService.get(socket.user.id);
        } else {
            chats = await this.chatsService.get(socket.user.id);
        }
        
        socket.emit(EChatGatewayEvents.ReturnSelfChats, chats);

        return chats;
    }

    /**
     * Регистрация пользователя, добавление его в чаты
     * @param socket
     */
    async registerClient(socket: IAuthorizedSocket) {
        const chats: any[] = await this.getChatMembersForSocket(socket);
        

        if (chats === null) {
            return null
        } else if (chats.length === 0) {
            return;
        }

        for (let chat of chats) {
            let filter = this.chatMembers.filter((c) => c.chatId === chat.id);

            if (filter.length === 0) {
                this.chatMembers.push({
                    chatId: chat.id,
                    userId: socket.user.id,
                    memberSockets: [socket],
                });
            } else {
                let index = this.chatMembers.indexOf(filter.pop());
                if (index !== -1) {
                    this.chatMembers[index].memberSockets.push(socket);
                }
            }
        }
    }

    /**
     * Удалить слушателя
     * @param socket
     * @returns
     */
    async logoutClient(socket: IAuthorizedSocket) {
        for (let chat of this.chatMembers) {
            let index = chat.memberSockets.indexOf(socket);
            if (index !== -1) {
                chat.memberSockets.splice(index, 1);
            }
        }
    }

    /**
     * Получить список участников чата
     * @param socket
     * @param chatId
     */
    async getMembersFromChat(socket: IAuthorizedSocket, chatId: number) {
        let filter = this.chatMembers.filter((c) => c.chatId == chatId);

        if (!filter) {
            return [];
        }

        let index = this.chatMembers.indexOf(filter.pop());

        if (index !== -1) {
            let members: IAuthorizedSocket[] = [];

            for (let member of this.chatMembers[index].memberSockets) {
                if (member !== socket) {
                    members.push(member);
                }
            }

            return members;
        } else {
            return [];
        }
    }
}
