import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '../../../test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipients notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientsNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientsNotifications.execute({
      recipientId: 'any_id',
    });

    expect(notifications).toHaveLength(2);
    // expect(notifications).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({ recipentId: 'any_id' }),
    //     expect.objectContaining({ recipentId: 'any_id' }),
    //   ]),
    // );
  });
});
