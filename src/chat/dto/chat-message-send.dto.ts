import { ChatMessageStatusEnum } from "src/common/enums/chat-message-status.enum";

export class ChatMessageSendDto {
    readonly text: string;
    readonly chatId: number;
    readonly status: ChatMessageStatusEnum;
    senderId?: number;
}
