-- CreateEnum
CREATE TYPE "AulaStatus" AS ENUM ('AGENDADA', 'CONCLUIDA', 'CANCELADA');

-- CreateTable
CREATE TABLE "Aula" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "instrutorId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "status" "AulaStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressoTeorico" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "doneAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgressoTeorico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgressoTeorico_alunoId_itemId_key" ON "ProgressoTeorico"("alunoId", "itemId");

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_instrutorId_fkey" FOREIGN KEY ("instrutorId") REFERENCES "Instrutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ProgressoTeorico" ADD CONSTRAINT "ProgressoTeorico_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;
