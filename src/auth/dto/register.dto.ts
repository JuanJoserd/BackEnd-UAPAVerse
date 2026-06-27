import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  fullName!: string;

  @IsInt()
  roleId!: number;

  @IsOptional()
  @IsString()
  entName?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  telephoneNumber?: string;

  @IsOptional()
  @IsEmail()
  companyEmail?: string;

  @IsOptional()
  @IsInt()
  businessSectorId?: number;

  @IsOptional()
  @IsInt()
  businessSizeId?: number;

  @IsOptional()
  @IsInt()
  subSectorId?: number;
}