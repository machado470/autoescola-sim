import React from "react";
import LevelBadge from "../ui/LevelBadge";
import { useLocalProgress } from "../hooks/useLocalProgress";
import HistoryList from "../ui/HistoryList";
import ProgressChart from "../ui/ProgressChart";

export default function Progresso() {
  const { read } = useLocalProgress();
  const items = read();
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Seu Progresso</h1>
        <LevelBadge />
      </div>
      <ProgressChart items={items} />
      <HistoryList items={items} />
    </div>
  );
}
