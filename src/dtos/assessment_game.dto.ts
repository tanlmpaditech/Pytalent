import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class Assessment_gameDto {
  @Expose()
  @IsOptional()
  assessment_id: Number;

  @Expose()
  @IsOptional()
  game_id: Number;
}
