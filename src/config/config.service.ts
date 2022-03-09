import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return parseInt(this.getValue('PORT', true), 10);
  }

  public isProduction() {
    const env = this.getValue('ENV', false);
    return env !== 'dev';
  }

  public getRMQConfig() {
    const rmqPort = this.getValue('RABBITMQ_PORT', false);
    const rmqHost = this.getValue('RABBITMQ_HOST', false);
    const rmqUser = this.getValue('RABBITMQ_USER', false);
    const rmqPassword = this.getValue('RABBITMQ_PASSWORD', false);

    const rmqQueue = 'websocket_gateway_queue';

    return { rmqHost, rmqPort, rmqQueue, rmqUser, rmqPassword };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'RABBITMQ_HOST',
  'RABBITMQ_PORT',
  'PORT',
  'RABBITMQ_USER',
  'RABBITMQ_PASSWORD',
]);

export { configService };
