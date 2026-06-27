import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsOptional()
  @IsString()
  name_proyecto?: string;

  @IsOptional()
  @IsString()
  nameProyecto?: string;

  @IsOptional()
  @IsString()
  descripcion_proyecto?: string;

  @IsOptional()
  @IsString()
  descripcionProyecto?: string;

  @IsOptional()
  @IsString()
  estado_proyecto?: string;

  @IsOptional()
  @IsString()
  estadoProyecto?: string;

  @IsOptional()
  @IsString()
  carrera_asociada?: string;

  @IsOptional()
  @IsString()
  carreraAsociada?: string;

  @IsOptional()
  @IsString()
  tecnologias_utilizadas?: string;

  @IsOptional()
  @IsString()
  tecnologiasUtilizadas?: string;

  @IsOptional()
  @IsString()
  nivel_madurez_tecnologica?: string;

  @IsOptional()
  @IsString()
  nivelMadurezTecnologica?: string;

  @IsOptional()
  @IsString()
  estado_desarrollo?: string;

  @IsOptional()
  @IsString()
  estadoDesarrollo?: string;

  @IsOptional()
  @IsString()
  informacion_tecnica?: string;

  @IsOptional()
  @IsString()
  informacionTecnica?: string;

  @IsOptional()
  @IsString()
  informacion_comercial?: string;

  @IsOptional()
  @IsString()
  informacionComercial?: string;

  @IsOptional()
  @IsString()
  demo_url?: string;

  @IsOptional()
  @IsString()
  demoUrl?: string;

  @IsOptional()
  @IsString()
  contacto_nombre?: string;

  @IsOptional()
  @IsString()
  contactoNombre?: string;

  @IsOptional()
  @IsString()
  contacto_telefono?: string;

  @IsOptional()
  @IsString()
  contactoTelefono?: string;

  @IsOptional()
  @IsEmail()
  contacto_correo?: string;

  @IsOptional()
  @IsEmail()
  contactoCorreo?: string;

  @IsOptional()
  @IsString()
  nombre_grupo?: string;

  @IsOptional()
  @IsString()
  nombreGrupo?: string;

  @IsOptional()
  @IsString()
  contacto_rol?: string;

  @IsOptional()
  @IsString()
  contactoRol?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_categoria?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idCategoria?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id_usuario?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  idUsuario?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;
}