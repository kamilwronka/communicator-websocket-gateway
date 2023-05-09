import { IsArray } from 'class-validator';

export class JoinServerDto {
  @IsArray()
  serverIds: string[];

  @IsArray()
  channelIds: string[];
}
