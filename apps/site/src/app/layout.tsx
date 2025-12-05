import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoEscola-Sim",
  description: "Plataforma de estudos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
