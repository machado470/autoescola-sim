import { IsString, IsUUID, IsOptional, IsInt } from 'class-validator';

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

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsUUID()
  phaseId?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
