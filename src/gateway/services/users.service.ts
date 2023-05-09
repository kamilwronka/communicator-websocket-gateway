import {
  MessageHandlerErrorBehavior,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Queues } from '../enums/queues.enum';
import { RoutingKeys } from '../enums/routing-keys.enum';
import { Gateway } from '../gateway';

@Injectable()
export class UsersService {
  constructor(private readonly gateway: Gateway) {}

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
    routingKey: RoutingKeys.USERS_RELATIONSHIPS_CREATE,
    queue: Queues.USERS_RELATIONSHIPS_CREATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleUserRelationshipCreate(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.USERS_RELATIONSHIPS_UPDATE,
    queue: Queues.USERS_RELATIONSHIPS_UPDATE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleUserRelationshipUpdate(data: any) {
    console.log('hehe create');
  }

  @RabbitSubscribe({
    exchange: 'default',
    routingKey: RoutingKeys.USERS_RELATIONSHIPS_DELETE,
    queue: Queues.USERS_RELATIONSHIPS_DELETE,
    errorBehavior: MessageHandlerErrorBehavior.NACK,
  })
  async handleUserRelationshipDelete(data: any) {
    console.log('hehe create');
  }

  //   @RabbitSubscribe({
  //     exchange: 'default',
  //     routingKey: RoutingKeys.MESSAGE_SEND,
  //     queue: Queues.USER_DELETE,
  //     errorBehavior: MessageHandlerErrorBehavior.NACK,
  //   })
  //   async handleMessageSend(data: any) {
  //     console.log('hehe create');
  //   }

  //   @RabbitSubscribe({
  //     exchange: 'default',
  //     routingKey: RoutingKeys.MESSAGE_UPDATE,
  //     queue: Queues.USER_DELETE,
  //     errorBehavior: MessageHandlerErrorBehavior.NACK,
  //   })
  //   async handleMessageUpdate(data: any) {
  //     console.log('hehe create');
  //   }

  //   @RabbitSubscribe({
  //     exchange: 'default',
  //     routingKey: RoutingKeys.MESSAGE_DELETE,
  //     queue: Queues.USER_DELETE,
  //     errorBehavior: MessageHandlerErrorBehavior.NACK,
  //   })
  //   async handleMessageDelete(data: any) {
  //     console.log('hehe create');
  //   }
}
