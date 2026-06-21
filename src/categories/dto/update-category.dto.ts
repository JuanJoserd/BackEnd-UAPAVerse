import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    name_categoria: string;
}
