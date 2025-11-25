import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ArrayMinSize } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  statement: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsArray()
  @ArrayMinSize(4)
  @IsString({ each: true })
  alternatives: string[];

  @IsString()
  @IsNotEmpty()
  correct: string;

  @IsInt()
  categoryId: number;
}
