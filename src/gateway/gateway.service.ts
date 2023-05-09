import {
  MessageHandlerErrorBehavior,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Gateway } from './gateway';
import { RoutingKeys } from './enums/routing-keys.enum';
import { Queues } from './enums/queues.enum';

@Injectable()
export class GatewayService {
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
}
