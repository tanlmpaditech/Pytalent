import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class ResultDto {
  @Expose()
  @IsString()
  @IsOptional()
  candidate_id: Number;

  @Expose()
  @IsString()
  @IsOptional()
  score: Number;

  @Expose()
  @IsString()
  @IsOptional()
  assessment_game_id: Number;

}
