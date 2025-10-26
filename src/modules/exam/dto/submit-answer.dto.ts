import { IsString } from 'class-validator'

export class SubmitAnswerDto {
  @IsString()
  examSessionId!: string

  @IsString()
  questionId!: string

  @IsString()
  choiceId!: string
}
