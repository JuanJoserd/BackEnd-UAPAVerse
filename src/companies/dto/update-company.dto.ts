import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCompanyDto {
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
  @IsInt()
  businessSectorId?: number;

  @IsOptional()
  @IsInt()
  sector_id?: number;

  @IsOptional()
  @IsInt()
  businessSizeId?: number;

  @IsOptional()
  @IsInt()
  company_size_id?: number;

  @IsOptional()
  @IsInt()
  subSectorId?: number;

  @IsOptional()
  @IsInt()
  subsector_id?: number;
}