export class CreateLessonDto {
  title: string;
  content?: string;
  order?: number;
  categoryId: string;
  phaseId: string;
}
