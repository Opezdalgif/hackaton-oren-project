import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from 'src/notification/entity/notification.entity';
import { NotificationService } from 'src/notification/notification.service';
import { PushNotificationService } from 'src/notification/push-notification.sevice';
import { ChatMessagesController } from './chat-message.controller';
import { ChatMessageService } from './chat-message.service';
import { ChatController } from './chat.controller';
import { ChatsService } from './chat.service';
import { ChatMessageEntity } from './entities/chat-message.entity';
import { ChatEntity } from './entities/chat.entity';
import { GatewaySessionManagerService } from './gateway-session-manager.service';
import { MessagesGateway } from './gateways/messages.gateway';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  controllers: [ChatController, ChatMessagesController],
  providers: [
    ChatsService, 
    ChatMessageService, 
    GatewaySessionManagerService, 
    MessagesGateway],
  imports: [
    TypeOrmModule.forFeature([ChatEntity, ChatMessageEntity]), 
    EventEmitterModule.forRoot()],
  exports: [ChatsService, ChatMessageService, GatewaySessionManagerService, MessagesGateway],
})
export class ChatModule {}
