import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class ResultDto {
  @Expose()
  @IsString()
  @IsOptional()
  email: Date;

  @Expose()
  @IsOptional()
  score: Date;

}
