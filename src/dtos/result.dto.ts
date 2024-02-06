import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class ResultDto {
  @Expose()
  @IsString()
  @IsOptional()
  candidate_email: String;

  @Expose()
  @IsString()
  @IsOptional()
  score: String;

  @Expose()
  @IsString()
  @IsOptional()
  assessment_game_id: String;

}
