import { registerAs } from '@nestjs/config';
import { IAppConfig } from './types';

export default registerAs('app', (): IAppConfig => {
  const { ENV, PORT } = process.env;

  return {
    env: ENV,
    port: PORT || 4000,
  };
});
