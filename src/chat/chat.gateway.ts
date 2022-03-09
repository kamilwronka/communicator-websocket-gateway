import { Inject } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CustomSocket } from 'src/adapters/socketio.adapter';
import { configService } from 'src/config/config.service';
import { ChatService } from './chat.service';

const port = configService.getPort();
@WebSocketGateway(port, { transports: ['websocket'], cors: true })
export class ChatGateway implements OnGatewayConnection {
  constructor(
    @Inject('CHAT_SERVICE') private client: ClientProxy,
    private chatService: ChatService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: CustomSocket) {
    client.on('join', ({ rooms }) => {
      const allRooms = [...rooms, client.userId];

      allRooms.map((room) => {
        const canJoin = this.chatService.ensureUserCanJoin(room, client.userId);
        canJoin && client.join(room);
      });
    });
  }

  @SubscribeMessage('message')
  async handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() socket: CustomSocket,
  ) {
    //handle message sending using chat-service and rabbit mq
    this.server.to(socket.userId).emit('message', 'ok');

    console.log(data);

    const message = data;
    const record = new RmqRecordBuilder(message).build();

    // this.client.send('chat-message', record).subscribe();
  }
}
