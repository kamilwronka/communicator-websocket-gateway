import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Gateway } from './gateway';
import { ConfigService } from '@nestjs/config';
import { RabbitMQConfig, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig } from 'src/config/types';
import { JwksClient } from 'jwks-rsa';
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<RabbitMQConfig>('rabbitmq');

        return config;
      },
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { issuer, cache, rateLimit, jwksRequestsPerMinute } =
          configService.get<AuthConfig>('auth');

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
  ],
  providers: [GatewayService, Gateway],
  controllers: [],
})
export class GatewayModule {}
