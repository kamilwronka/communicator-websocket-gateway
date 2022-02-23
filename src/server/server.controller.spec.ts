import { Test, TestingModule } from '@nestjs/testing';
import { ServerGateway } from './server.gateway';

describe('ServerGateway', () => {
  let controller: ServerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerGateway],
    }).compile();

    // controller = module.get<ServerController>(ServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
