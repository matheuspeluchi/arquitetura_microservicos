import { Module } from '@nestjs/common';
import { CancelNotification } from '../../application/useCases/cancel-notification';
import { CountRecipientNotifications } from '../../application/useCases/count-recipient-notifications';
import { GetRecipientNotifications } from '../../application/useCases/get-recipient-notifications';
import { ReadNotification } from '../../application/useCases/read-notification';
import { SendNotification } from '../../application/useCases/send-noitification';
import { UnReadNotification } from '../../application/useCases/unRead-notification';
import { DatabaeModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaeModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnReadNotification,
  ],
})
export class HttpModule {}
