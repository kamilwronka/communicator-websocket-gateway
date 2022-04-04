import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  ensureUserCanJoin(room, userId: string): boolean {
    if (room === userId) {
      return true;
    }

    return true;
  }
}
