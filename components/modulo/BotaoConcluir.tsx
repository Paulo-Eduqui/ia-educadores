"use client";
// Botão para marcar módulo como concluído
import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BotaoConcluirProps {
  moduloSlug: string;
  jaConcluido: boolean;
  percentualAtual: number;
  aoAtualizar?: (concluido: boolean, percentual: number) => void;
}

export function BotaoConcluir({
  moduloSlug,
  jaConcluido,
  percentualAtual,
  aoAtualizar,
}: BotaoConcluirProps) {
  const [concluido, setConcluido] = useState(jaConcluido);
  const [percentual, setPercentual] = useState(percentualAtual);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function marcarConcluido() {
    if (concluido || carregando) return;
    setCarregando(true);
    setMensagem("");

    try {
      const res = await fetch("/api/progresso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduloSlug,
          percentual: 100,
          concluido: true,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setMensagem(json.erro || "Erro ao salvar progresso.");
        return;
      }

      setConcluido(true);
      setPercentual(100);
      setMensagem("Módulo concluído! 🎉");
      aoAtualizar?.(true, 100);

      // Limpa mensagem após 4s
      setTimeout(() => setMensagem(""), 4000);
    } catch {
      setMensagem("Erro de conexão. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  async function atualizarPercentual(novoPercentual: number) {
    if (carregando) return;
    setCarregando(true);

    try {
      const res = await fetch("/api/progresso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduloSlug,
          percentual: novoPercentual,
          concluido: false,
        }),
      });

      if (res.ok) {
        setPercentual(novoPercentual);
        aoAtualizar?.(false, novoPercentual);
      }
    } catch {
      // silently fail
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Barra de progresso manual */}
      {!concluido && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Quanto deste módulo você já estudou?
          </p>
          <div className="flex gap-2 flex-wrap">
            {[25, 50, 75].map((pct) => (
              <button
                key={pct}
                onClick={() => atualizarPercentual(pct)}
                disabled={carregando || percentual >= pct}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium border transition-all",
                  percentual >= pct
                    ? "bg-verde-claro border-verde text-verde"
                    : "bg-white border-gray-200 text-gray-500 hover:border-verde hover:text-verde"
                )}
              >
                {pct}%
              </button>
            ))}
          </div>
          {percentual > 0 && percentual < 100 && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progresso salvo</span>
                <span>{percentual}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-verde h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${percentual}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Botão principal */}
      <button
        onClick={marcarConcluido}
        disabled={concluido || carregando}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-base transition-all",
          concluido
            ? "bg-verde-claro text-verde border border-verde/20 cursor-default"
            : "bg-verde text-white hover:bg-verde/90 active:scale-[0.98] shadow-md shadow-verde/20"
        )}
      >
        {carregando ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Salvando...
          </>
        ) : concluido ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Módulo Concluído
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            Marcar como Concluído
          </>
        )}
      </button>

      {/* Feedback */}
      {mensagem && (
        <p
          className={cn(
            "text-center text-sm font-medium",
            mensagem.includes("Erro") ? "text-vermelho" : "text-verde"
          )}
        >
          {mensagem}
        </p>
      )}
    </div>
  );
}
