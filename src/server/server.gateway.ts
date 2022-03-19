import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(1337, { cors: true })
export class ServerGateway {
  @SubscribeMessage('test2')
  handleEvent(@MessageBody() data: string) {
    console.log('test');
    return data;
  }
}
