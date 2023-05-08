import {
  MessageHandlerErrorBehavior,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Queues } from '../enums/queues.enum';
import { RoutingKeys } from '../enums/routing-keys.enum';
import { Gateway } from '../gateway';
import { Message } from './types/message.type';
import { GatewayEvents } from '../enums/gateway-event.enum';

@Injectable()
export class ChannelsService {
  constructor(private readonly gateway: Gateway) {}

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.CHANNEL_CREATE,
    queue: Queues.CHANNEL_CREATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleChannelCreate(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.CHANNEL_UPDATE,
    queue: Queues.CHANNEL_UPDATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleChannelUpdate(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.CHANNEL_DELETE,
    queue: Queues.CHANNEL_DELETE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleChannelDelete(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.MESSAGE_SEND,
    queue: Queues.MESSAGE_SEND,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleMessageSend(data: Message) {
    console.log(data);
    console.log('hehe create');
    this.gateway.server
      .to(data.serverId)
      .emit(GatewayEvents.SERVER_MESSAGE_SEND, data);
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.MESSAGE_UPDATE,
    queue: Queues.MESSAGE_UPDATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleMessageUpdate(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.MESSAGE_DELETE,
    queue: Queues.MESSAGE_DELETE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleMessageDelete(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.MESSAGE_REACTION_ADD,
    queue: Queues.MESSAGE_REACTION_ADD,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleMessageReactionAdd(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.MESSAGE_REACTION_DELETE,
    queue: Queues.MESSAGE_REACTION_DELETE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleMessageReactionDelete(data: any) {
    console.log('hehe create');
  }
}
