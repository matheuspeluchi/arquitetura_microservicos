import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '../../../test/factories/notification-factory';
import { ReadNotification } from './read-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Read notification', () => {
  it('should be able to read notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);
    const notification = makeNotification();
    await notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readtAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification when it not exsits', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    await expect(
      readNotification.execute({
        notificationId: 'fake_id ',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
