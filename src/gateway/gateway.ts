import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CustomSocket } from 'src/adapters/socketio.adapter';
import { GatewayService } from './gateway.service';

@WebSocketGateway({
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

    client.on('join', (channels) => {
      client.join(channels);

      client.emit('join', {
        message: `connected to ${channels}`,
      });
    });

    client.on('leave', (channels) => {
      client.leave(channels);

      client.emit('leave', {
        message: `left ${channels}`,
      });
    });
  }
}
