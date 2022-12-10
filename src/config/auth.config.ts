import { registerAs } from '@nestjs/config';
import { AuthConfig } from './types';

export default registerAs('auth', (): AuthConfig => {
  const { JWT_ISSUER } = process.env;

  return {
    issuer: JWT_ISSUER,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
  };
});
