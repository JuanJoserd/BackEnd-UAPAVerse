import { IsString, IsOptional } from 'class-validator';

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    name_proyecto?: string;

    @IsOptional()
    @IsString()
    descripcion_proyecto?: string;
}