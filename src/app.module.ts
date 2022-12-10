import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwksClient } from 'jwks-rsa';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GatewayModule } from './gateway/gateway.module';
import { HealthController } from './health/health.controller';
import { AuthConfig } from './config/types';

import rabbitmqConfig from './config/rabbitmq.config';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import { RuntimeEnvironment } from './types/common';

@Module({
  imports: [
    GatewayModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, rabbitmqConfig, authConfig],
      cache: true,
      validationSchema: Joi.object({
        ENV: Joi.string()
          .valid(
            RuntimeEnvironment.LOCAL,
            RuntimeEnvironment.DEV,
            RuntimeEnvironment.PROD,
          )
          .default(RuntimeEnvironment.LOCAL),
        PORT: Joi.number(),
        JWT_ISSUER: Joi.string(),
        RABBITMQ_USER: Joi.string(),
        RABBITMQ_PASSWORD: Joi.string(),
        RABBITMQ_HOST: Joi.string(),
        RABBITMQ_ACCESS_PORT: Joi.string(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
