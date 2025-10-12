-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "senhaHash" TEXT NOT NULL DEFAULT '$2b$10$VH1pGlkuB4Q.ziYyMenh8.ZQy5n97iJ.sPxsaHViGSuEifZaOgy6q';

UPDATE "Aluno"
SET "email" = "id" || '@aluno.temp'
WHERE "email" IS NULL;

ALTER TABLE "Aluno" ALTER COLUMN "email" SET NOT NULL;
ALTER TABLE "Aluno" ALTER COLUMN "senhaHash" DROP DEFAULT;

CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- AlterTable
ALTER TABLE "Instrutor" ADD COLUMN     "email" TEXT;
ALTER TABLE "Instrutor" ADD COLUMN     "senhaHash" TEXT NOT NULL DEFAULT '$2b$10$VH1pGlkuB4Q.ziYyMenh8.ZQy5n97iJ.sPxsaHViGSuEifZaOgy6q';

UPDATE "Instrutor"
SET "email" = "id" || '@instrutor.temp'
WHERE "email" IS NULL;

ALTER TABLE "Instrutor" ALTER COLUMN "email" SET NOT NULL;
ALTER TABLE "Instrutor" ALTER COLUMN "senhaHash" DROP DEFAULT;

CREATE UNIQUE INDEX "Instrutor_email_key" ON "Instrutor"("email");
