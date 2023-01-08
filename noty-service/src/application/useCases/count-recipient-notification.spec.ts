import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '../../../test/factories/notification-factory';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientsNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'any_id' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'any_id' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'other_id' }),
    );

    const { count } = await countRecipientsNotifications.execute({
      recipientId: 'any_id',
    });

    expect(count).toEqual(2);
  });
});
