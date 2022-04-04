import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Gateway } from './gateway';
@Controller('')
export class GatewayController {
  constructor(private readonly chatGateway: Gateway) {}

  @EventPattern('message')
  async broadcastMessage(@Payload() data: any) {
    this.chatGateway.server.to(data.channelId).emit('message', data.message);
  }
}
