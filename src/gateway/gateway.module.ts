import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { Gateway } from './gateway';
import { ConfigService } from '@nestjs/config';
import { RabbitMQConfig, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfig } from 'src/config/types';
import { JwksClient } from 'jwks-rsa';
import { ChannelsService } from './services/channels.service';
import { ServersService } from './services/servers.service';
import { UsersService } from './services/users.service';
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
        const { issuer, cache, rateLimit, jwksRequestsPerMinute, jwksUri } =
          configService.get<AuthConfig>('auth');

        const client = new JwksClient({
          cache,
          rateLimit,
          jwksRequestsPerMinute,
          jwksUri,
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
  providers: [
    GatewayService,
    Gateway,
    ChannelsService,
    ServersService,
    UsersService,
  ],
  controllers: [],
})
export class GatewayModule {}
