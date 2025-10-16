import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'

export class ToggleAccessDto {
  @ApiProperty({ description: 'Define se as rotas protegidas estão habilitadas', example: true })
  @IsBoolean()
  enabled!: boolean
}
