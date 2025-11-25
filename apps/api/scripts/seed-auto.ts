import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function run() {
  const email = "admin@local";
  const pwd = await bcrypt.hash("admin", 10);

  // 1) se existir delegate "user", tenta por aí (nome de modelo User)
  const delegates = Object.keys(prisma).filter(k => !k.startsWith("$"));
  if (delegates.includes("user")) {
    const anyp: any = prisma as any;
    try {
      await anyp.user.upsert({
        where: { email },
        update: {},
        create: { name: "Administrador", email, password: pwd, role: "ADMIN" },
      });
    } catch {
      await anyp.user.upsert({
        where: { email },
        update: {},
        create: { email, password: pwd },
      });
    }
    console.log("✅ seed: via delegate user");
    return;
  }

  // 2) descobrir schema não-sistêmico com tabelas
  const schemas: any[] = await prisma.$queryRawUnsafe(`
    SELECT nspname AS schema
    FROM pg_namespace
    WHERE nspname NOT IN ('pg_catalog','information_schema')
    ORDER BY (SELECT COUNT(*) FROM pg_class c WHERE c.relnamespace = pg_namespace.oid) DESC, nspname ASC
  `);
  if (!schemas.length) throw new Error("nenhum schema de usuário encontrado");

  // 3) procurar tabela com email + (password|hash)
  let found: { schema: string; table: string } | null = null;
  for (const s of schemas.map(x => x.schema)) {
    const cand: any[] = await prisma.$queryRawUnsafe(`
      SELECT table_name
      FROM information_schema.columns
      WHERE table_schema='${s}'
      GROUP BY table_name
      HAVING bool_or(column_name='email')
         AND (bool_or(column_name='password') OR bool_or(column_name='hash'))
      ORDER BY table_name LIMIT 1
    `);
    if (cand?.[0]?.table_name) { found = { schema: s, table: cand[0].table_name }; break; }
  }
  if (!found) throw new Error("nenhuma tabela com email+password/hash em schemas de usuário");

  const cols: any[] = await prisma.$queryRawUnsafe(`
    SELECT column_name FROM information_schema.columns
    WHERE table_schema='${found.schema}' AND table_name='${found.table}'
  `);
  const hasName = cols.some(c => c.column_name === "name");
  const passCol = cols.some(c => c.column_name === "password") ? "password"
               : cols.some(c => c.column_name === "hash") ? "hash" : null;
  const hasRole = cols.some(c => c.column_name === "role");
  if (!passCol) throw new Error("tabela sem coluna de senha");

  const fields = [hasName && "name", "email", passCol, hasRole && "role"]
    .filter(Boolean).join(",");
  const values = [
    hasName && "'Administrador'",
    `'${email}'`,
    `'${pwd}'`,
    hasRole && "'ADMIN'",
  ].filter(Boolean).join(",");

  await prisma.$executeRawUnsafe(
    `INSERT INTO "${found!.schema}"."${found!.table}" (${fields}) VALUES (${values}) ON CONFLICT (email) DO NOTHING;`
  );
  console.log(`✅ seed: SQL em "${found!.schema}"."${found!.table}"`);
}

run().catch(e => { console.error("❌ seed:", e?.message || e); process.exit(1); })
     .finally(() => prisma.$disconnect());
