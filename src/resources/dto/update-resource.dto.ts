import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  name_recurso?: string;

  @IsOptional()
  @IsString()
  nameRecurso?: string;

  @IsOptional()
  @IsString()
  type_recurso?: string;

  @IsOptional()
  @IsString()
  typeRecurso?: string;

  @IsOptional()
  @IsString()
  route_recurso?: string;

  @IsOptional()
  @IsString()
  routeRecurso?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_proyecto?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idProyecto?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  projectId?: number;
}