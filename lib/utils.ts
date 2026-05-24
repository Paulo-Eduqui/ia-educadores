// Utilitários compartilhados
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes do Tailwind de forma inteligente,
 * resolvendo conflitos entre classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata um número de minutos em texto legível (ex: "1h 30min")
 */
export function formatarDuracao(minutos: number): string {
  if (minutos < 60) return `${minutos}min`;
  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;
  if (minutosRestantes === 0) return `${horas}h`;
  return `${horas}h ${minutosRestantes}min`;
}

/**
 * Retorna saudação baseada na hora do dia em português
 */
export function saudacao(): string {
  const hora = new Date().getHours();
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

/**
 * Converte data para formato brasileiro (dd/mm/aaaa)
 */
export function formatarData(data: string | Date): string {
  const d = typeof data === "string" ? new Date(data) : data;
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}
