import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class TestDto {
  @Expose()
  @IsString()
  @IsOptional()
  question: String;

  @Expose()
  @IsString()
  @IsOptional()
  answer: String;

}
