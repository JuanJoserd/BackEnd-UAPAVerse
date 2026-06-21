import {
  IsString,
  IsOptional,
  IsEmail,
  IsInt,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  nombre_comercial?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email_contacto?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  sector_id?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  subsector_id?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  company_size_id?: number;
}
