import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from 'src/chat/chat.module';
import { MessagesGateway } from 'src/chat/gateways/messages.gateway';
import { UsersModule } from 'src/users/users.module';
import { NotificationEntity } from './entity/notification.entity';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PushNotificationService } from './push-notification.sevice';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, PushNotificationService],
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),
    forwardRef(() => ChatModule),
    forwardRef(() => UsersModule),
],
  exports: [NotificationService, PushNotificationService]
})
export class NotificationModule {}
