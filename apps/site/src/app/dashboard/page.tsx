"use client";

import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  useAuth();

  return <h1>Área logada</h1>;
}

