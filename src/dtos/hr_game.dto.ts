import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class Hr_gameDto {
  @Expose()
  @IsString()
  @IsOptional()
  hr_id: String;

  @Expose()
  @IsString()
  @IsOptional()
  game_id: String;

}
