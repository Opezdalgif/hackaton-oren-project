import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Query,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ChatsService } from './chat.service';
import { JwtPayloadParam } from 'src/common/decorators/jwt-payload.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ChatFindDto } from './dto/chat-find.dto';
import { AccountRoleEnum } from 'src/common/enums/account-role.enum';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@Controller('chat')
@UsePipes(ValidationPipe)
@UseGuards(AccessTokenGuard)
export class ChatController {
    constructor(private readonly chatsService: ChatsService) {}

    @Get('/getSelf')
    // @Roles(AccountRoleEnum.User)
    getSelf(@JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.chatsService.getSelf(jwtPayload.userId);
    }

    @Get('/getOne/:id')
    getOne(
        @Param('id', ParseIntPipe) chatId: number
    ){
        return this.chatsService.findOne({id: chatId})
    }
}
