import { IsNotEmpty, IsString } from 'class-validator';

export class RequestServerPresenceDto {
  @IsNotEmpty()
  @IsString()
  serverId: string;
}
