export enum EEnvironment {
  LOCAL = 'local',
  DEV = 'dev',
  PROD = 'prod',
}

export interface IRabbitMqConfig {
  host: string;
  port: string;
  password: string;
  user: string;
  queue: string;
}

export interface IAppConfig {
  env: string;
  port: number;
}

export interface IAuthConfig {
  issuer: string;
  cache: boolean;
  rateLimit: boolean;
  jwksRequestsPerMinute: 5;
}
