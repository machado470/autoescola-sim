import { execSync } from "child_process";

console.log("🌱 Rodando seeds...");

function run(file: string) {
  console.log(`➡️ Executando ${file}`);
  execSync(`npx ts-node --transpile-only prisma/seeds/${file}`, {
    stdio: "inherit",
  });
}

async function main() {
  run("categories.ts");
  run("phases.ts");
  run("lessons.ts");
  run("questions.ts");
  run("users.ts");

  console.log("✅ Todos os seeds foram executados com sucesso!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
