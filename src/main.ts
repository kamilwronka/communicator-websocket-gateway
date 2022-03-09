import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthenticatedSocketIoAdapter } from './adapters/socketio.adapter';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const { rmqHost, rmqPassword, rmqPort, rmqQueue, rmqUser } =
    configService.getRMQConfig();
  const port = configService.getPort();
  const isProduction = configService.isProduction();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${rmqUser}:${rmqPassword}@${rmqHost}:${rmqPort}/`],
        queue: rmqQueue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  Logger.log('Starting application using following config:');
  Logger.log(`Port: ${port}`);
  Logger.log(`Is production: ${isProduction}`);

  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));
  await app.listen();
}
bootstrap();
