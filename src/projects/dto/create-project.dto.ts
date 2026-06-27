import { IsInt, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name_proyecto: string;

  @IsString()
  descripcion_proyecto: string;

  @IsInt()
  categoryId: number;

  @IsInt()
  userId: number;
}