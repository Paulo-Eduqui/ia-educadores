"use client";
// Bloco de anotações pessoais por módulo — salva automaticamente
import { useState, useEffect, useRef, useCallback } from "react";
import { StickyNote, Save, Trash2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnotacaoModuloProps {
  moduloSlug: string;
  conteudoInicial?: string;
}

export function AnotacaoModulo({ moduloSlug, conteudoInicial = "" }: AnotacaoModuloProps) {
  const [conteudo, setConteudo] = useState(conteudoInicial);
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [expandido, setExpandido] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ultimoSalvoRef = useRef(conteudoInicial);

  const salvar = useCallback(async (texto: string) => {
    if (texto === ultimoSalvoRef.current) return;
    setSalvando(true);
    setSalvo(false);

    try {
      const res = await fetch("/api/anotacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduloSlug, conteudo: texto }),
      });

      if (res.ok) {
        ultimoSalvoRef.current = texto;
        setSalvo(true);
        setTimeout(() => setSalvo(false), 2000);
      }
    } catch {
      // falha silenciosa
    } finally {
      setSalvando(false);
    }
  }, [moduloSlug]);

  // Auto-save com debounce de 1.5s
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (conteudo !== ultimoSalvoRef.current) {
        salvar(conteudo);
      }
    }, 1500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [conteudo, salvar]);

  async function apagar() {
    if (!conteudo && !ultimoSalvoRef.current) return;
    const confirmar = window.confirm("Apagar todas as anotações deste módulo?");
    if (!confirmar) return;

    setSalvando(true);
    try {
      await fetch(`/api/anotacoes?modulo=${moduloSlug}`, { method: "DELETE" });
      setConteudo("");
      ultimoSalvoRef.current = "";
    } catch {
      //
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header clicável */}
      <button
        onClick={() => setExpandido(!expandido)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
          <StickyNote className="w-4 h-4 text-laranja" />
          Minhas Anotações
          {conteudo && (
            <span className="w-2 h-2 rounded-full bg-laranja" aria-hidden="true" />
          )}
        </span>
        <span className="text-gray-400 text-xs">{expandido ? "▲" : "▼"}</span>
      </button>

      {/* Área de texto */}
      {expandido && (
        <div className="px-5 pb-5 space-y-3 border-t border-gray-50">
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            placeholder="Escreva suas notas, dúvidas ou reflexões sobre este módulo..."
            rows={6}
            className={cn(
              "w-full mt-3 resize-none rounded-xl border border-gray-200 p-3 text-sm text-gray-700",
              "placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-verde/30 focus:border-verde",
              "transition-all leading-relaxed"
            )}
          />

          {/* Rodapé com status e ações */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {salvando && "Salvando..."}
              {salvo && !salvando && (
                <span className="flex items-center gap-1 text-verde">
                  <CheckCircle className="w-3 h-3" />
                  Salvo automaticamente
                </span>
              )}
              {!salvando && !salvo && conteudo && ""}
            </span>

            <div className="flex items-center gap-2">
              {conteudo && (
                <button
                  onClick={apagar}
                  disabled={salvando}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-vermelho transition-colors px-2 py-1 rounded-lg hover:bg-vermelho/10"
                >
                  <Trash2 className="w-3 h-3" />
                  Apagar
                </button>
              )}
              <button
                onClick={() => salvar(conteudo)}
                disabled={salvando || conteudo === ultimoSalvoRef.current}
                className={cn(
                  "flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium transition-all",
                  conteudo !== ultimoSalvoRef.current
                    ? "bg-verde text-white hover:bg-verde/90"
                    : "bg-gray-100 text-gray-400 cursor-default"
                )}
              >
                <Save className="w-3 h-3" />
                Salvar
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-300">
            {conteudo.length} caracteres · Salvo automaticamente após parar de digitar
          </p>
        </div>
      )}
    </div>
  );
}
