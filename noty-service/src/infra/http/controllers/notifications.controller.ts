import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationDTO } from '../dtos/create-notification.dto';
import { SendNotification } from '@application/useCases/send-noitification';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

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
