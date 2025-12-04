export class CreateQuestionDto {
  statement: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correct: string;
  order?: number;
  categoryId: string;
  phaseId: string;
}
