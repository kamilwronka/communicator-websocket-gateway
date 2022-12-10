export enum Queues {
  // servers
  SERVER_CREATE = 'gateway-server-create',
  SERVER_UPDATE = 'gateway-server-update',
  SERVER_DELETE = 'gateway-server-delete',
  SERVER_ROLE_CREATE = 'gateway-server-role-create',
  SERVER_ROLE_UPDATE = 'gateway-server-role-update',
  SERVER_ROLE_DELETE = 'gateway-server-role-delete',
  SERVER_MEMBER_CREATE = 'gateway-server-member-create',
  SERVER_MEMBER_UPDATE = 'gateway-server-member-update',
  SERVER_MEMBER_DELETE = 'gateway-server-member-delete',

  // users
  USER_CREATE = 'gateway-user-create',
  USER_UPDATE = 'gateway-user-update',
  USER_DELETE = 'gateway-user-delete',

  // channels
  CHANNEL_CREATE = 'gateway-channel-create',
  CHANNEL_UPDATE = 'gateway-channel-update',
  CHANNEL_DELETE = 'gateway-channel-delete',

  // messaging
  MESSAGE_SEND = 'gateway-message-send',
  MESSAGE_UPDATE = 'gateway-message-update',
  MESSAGE_DELETE = 'gateway-message-delete',
  MESSAGE_REACTION_ADD = 'gateway-message-reaction-add',
  MESSAGE_REACTION_DELETE = 'gateway-message-reaction-delete',
}
