import { Content } from './content';
import { Notification } from './notification';

describe('Notification1', () => {
  it('should be able to create a notification', () => {
    const noty = new Notification({
      content: new Content('Nova solicitação'),
      category: 'social',
      recipientId: 'any_id',
    });

    expect(noty).toBeTruthy();
  });
});
