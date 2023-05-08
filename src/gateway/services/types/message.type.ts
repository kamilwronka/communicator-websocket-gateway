export type Message = {
  _id: string;
  id: string;
  author: string;
  mentions: string[];
  nonce: string;
  mentionIds: string[];
  mentionRoles: string[];
  mentionEveryone: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
  channelId: string;
  serverId: string;
};
