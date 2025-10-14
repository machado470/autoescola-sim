import { Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { AulasService } from './aulas.service'

@ApiTags('Aulas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}

  @Get()
  list(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('instrutorId') instrutorId?: string,
    @Query('alunoId') alunoId?: string,
  ) {
    return this.aulasService.list({ from, to, instrutorId, alunoId })
  }

  @Patch(':id/concluir')
  concluir(@Param('id') id: string) {
    return this.aulasService.concluir(id)
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id') id: string) {
    return this.aulasService.cancelar(id)
  }
}
