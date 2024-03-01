import { Expose } from 'class-transformer';
import { IsDate, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class AssessmentDto {
  @Expose()
  @IsOptional()
  assessment_id: Number;

  @Expose()
  @IsDate()
  @IsOptional()
  start: Date;

  @Expose()
  @IsDate()
  @IsOptional()
  end: Date;

  @Expose()
  @IsString()
  @IsOptional()
  status: String;

  @Expose()
  @IsOptional()
  hr_id: number;

}
