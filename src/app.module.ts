import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwksClient } from 'jwks-rsa';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GatewayModule } from './gateway/gateway.module';
import { ServerModule } from './server/server.module';
import { HealthController } from './health/health.controller';
import { EEnvironment, IAuthConfig } from './config/types';

import rabbitmqConfig from './config/rabbitmq.config';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';

@Module({
  imports: [
    GatewayModule,
    ServerModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { issuer, cache, rateLimit, jwksRequestsPerMinute } =
          configService.get<IAuthConfig>('auth');

        const client = new JwksClient({
          cache,
          rateLimit,
          jwksRequestsPerMinute,
          jwksUri: `${issuer}.well-known/jwks.json`,
        });
        const keys = await client.getSigningKeys();
        const key = keys.find((key) => {
          return key.kid;
        });

        return {
          publicKey: key.getPublicKey(),
          verifyOptions: {
            algorithms: ['RS256'],
            issuer,
          },
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, rabbitmqConfig, authConfig],
      cache: true,
      validationSchema: Joi.object({
        ENV: Joi.string()
          .valid(EEnvironment.LOCAL, EEnvironment.DEV, EEnvironment.PROD)
          .default(EEnvironment.LOCAL),
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
