import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  signature: string;
}

export class RefreshDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
