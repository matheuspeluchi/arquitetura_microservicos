import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificatins-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface IUnReadNotificaionRequest {
  notificationId: string;
}

type IUnReadNotificationResponse = void;

@Injectable()
export class UnReadNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: IUnReadNotificaionRequest,
  ): Promise<IUnReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unRead();

    await this.notificationRepository.save(notification);
  }
}
