import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwksClient } from 'jwks-rsa';
import { GatewayModule } from './gateway/gateway.module';
import { ServerModule } from './server/server.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    GatewayModule,
    ServerModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        const client = new JwksClient({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri:
            'https://communicator-dev.eu.auth0.com/.well-known/jwks.json',
        });
        const keys = await client.getSigningKeys();
        const key = keys.find((key) => {
          return key.kid;
        });

        return {
          publicKey: key.getPublicKey(),
          verifyOptions: {
            algorithms: ['RS256'],
            issuer: 'https://communicator-dev.eu.auth0.com/',
          },
        };
      },
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
