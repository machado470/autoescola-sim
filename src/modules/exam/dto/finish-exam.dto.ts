import { IsString } from 'class-validator'

export class FinishExamDto {
  @IsString()
  examSessionId!: string
}
