import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(4000, { cors: true })
export class ServerGateway {
  @SubscribeMessage('test2')
  handleEvent(@MessageBody() data: string) {
    console.log('test');
    return data;
  }
}
