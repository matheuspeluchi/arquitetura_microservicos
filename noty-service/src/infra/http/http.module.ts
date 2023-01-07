import { Module } from '@nestjs/common';
import { SendNotification } from '../../application/useCases/send-noitification';
import { DatabaeModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaeModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
