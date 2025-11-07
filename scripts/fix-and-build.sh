#!/usr/bin/env bash
set -euo pipefail
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

echo "🔒 Backup do schema atual..."
cp prisma/schema.prisma "prisma/schema.prisma.bak.$(date +%s)" 2>/dev/null || true

echo "📝 Reescrevendo prisma/schema.prisma..."
cat > prisma/schema.prisma <<'PRISMA'
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Category {
  id        Int        @id @default(autoincrement())
  name      String
  questions Question[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model Question {
  id         Int        @id @default(autoincrement())
  statement  String
  image      String?
  categoryId Int
  category   Category   @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  answers    Answer[]
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
}

model Answer {
  id         Int      @id @default(autoincrement())
  text       String
  isCorrect  Boolean  @default(false)
  questionId Int
  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model School {
  id          Int          @id @default(autoincrement())
  name        String
  cnpj        String?      @unique
  city        String?
  instructors Instructor[]
  students    Student[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model Instructor {
  id        Int      @id @default(autoincrement())
  name      String
  license   String?
  schoolId  Int
  school    School  @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Student {
  id        Int      @id @default(autoincrement())
  name      String
  email     String?  @unique
  schoolId  Int
  school    School   @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
PRISMA

echo "🧪 Garantindo DATABASE_URL no .env..."
if ! grep -q '^DATABASE_URL=' .env 2>/dev/null; then
  echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/autoescola_sim?schema=public"' >> .env
fi

echo "📦 Instalando dependências..."
pnpm install

echo "🗃️ Prisma migrate + generate..."
npx prisma migrate dev -n init_core_models
npx prisma generate --force

echo "🧹 Ajustes mínimos no código (QuestionsService + DTOs)..."
# choices -> answers
sed -i -E 's/include:\s*{\s*choices:\s*true\s*}/include: { answers: true }/g' apps/api/src/questions/questions.service.ts 2>/dev/null || true
sed -i -E 's/\bq\.choices\b/q.answers/g' apps/api/src/questions/questions.service.ts 2>/dev/null || true

# campos sem inicialização (TS2564)
sed -i 's/\bemail: string;/email!: string;/' apps/api/src/auth/auth.controller.ts 2>/dev/null || true
sed -i 's/\bpassword: string;/password!: string;/' apps/api/src/auth/auth.controller.ts 2>/dev/null || true
sed -i -E 's/\b(name|license|schoolId): string;/\1!: string;/' apps/api/src/instructor/dto/instructor.dto.ts 2>/dev/null || true
sed -i 's/\bnome: string\b/nome!: string/' apps/api/src/instrutores/dto/create-instrutor.dto.ts 2>/dev/null || true

echo "🧭 Verificando delegates no PrismaClient..."
grep -A2 "class PrismaClient" node_modules/.pnpm/@prisma+client*/node_modules/@prisma/client/index.d.ts | sed -n '1,80p' | cat

echo "🏁 Build do projeto..."
pnpm run build

echo "✅ Concluído. Para rodar a API: pnpm run start:dev"
