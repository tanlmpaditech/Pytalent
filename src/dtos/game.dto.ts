import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class GameDto {
  @Expose()
  @IsString()
  @IsOptional()
  type: String;

}
