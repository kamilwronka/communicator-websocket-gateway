import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwksClient } from 'jwks-rsa';
import { ChatModule } from './chat/chat.module';
import { ServerModule } from './server/server.module';

@Module({
  imports: [
    ChatModule,
    ServerModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        const client = new JwksClient({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-09qylxq6.eu.auth0.com/.well-known/jwks.json',
        });
        const keys = await client.getSigningKeys();
        const key = keys.find((key) => {
          return key.kid;
        });

        return {
          publicKey: key.getPublicKey(),
          verifyOptions: {
            algorithms: ['RS256'],
            issuer: 'https://dev-09qylxq6.eu.auth0.com/',
          },
        };
      },
    }),
  ],
})
export class AppModule {}
