export interface AppConfig {
  env: string;
  port: number;
}

export interface AuthConfig {
  issuer: string;
  cache: boolean;
  rateLimit: boolean;
  jwksRequestsPerMinute: 5;
}
