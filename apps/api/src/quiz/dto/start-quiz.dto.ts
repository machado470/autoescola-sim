import { IsUUID } from 'class-validator';

export class StartQuizDto {
  @IsUUID()
  categoryId: string;
}
