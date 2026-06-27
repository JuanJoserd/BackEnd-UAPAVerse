import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCompanyDto {
  @IsOptional()
  @IsString()
  entName?: string;

  @IsOptional()
  @IsString()
  nombre_comercial?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  telephoneNumber?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  companyEmail?: string;

  @IsOptional()
  @IsEmail()
  email_contacto?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  businessSectorId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sector_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  businessSizeId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  company_size_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  subSectorId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  subsector_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  user_id?: number;
}