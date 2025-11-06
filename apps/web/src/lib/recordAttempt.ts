import { useLocalProgress, Attempt } from "../hooks/useLocalProgress";
import { useLevel } from "../store/level";

// OBS: isto é um helper "imperativo" p/ ser chamado dentro de componentes.
export function recordAttempt(category: string, correct: number, total: number, gainedXp: number) {
  // salva no localStorage
  try {
    const raw = localStorage.getItem("aesim_history_v1");
    const arr: Attempt[] = raw ? JSON.parse(raw) : [];
    arr.unshift({ when: new Date().toISOString(), category, correct, total, gainedXp });
    localStorage.setItem("aesim_history_v1", JSON.stringify(arr.slice(0, 50)));
  } catch { /* ignore */ }

  // soma XP global
  try {
    // acesso direto à store sem hook React:
    const { addXp } = useLevel.getState();
    addXp(gainedXp);
  } catch { /* ignore */ }
}
