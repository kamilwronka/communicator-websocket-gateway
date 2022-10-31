import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AuthenticatedSocketIoAdapter } from './adapters/socketio.adapter';
import { AppModule } from './app.module';
import { IAppConfig, IRabbitMqConfig } from './config/types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const { port } = configService.get<IAppConfig>('app');
  const {
    host,
    port: rabbitMqPort,
    user,
    password,
    queue,
  } = configService.get<IRabbitMqConfig>('rabbitmq');

  console.log(configService.get<IRabbitMqConfig>('rabbitmq'));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}:${rabbitMqPort}`],
      queue,
      queueOptions: {
        durable: false,
      },
    },
  });

  Logger.log(`Starting application on port ${port}...`);

  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));
  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
