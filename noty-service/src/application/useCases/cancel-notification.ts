import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notificatins-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ICancelNotificaionRequest {
  notificationId: string;
}

type ICancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: ICancelNotificaionRequest,
  ): Promise<ICancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
