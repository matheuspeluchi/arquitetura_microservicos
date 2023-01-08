import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { SendNotification } from '@application/useCases/send-noitification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/useCases/cancel-notification';
import { ReadNotification } from '@application/useCases/read-notification';
import { UnReadNotification } from '@application/useCases/unRead-notification';
import { CountRecipientNotifications } from '@application/useCases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/useCases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unReadNotification: UnReadNotification,
    private countRecipientNotification: CountRecipientNotifications,
    private getFromRecipientNotification: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });
    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getFromRecipientNotification.execute({
      recipientId,
    });
    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unReadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() noty: CreateNotificationDTO) {
    const { recipientId, category, content } = noty;
    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });
    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
