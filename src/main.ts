import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthenticatedSocketIoAdapter } from './adapters/socketio.adapter';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const rmqConfig = configService.getRMQConfig();

  console.log('listening on 8888');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${rmqConfig.rmqHost}:${rmqConfig.rmqPort}`],
        queue: rmqConfig.rmqQueue,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));

  await app.listen();
}
bootstrap();
