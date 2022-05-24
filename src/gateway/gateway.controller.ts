import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Gateway } from './gateway';
import { Events } from './types/events.types';
@Controller('')
export class GatewayController {
  constructor(private readonly chatGateway: Gateway) {}

  @EventPattern(Events.MESSAGE)
  async broadcastMessage(@Payload() data: any) {
    this.chatGateway.server.to(data.channel_id).emit(Events.MESSAGE, data);
  }

  @EventPattern(Events.RELATIONSHIP_REQUEST)
  async broadcastRelationshipRequest(@Payload() data: any) {
    this.chatGateway.server
      .to(data.channelId)
      .emit(Events.RELATIONSHIP_REQUEST, data.message);
  }
}
