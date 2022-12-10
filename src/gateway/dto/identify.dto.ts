import { IsNotEmpty, IsString } from 'class-validator';

export class IdentifyDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
