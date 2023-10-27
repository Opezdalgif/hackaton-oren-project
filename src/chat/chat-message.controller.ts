import {
    Controller,
    Get,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageGetDto } from './dto/chat-message-get.dto';
import { ChatsService } from './chat.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@UseGuards(AccessTokenGuard)
@Controller('chats/:id/messages')
export class ChatMessagesController {
    constructor(
        private readonly chatMessageService: ChatMessageService,
        private readonly chatsService: ChatsService,
    ) {}

    @Get('getHistory')
    async getHistory(@Query() dto: ChatMessageGetDto, @Param('id') id: number) {
        const chat = await this.chatsService.getOne({ id });

        const offset = dto.offset;
        return this.chatMessageService.get({ chatId: chat.id }, offset);
    }
}