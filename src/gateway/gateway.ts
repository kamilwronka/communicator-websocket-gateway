import { Controller, Inject, OnApplicationShutdown } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqRecordBuilder,
} from '@nestjs/microservices';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { GCPubSubContext } from 'nestjs-google-pubsub-microservice';
import { Server } from 'socket.io';
import { CustomSocket } from 'src/adapters/socketio.adapter';
import { configService } from 'src/config/config.service';
import { GatewayService } from './gateway.service';

const port = configService.getPort();

@WebSocketGateway(port, {
  transports: ['websocket'],
  cors: true,
})
export class Gateway implements OnGatewayConnection {
  constructor(private gatewayService: GatewayService) {}

  @WebSocketServer()
  public server: Server;

  handleConnection(client: CustomSocket) {
    // connecting to users private room which is his ID
    client.join(client.userId);

    client.on('join', ({ channels, server_id }) => {
      const isValidPayload =
        Array.isArray(channels) && channels.length > 0 && server_id;

      if (isValidPayload) {
        channels.forEach((channel) => {
          client.join(channel);
        });
      }

      client.emit('join', { message: 'connected to channels' });
    });
  }
}
