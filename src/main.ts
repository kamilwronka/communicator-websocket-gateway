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
  const pubSubConfig = configService.getPubSubConfig();

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new GCPubSubServer(pubSubConfig),
  });

  Logger.log(`Starting application on port ${port}...`);

  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));
  await app.startAllMicroservices();
  await app.listen(healtCheckPort);
}
bootstrap();
