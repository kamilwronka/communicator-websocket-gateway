import {
  MessageHandlerErrorBehavior,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Queues } from './dto/queues.enum';
import { RoutingKeys } from './dto/routing-keys.enum';
import { Gateway } from './gateway';

@Injectable()
export class GatewayService {
  constructor(private readonly gateway: Gateway) {}

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.SERVER_CREATE,
    queue: Queues.SERVER_CREATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleServerCreate(data: any) {
    // this.gateway.server.to
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.SERVER_UPDATE,
    queue: Queues.SERVER_UPDATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleServerUpdate(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.SERVER_DELETE,
    queue: Queues.SERVER_DELETE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleServerDelete(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.SERVER_ROLE_CREATE,
    queue: Queues.SERVER_ROLE_CREATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleServerRoleCreate(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.SERVER_ROLE_UPDATE,
    queue: Queues.SERVER_ROLE_UPDATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleServerRoleUpdate(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.SERVER_ROLE_DELETE,
    queue: Queues.SERVER_ROLE_DELETE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleServerRoleDelete(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.SERVER_MEMBER_CREATE,
    queue: Queues.SERVER_MEMBER_CREATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleServerMemberCreate(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.SERVER_MEMBER_UPDATE,
    queue: Queues.SERVER_MEMBER_UPDATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleServerMemberUpdate(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.SERVER_MEMBER_DELETE,
    queue: Queues.SERVER_MEMBER_DELETE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleServerMemberDelete(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.USER_CREATE,
    queue: Queues.USER_CREATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleUserCreate(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.USER_UPDATE,
    queue: Queues.USER_UPDATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleUserUpdate(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.USER_DELETE,
    queue: Queues.USER_DELETE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleUserDelete(data: any) {
    console.log('hehe create');
  }

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
  async handleMessageSend(data: any) {
    console.log('hehe create');
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
