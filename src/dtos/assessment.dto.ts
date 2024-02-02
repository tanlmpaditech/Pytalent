import { Expose } from 'class-transformer';
import { IsDate, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class AssessmentDto {
  @Expose()
  @IsDate()
  @IsOptional()
  start: Date;

  @Expose()
  @IsString()
  @IsOptional()
  end: Date;

  @Expose()
  @IsString()
  @IsOptional()
  type: String;

}
