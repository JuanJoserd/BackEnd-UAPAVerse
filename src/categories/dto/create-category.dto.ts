import { IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    name_categoria: string;

    @IsString()
    description_categoria: string;
}