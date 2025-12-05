import { IsString, IsOptional, IsInt, MinLength } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsString()
  categoryId: string;

  @IsString()
  phaseId: string;
}
