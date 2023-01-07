import { Module } from '@nestjs/common';
import { DatabaeModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [HttpModule, DatabaeModule],
})
export class AppModule {}
