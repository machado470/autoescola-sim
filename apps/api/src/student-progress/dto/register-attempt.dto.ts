import { IsUUID, IsInt, IsNumber } from 'class-validator';

export class RegisterAttemptDto {
  @IsUUID()
  userId: string;

  @IsInt()
  totalQuestions: number;

  @IsInt()
  correct: number;

  @IsNumber()
  score: number;
}
