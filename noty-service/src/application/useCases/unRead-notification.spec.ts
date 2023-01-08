import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '../../../test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnReadNotification } from './unRead-notification';

describe('Unread notification', () => {
  it('should be able to unread notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnReadNotification(notificationRepository);

    const notification = makeNotification({ readAt: new Date() });
    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readtAt).toBeNull();
  });

  it('should not be able to read a notification when it not exsits', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnReadNotification(notificationRepository);

    await expect(
      unreadNotification.execute({
        notificationId: 'fake_id ',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
