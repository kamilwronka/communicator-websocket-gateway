import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthenticatedSocketIoAdapter } from './adapters/socketio.adapter';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const port = configService.getPort();
  const healtCheckPort = configService.getHealthCheckPort();
  const isProduction = configService.isProduction();

  const app = await NestFactory.create(AppModule);

  Logger.log('Starting application using following config:');
  Logger.log(`Port: ${port}`);
  Logger.log(`Is production: ${isProduction}`);

  app.useWebSocketAdapter(new AuthenticatedSocketIoAdapter(app));
  await app.listen(healtCheckPort);
}
bootstrap();
