import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class GameDto {
  @Expose()
  @IsOptional()
  game_id: Number;

  @Expose()
  @IsString()
  @IsOptional()
  type: String;

}
