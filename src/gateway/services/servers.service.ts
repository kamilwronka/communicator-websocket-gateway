import {
  MessageHandlerErrorBehavior,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Queues } from '../enums/queues.enum';
import { RoutingKeys } from '../enums/routing-keys.enum';
import { Gateway } from '../gateway';

@Injectable()
export class ServersService {
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
}
