import { Type } from 'class-transformer'
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsUUID, Min } from 'class-validator'

export class CreateQuestionDto {
  @IsUUID()
  @IsNotEmpty()
  alunoId!: string

  @IsInt()
  @Min(0)
  acertos!: number

  @IsInt()
  @Min(1)
  totalQuestoes!: number

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  data?: Date
}
