import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  statement: string;

  @IsString()
  optionA: string;

  @IsString()
  optionB: string;

  @IsString()
  optionC: string;

  @IsString()
  optionD: string;

  @IsString()
  correct: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsString()
  categoryId: string;

  @IsString()
  phaseId: string;
}
