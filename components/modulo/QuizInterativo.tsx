"use client";
// QuizInterativo — quiz com feedback imediato e salvamento automático
import { useState, useCallback } from "react";
import { CheckCircle, XCircle, ChevronRight, RotateCcw, Award, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuestaoQuiz {
  id: number;
  pergunta: string;
  opcoes: string[];
  correta: number; // índice 0-based da opção correta
  explicacao: string;
}

interface QuizInterativoProps {
  questoes: QuestaoQuiz[];
  pontuacaoMinima?: number; // % mínimo para aprovação (padrão: 70)
  moduloSlug: string;
}

type EstadoResposta = "aguardando" | "correta" | "incorreta";

const LETRAS = ["A", "B", "C", "D", "E"];

export function QuizInterativo({
  questoes,
  pontuacaoMinima = 70,
  moduloSlug,
}: QuizInterativoProps) {
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [estadoResposta, setEstadoResposta] = useState<EstadoResposta>("aguardando");
  const [acertos, setAcertos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [aprovado, setAprovado] = useState(false);

  const questao = questoes[questaoAtual];
  const totalQuestoes = questoes.length;
  const progressoPercent = Math.round((questaoAtual / totalQuestoes) * 100);

  // Verifica resposta
  const verificarResposta = useCallback(
    (indice: number) => {
      if (estadoResposta !== "aguardando") return;
      setRespostaSelecionada(indice);
      const acertou = indice === questao.correta;
      setEstadoResposta(acertou ? "correta" : "incorreta");
      if (acertou) setAcertos((a) => a + 1);
    },
    [estadoResposta, questao]
  );

  // Salva resultado na API
  async function salvarResultado(totalAcertos: number) {
    setSalvando(true);
    const percentual = Math.round((totalAcertos / totalQuestoes) * 100);
    const foiAprovado = percentual >= pontuacaoMinima;
    setAprovado(foiAprovado);

    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduloSlug,
          pontuacao: percentual,
          totalQuestoes,
          acertos: totalAcertos,
          aprovado: foiAprovado,
        }),
      });
    } catch {
      // falha silenciosa — ainda mostra resultado local
    } finally {
      setSalvando(false);
    }
  }

  // Avança ou finaliza
  async function proxima() {
    const acertosAtuais = estadoResposta === "correta" ? acertos : acertos;
    const ultimaQuestao = questaoAtual + 1 >= totalQuestoes;

    if (ultimaQuestao) {
      setFinalizado(true);
      await salvarResultado(acertos);
      return;
    }

    setQuestaoAtual((q) => q + 1);
    setRespostaSelecionada(null);
    setEstadoResposta("aguardando");
  }

  // Reinicia
  function reiniciar() {
    setQuestaoAtual(0);
    setRespostaSelecionada(null);
    setEstadoResposta("aguardando");
    setAcertos(0);
    setFinalizado(false);
    setSalvando(false);
    setAprovado(false);
  }

  // ── Tela de resultado ──────────────────────────────────────────────────────
  if (finalizado) {
    const percentualFinal = Math.round((acertos / totalQuestoes) * 100);

    return (
      <div className="text-center py-2">
        {salvando ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <Loader2 className="w-8 h-8 animate-spin text-verde" />
            <p className="text-sm text-gray-500">Salvando resultado...</p>
          </div>
        ) : (
          <>
            <div
              className={cn(
                "inline-flex items-center justify-center w-16 h-16 rounded-full mb-4",
                aprovado ? "bg-verde-claro" : "bg-red-50"
              )}
            >
              <Award className={cn("w-8 h-8", aprovado ? "text-verde" : "text-vermelho")} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {aprovado ? "Parabéns! 🎉" : "Quase lá!"}
            </h3>
            <p className="text-gray-500 mb-4">
              Você acertou <strong>{acertos}</strong> de <strong>{totalQuestoes}</strong> questões
            </p>

            {/* Barra de resultado */}
            <div className="w-full bg-gray-100 rounded-full h-3 mb-2 max-w-xs mx-auto">
              <div
                className={cn(
                  "h-3 rounded-full transition-all duration-700",
                  aprovado ? "bg-verde" : "bg-vermelho"
                )}
                style={{ width: `${percentualFinal}%` }}
              />
            </div>
            <p className={cn("text-3xl font-bold mb-5", aprovado ? "text-verde" : "text-vermelho")}>
              {percentualFinal}%
            </p>

            {aprovado ? (
              <p className="text-sm text-verde bg-verde-claro rounded-xl px-4 py-3 mb-5 max-w-sm mx-auto">
                ✅ Aprovado! Você atingiu o mínimo de {pontuacaoMinima}% exigido.
              </p>
            ) : (
              <p className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 mb-5 max-w-sm mx-auto">
                Você precisa de pelo menos {pontuacaoMinima}% para ser aprovado. Revise o conteúdo e tente novamente!
              </p>
            )}

            {!aprovado && (
              <button
                onClick={reiniciar}
                className="inline-flex items-center gap-2 bg-verde text-white px-6 py-3 rounded-xl font-semibold hover:bg-verde/90 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Tentar novamente
              </button>
            )}
          </>
        )}
      </div>
    );
  }

  // ── Questão atual ──────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* Cabeçalho: progresso */}
      <div>
        <div className="flex justify-between items-center mb-2 text-sm">
          <span className="text-gray-500">
            Questão {questaoAtual + 1} de {totalQuestoes}
          </span>
          <span className="font-bold text-verde">{acertos} ✓</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-verde h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progressoPercent}%` }}
          />
        </div>
      </div>

      {/* Pergunta */}
      <p className="font-semibold text-gray-900 leading-relaxed text-base">
        {questao.pergunta}
      </p>

      {/* Opções */}
      <div className="space-y-2">
        {questao.opcoes.map((opcao, indice) => {
          const selecionada = respostaSelecionada === indice;
          const eCorreta = indice === questao.correta;
          const mostrandoResultado = estadoResposta !== "aguardando";

          return (
            <button
              key={indice}
              onClick={() => verificarResposta(indice)}
              disabled={mostrandoResultado}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200",
                // Default
                !mostrandoResultado &&
                  "border-gray-100 text-gray-700 hover:border-verde/40 hover:bg-verde-claro/30 cursor-pointer",
                // Correta (sempre verde quando revelada)
                mostrandoResultado && eCorreta && "border-verde bg-verde-claro text-verde",
                // Selecionada errada
                mostrandoResultado &&
                  selecionada &&
                  !eCorreta &&
                  "border-vermelho bg-red-50 text-vermelho",
                // Outras opções erradas
                mostrandoResultado &&
                  !eCorreta &&
                  !selecionada &&
                  "border-gray-100 text-gray-400 opacity-60"
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5",
                    !mostrandoResultado && "border-gray-200",
                    mostrandoResultado && eCorreta && "border-verde bg-verde text-white",
                    mostrandoResultado &&
                      selecionada &&
                      !eCorreta &&
                      "border-vermelho bg-vermelho text-white",
                    mostrandoResultado &&
                      !eCorreta &&
                      !selecionada &&
                      "border-gray-200"
                  )}
                >
                  {mostrandoResultado && eCorreta ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : mostrandoResultado && selecionada && !eCorreta ? (
                    <XCircle className="w-3.5 h-3.5" />
                  ) : (
                    LETRAS[indice]
                  )}
                </span>
                <span className="leading-snug">{opcao}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback e explicação */}
      {estadoResposta !== "aguardando" && (
        <div
          className={cn(
            "p-4 rounded-xl",
            estadoResposta === "correta" ? "bg-verde-claro" : "bg-red-50"
          )}
        >
          <p
            className={cn(
              "font-semibold text-sm mb-1",
              estadoResposta === "correta" ? "text-verde" : "text-vermelho"
            )}
          >
            {estadoResposta === "correta" ? "✅ Correto!" : "❌ Incorreto!"}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">{questao.explicacao}</p>
        </div>
      )}

      {/* Botão avançar */}
      {estadoResposta !== "aguardando" && (
        <button
          onClick={proxima}
          className="w-full flex items-center justify-center gap-2 bg-verde text-white py-3 rounded-xl font-semibold hover:bg-verde/90 transition-colors"
        >
          {questaoAtual + 1 >= totalQuestoes ? "Ver resultado" : "Próxima questão"}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Compatibilidade com importação default (legado)
export default QuizInterativo;
