import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class AssessmentDto {
  @Expose()
  @IsString()
  @IsOptional()
  start: Date;

  @Expose()
  @IsOptional()
  end: Date;

  @Expose()
  @IsOptional()
  type: String;
}
