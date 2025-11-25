import { useEffect, useState } from "react";

export type ProgressData = {
  xp: number;
  level: number;
  nextLevelXp: number;
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>({
    xp: 120,
    level: 2,
    nextLevelXp: 300,
  });

  useEffect(() => {
    // Futuramente: buscar no backend
    // fetch("/api/progress").then(...)
  }, []);

  const percentage = Math.min(
    100,
    (progress.xp / progress.nextLevelXp) * 100
  );

  return { progress, percentage };
}
