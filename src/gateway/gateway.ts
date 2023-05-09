import {
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  BaseWsExceptionFilter,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { nanoid } from 'nanoid';
import { Server, Socket } from 'socket.io';
import { AUTH_NAMESPACE } from 'src/constants/auth-namespace.constant';
import { GatewayEventsGuard } from 'src/guards/gateway-events.guard';
import { IdentifyDto } from './dto/identify.dto';
import { JoinServerDto } from './dto/join-server.dto';
import { RequestServerPresenceDto } from './dto/request-server-presence.dto';
import { GatewayEvents } from './enums/gateway-event.enum';

interface User {
  user: UserData;
}

type UserData = {
  id: string;
  sessionId: string;
  status: 'offline' | 'online';
};

@WebSocketGateway({
  transports: ['websocket'],
  cors: true,
})
export class Gateway implements OnGatewayConnection {
  constructor(private jwtService: JwtService) {}

  @WebSocketServer()
  public server: Server;

  handleConnection(client: Socket & User) {
    client.on(GatewayEvents.DISCONNECTING, () => {
      if (client.user) {
        client
          .to([...client.rooms])
          .emit(GatewayEvents.SERVER_PRESENCE_UPDATE, {
            id: client.user.id,
            status: 'offline',
          });
      }
    });
  }

  @UseFilters(new BaseWsExceptionFilter())
  @UsePipes(new ValidationPipe())
  @SubscribeMessage(GatewayEvents.IDENTIFY)
  async identify(
    @MessageBody() data: IdentifyDto,
    @ConnectedSocket() client: User & Socket,
  ) {
    const verified = await this.jwtService.verifyAsync(
      data.token.replace('Bearer ', ''),
    );
    const userId = verified[AUTH_NAMESPACE];
    const user: UserData = {
      id: userId,
      sessionId: nanoid(),
      status: 'online',
      // save all the data, ex on what events user should listen
    };

    console.log('identified');

    client.user = user;

    client.emit(GatewayEvents.IDENTIFY, { sessionId: user.sessionId });
  }

  @UseGuards(GatewayEventsGuard)
  @UseFilters(new BaseWsExceptionFilter())
  @UsePipes(new ValidationPipe())
  @SubscribeMessage(GatewayEvents.SERVER_JOIN)
  async join(
    @MessageBody() { serverIds, channelIds }: JoinServerDto,
    @ConnectedSocket() client: User & Socket,
  ) {
    if (!serverIds && serverIds.length > 0) {
      return;
    }

    const filteredServerIds = serverIds.filter((id) => !client.rooms.has(id));
    const filteredChannelIds = channelIds.filter((id) => !client.rooms.has(id));

    if (filteredServerIds.length <= 0 && filteredChannelIds.length <= 0) {
      return;
    }

    client.join(filteredServerIds);
    client.join(filteredChannelIds);

    client.to(filteredServerIds).emit(GatewayEvents.SERVER_PRESENCE_UPDATE, {
      id: client.user.id,
      status: client.user.status,
    });

    client.emit(GatewayEvents.SERVER_JOIN, { status: 'ok' });
  }

  @UseGuards(GatewayEventsGuard)
  @UseFilters(new BaseWsExceptionFilter())
  @UsePipes(new ValidationPipe())
  @SubscribeMessage(GatewayEvents.SERVER_PRESENCE_REQUEST)
  async requestServerPresence(
    @MessageBody() { serverId }: RequestServerPresenceDto,
    @ConnectedSocket() client: User & Socket,
  ) {
    if (!client.rooms.has(serverId)) {
      return;
    }

    const clients = this.server.sockets.adapter.rooms.get(serverId);
    const users = [];

    if (clients) {
      clients.forEach((id) => {
        const user = this.server.sockets.sockets.get(id)['user'] as UserData;
        users.push({ id: user.id, status: user.status });
      });
    }

    client.emit(GatewayEvents.SERVER_PRESENCE_REQUEST, users);
  }
}
