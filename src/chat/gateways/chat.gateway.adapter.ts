import {
    INestApplicationContext,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { IAuthorizedSocket } from 'src/common/interfaces/authorized-socket.interface';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { ChatsService } from '../chat.service';

export class GatewayAdapter extends IoAdapter {
    private readonly logger: Logger = new Logger('Gateway-Adapter');

    
    constructor(
        appOrHttpServer: INestApplicationContext | any,
        private readonly authSessionService: AuthService,

        ) {
            super(appOrHttpServer);
        }
        
    createIOServer(port: number, options?: any) {
        const server = super.createIOServer(port, options);

        server.use(async (socket: IAuthorizedSocket, next) => {
            this.logger.log('Иницилизация подключения');

            if (!socket.handshake.headers.authorization) {
                this.logger.error('Авторизационный токен доступа отсутствует');
                return next(new UnauthorizedException());
            }

            const token: string =
                socket.handshake.headers.authorization.replace('Bearer ', '');

            if (!token) {
                this.logger.error('Авторизационный токен доступа отсутствует');
                return next(new UnauthorizedException());
            }

            const decodedToken = await this.authSessionService.decodeJWT(token);

            if (!decodedToken) {
                this.logger.error('Авторизационный токен недействителен');
                return next(new UnauthorizedException());
            }

            try {
                const session = await this.authSessionService.get(
                    decodedToken.sessionId
                );
                socket.jwtPayload = decodedToken as JwtPayload;
                socket.user = session.user;

            } catch (e) {
                this.logger.error(e);
                return socket.disconnect();
            }

            return next();
        });

        return server;
    }
}
