import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notificatins-repository';

export class InMemoryNotificationRepository implements NotificationsRepository {
  public notifications: Notification[] = [];

  async save(notification: Notification): Promise<void> {
    const notificationIdx = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );
    if (notificationIdx >= 0) {
      this.notifications[notificationIdx] = notification;
    }
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );
    if (!notification) {
      return null;
    }
    return notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async countManyByRecipientId(recipientId: string) {
    return this.notifications.filter((item) => item.recipientId === recipientId)
      .length;
  }
}
