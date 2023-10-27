import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { EChatGatewayEvents } from 'src/common/enums/chat-gateway-events.enum';

@Catch(WsException, HttpException)
export class GatewayFilter {
    public catch(exception: HttpException, host: ArgumentsHost) {
        const client = host.switchToWs().getClient();
        this.handleError(client, exception);
    }

    public handleError(client: Socket, exception: HttpException | WsException) {
        if (exception instanceof HttpException) {
            client.emit(EChatGatewayEvents.ErrorFilter, exception.message);
        } else {
            client.emit(EChatGatewayEvents.ErrorFilter, exception.message);
        }
    }
}
