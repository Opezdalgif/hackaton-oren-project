import { ChatMessageSendDto } from './chat-message-send.dto';

export class GatewayMessageSendDto extends ChatMessageSendDto {
    readonly indexInChat: number;
}
