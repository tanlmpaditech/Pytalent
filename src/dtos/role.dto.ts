import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class RoleDto {
  @Expose()
  @IsOptional()
  id: number;

  @Expose()
  @IsString()
  @IsOptional()
  url: string;

}
