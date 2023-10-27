import { Socket } from 'socket.io';
import { ChatEntity } from 'src/chat/entities/chat.entity';
import { UsersEntity } from 'src/users/enities/users.enities';
import { JwtPayload } from '../types/JwtPayload.types';

export interface IAuthorizedSocket extends Socket {
    jwtPayload: JwtPayload;
    user?: UsersEntity;
    chat?: ChatEntity
}
