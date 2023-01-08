import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notificatins-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface IReadNotificaionRequest {
  notificationId: string;
}

type IReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: IReadNotificaionRequest,
  ): Promise<IReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
