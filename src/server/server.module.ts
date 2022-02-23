import { Module } from '@nestjs/common';
import { ServerGateway } from './server.gateway';
import { ServerService } from './server.service';

@Module({
  providers: [ServerService, ServerGateway],
})
export class ServerModule {}
