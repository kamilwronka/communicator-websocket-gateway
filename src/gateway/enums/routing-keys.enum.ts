export enum RoutingKeys {
  // servers
  SERVER_CREATE = 'server.create',
  SERVER_UPDATE = 'server.update',
  SERVER_DELETE = 'server.delete',
  SERVER_ROLE_CREATE = 'server.role.create',
  SERVER_ROLE_UPDATE = 'server.role.update',
  SERVER_ROLE_DELETE = 'server.role.delete',
  SERVER_MEMBER_CREATE = 'server.member.create',
  SERVER_MEMBER_UPDATE = 'server.member.update',
  SERVER_MEMBER_DELETE = 'server.member.delete',

  // users
  USER_CREATE = 'user.create',
  USER_UPDATE = 'user.update',
  USER_DELETE = 'user.delete',

  // channels
  CHANNEL_CREATE = 'channel.create',
  CHANNEL_UPDATE = 'channel.update',
  CHANNEL_DELETE = 'channel.delete',

  // messaging
  MESSAGE_SEND = 'message.send',
  MESSAGE_UPDATE = 'message.update',
  MESSAGE_DELETE = 'message.delete',
  MESSAGE_REACTION_ADD = 'message.reaction.add',
  MESSAGE_REACTION_DELETE = 'message.reaction.delete',
}
