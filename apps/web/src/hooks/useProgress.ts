import { useState } from "react";

export type ProgressData = {
  correct: number;
  wrong: number;
  total: number;
};

export default function useProgress() {
  const [progress] = useState<ProgressData>({
    correct: 0,
    wrong: 0,
    total: 0,
  });

  return { progress };
}
