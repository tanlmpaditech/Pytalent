import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class GameDto {
  @Expose()
  @IsString()
  @IsOptional()
  type: String;

  @Expose()
  @IsOptional()
  time: Number;

  @Expose()
  @IsString()
  @IsOptional()
  assessment_game_id: String;

}
