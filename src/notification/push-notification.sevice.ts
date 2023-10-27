import { Injectable } from '@nestjs/common';
import { Expo } from 'expo-server-sdk';

@Injectable()
export class PushNotificationService {
  private expo = new Expo();

  async sendPushNotification(token: string, title: string, body: string, data: string): Promise<void> {
    const message = {
      to: token,
      title,
      body,
      data: { data }, 
    };

    try {
      await this.expo.sendPushNotificationsAsync([message]);
    } catch (error) {
      console.error('Ошибка отправки уведомления:', error);
    }
  }
}