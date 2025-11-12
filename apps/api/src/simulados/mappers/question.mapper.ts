import { Prisma } from '@prisma/client';
import { CreateQuestionDto, UpdateQuestionDto } from '../dto';

export function mapCreateDtoToPrisma(data: CreateQuestionDto): any {
  const base: any = {
    enunciado: data.enunciado,
    alternativas: data.alternativas as any,
    alternativaCorreta: data.alternativaCorreta,
    nivel: data.nivel as any,
    explicacao: data.explicacao,
    imagemUrl: data.imagemUrl,
    // alguns schemas chamam o booleano de 'active' em vez de 'isActive'
  } as any;

  if (data.isActive !== undefined) {
    (base as any).isActive = data.isActive;  // se o campo for 'isActive'
    (base as any).active  = data.isActive;   // se for 'active'
  }

  if (data.categoriaId) {
    // nome da relação no Prisma é 'category'
    (base as any).category = { connect: { id: data.categoriaId } };
  }

  return base;
}

export function mapUpdateDtoToPrisma(data: UpdateQuestionDto): any {
  const upd: any = {} as any;

  if (data.enunciado !== undefined) (upd as any).enunciado = data.enunciado;
  if (data.alternativas !== undefined) (upd as any).alternativas = data.alternativas as any;
  if (data.alternativaCorreta !== undefined) (upd as any).alternativaCorreta = data.alternativaCorreta;
  if (data.nivel !== undefined) (upd as any).nivel = data.nivel as any;
  if (data.explicacao !== undefined) (upd as any).explicacao = data.explicacao;
  if (data.imagemUrl !== undefined) (upd as any).imagemUrl = data.imagemUrl;

  if (data.isActive !== undefined) {
    (upd as any).isActive = data.isActive; // caso o campo exista como isActive
    (upd as any).active  = data.isActive;  // fallback para 'active'
  }

  if (data.categoriaId !== undefined) {
    (upd as any).category = data.categoriaId === null
      ? { disconnect: true }
      : { connect: { id: data.categoriaId } };
  }

  return upd;
}
