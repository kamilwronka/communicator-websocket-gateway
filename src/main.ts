import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { GCPubSubServer } from 'nestjs-google-pubsub-microservice';

import { AuthenticatedSocketIoAdapter } from './adapters/socketio.adapter';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const port = configService.getPort();
  const healtCheckPort = configService.getHealthCheckPort();
  const isProduction = configService.isProduction();

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new GCPubSubServer({
      topic: 'message',
      subscription: 'message-sub',
      client: {
        projectId: 'communicator-dev-329611',
      },
    }),
  });

  Logger.log('Starting application using following config:');
  Logger.log(`Port: ${port}`);
  Logger.log(`Is production: ${isProduction}`);

  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));
  await app.startAllMicroservices();
  await app.listen(healtCheckPort);
}
bootstrap();
