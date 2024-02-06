import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class Candidate_assessmentDto {
  @Expose()
  @IsOptional()
  candidate_id: Number;

  @Expose()
  @IsOptional()
  assessment_id: Number;

}
