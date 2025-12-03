import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class SubmitQuizDto {
  @IsUUID()
  quizId: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  answers: {
    questionId: string;
    selected: string;
  }[];
}
