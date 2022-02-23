import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  ensureUserCanJoin(room, userId: string): boolean {
    if (room === userId) {
      return true;
    }

    return true;
  }
}
