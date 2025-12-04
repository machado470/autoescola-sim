export class SubmitQuizDto {
  quizId: string;
  answers: { questionId: string; selected: string }[];
}
