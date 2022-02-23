import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

export interface CustomSocket extends Socket {
  userId: string;
}

export class AuthenticatedSocketIoAdapter extends IoAdapter {
  private readonly jwtService: JwtService;
  constructor(private app: INestApplicationContext) {
    super(app);
    this.jwtService = this.app.get(JwtService);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.use(async (socket: CustomSocket, next) => {
      const token = socket.handshake.query.token as string;

      try {
        const verified = token && (await this.jwtService.verify(token));
        socket.userId = verified.sub.replace('auth0|', '');

        next();
      } catch (error) {
        // verified = null;
        next(new Error('Authentication error'));
      }
    });

    return server;
  }
}
