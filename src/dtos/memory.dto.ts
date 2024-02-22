import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class MemoryDto {
  @Expose()
  @IsString()
  @IsOptional()
  question: String;

  @Expose()
  @IsOptional()
  level: Number;

  @Expose()
  @IsOptional()
  time: Number;

  @Expose()
  @IsOptional()
  score: Number;
}
