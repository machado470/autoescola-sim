-- Add CPF column to Instrutor ensuring existing rows receive placeholder values
ALTER TABLE "Instrutor" ADD COLUMN "cpf" TEXT;

WITH numbered AS (
  SELECT id, row_number() OVER (ORDER BY id) AS rn
  FROM "Instrutor"
)
UPDATE "Instrutor" AS i
SET "cpf" = LPAD(numbered.rn::text, 11, '0')
FROM numbered
WHERE i.id = numbered.id AND i."cpf" IS NULL;

ALTER TABLE "Instrutor" ALTER COLUMN "cpf" SET NOT NULL;
CREATE UNIQUE INDEX "Instrutor_cpf_key" ON "Instrutor"("cpf");
