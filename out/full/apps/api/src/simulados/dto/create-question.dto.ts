import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum QuestionLevel { FACIL='FACIL', MEDIO='MEDIO', DIFICIL='DIFICIL' }

export class CreateQuestionDto {
  @IsString()
  enunciado!: string;

  @IsArray()
  alternativas!: string[];

  @IsInt() @Min(0) @Type(() => Number)
  alternativaCorreta!: number;

  @IsEnum(QuestionLevel)
  nivel: QuestionLevel = QuestionLevel.FACIL;

  @IsOptional() @IsString()
  explicacao?: string;

  @IsOptional() @IsUrl()
  imagemUrl?: string;

  @IsOptional() @IsBoolean() @Type(() => Boolean)
  isActive?: boolean;

  @IsOptional() @IsInt() @Type(() => Number)
  categoriaId?: number;
}
