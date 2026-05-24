"use client";
// PromptCopiavel — exibe um prompt com botão de cópia e feedback visual
import { useState } from "react";
import { Copy, Check, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromptCopiavelProps {
  titulo: string;
  categoria?: string;
  children: string; // texto do prompt
  className?: string;
}

export default function PromptCopiavel({ titulo, categoria, children, className }: PromptCopiavelProps) {
  const [copiado, setCopiado] = useState(false);

  // Copia o prompt para a área de transferência
  async function copiarPrompt() {
    try {
      await navigator.clipboard.writeText(children);
      setCopiado(true);
      // Volta ao estado original após 2 segundos
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Fallback para navegadores mais antigos
      const textarea = document.createElement("textarea");
      textarea.value = children;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-roxo/20 bg-roxo-claro overflow-hidden my-4",
        className
      )}
    >
      {/* Cabeçalho do prompt */}
      <div className="flex items-center justify-between px-4 py-3 bg-roxo/10 border-b border-roxo/15">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-bold text-roxo uppercase tracking-wide">
            Prompt
          </span>
          {titulo && (
            <span className="text-sm font-semibold text-gray-800 truncate">
              — {titulo}
            </span>
          )}
          {categoria && (
            <span className="hidden sm:flex items-center gap-1 text-xs text-roxo/70 bg-roxo/10 px-2 py-0.5 rounded-full">
              <Tag className="w-3 h-3" />
              {categoria}
            </span>
          )}
        </div>

        {/* Botão copiar */}
        <button
          onClick={copiarPrompt}
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all flex-shrink-0",
            copiado
              ? "bg-verde text-white"
              : "bg-white text-roxo hover:bg-roxo hover:text-white border border-roxo/20"
          )}
          aria-label="Copiar prompt"
        >
          {copiado ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copiar
            </>
          )}
        </button>
      </div>

      {/* Texto do prompt */}
      <div className="p-4">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-mono">
          {children}
        </p>
      </div>
    </div>
  );
}
