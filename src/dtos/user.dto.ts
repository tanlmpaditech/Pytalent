import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @Expose()
  @IsString()
  @IsOptional()
  name: string;

  @Expose()
  @IsEmail()
  @IsOptional()
  email: string;

  @Expose()
  @IsEmail()
  @IsOptional()
  password: string;

}
