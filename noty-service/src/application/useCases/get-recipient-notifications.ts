import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notificatins-repository';

interface IGetRecipientNotificationRequest {
  recipientId: string;
}

interface IGetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: IGetRecipientNotificationRequest,
  ): Promise<IGetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
