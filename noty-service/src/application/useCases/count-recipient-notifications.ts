import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notificatins-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ICountRecipientNotificationRequest {
  recipientId: string;
}

interface ICountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: ICountRecipientNotificationRequest,
  ): Promise<ICountRecipientNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
