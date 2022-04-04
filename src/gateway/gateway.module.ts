import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Gateway } from './gateway';
import { GatewayController } from './gateway.controller';
@Module({
  imports: [],
  providers: [GatewayService, Gateway],
  controllers: [GatewayController],
})
export class GatewayModule {}
