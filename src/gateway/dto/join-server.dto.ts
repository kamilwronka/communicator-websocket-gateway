import { IsArray, IsNotEmpty } from 'class-validator';

export class JoinServerDto {
  @IsNotEmpty()
  @IsArray()
  serverIds: string[];
}
