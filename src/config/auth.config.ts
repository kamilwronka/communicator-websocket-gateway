import { registerAs } from '@nestjs/config';
import { IAuthConfig } from './types';

export default registerAs('auth', (): IAuthConfig => {
  const { JWT_ISSUER } = process.env;

  return {
    issuer: JWT_ISSUER,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
  };
});
