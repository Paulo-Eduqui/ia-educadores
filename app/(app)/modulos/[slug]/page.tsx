// Página individual de módulo — visual aprimorado
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, BookOpen, CheckCircle, Award, Target, Wrench } from "lucide-react";
import { criarClienteSupabaseServidor } from "@/lib/supabase/server";
import { buscarModuloPorSlug, MODULOS, type NivelModulo } from "@/lib/content/modulosData";
import { buscarQuizPorSlug } from "@/lib/content/quizzesData";
import { BotaoConcluir } from "@/components/modulo/BotaoConcluir";
import { AnotacaoModulo } from "@/components/modulo/AnotacaoModulo";
import { QuizInterativo } from "@/components/modulo/QuizInterativo";
import { cn } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

const NIVEL_CONFIG: Record<NivelModulo, { texto: string; cor: string }> = {
  basico:        { texto: "Básico",        cor: "bg-verde-claro text-verde" },
  intermediario: { texto: "Intermediário", cor: "bg-azul-claro text-azul" },
  avancado:      { texto: "Avançado",      cor: "bg-roxo-claro text-roxo" },
};

const TIPO_AULA: Record<string, { emoji: string; rotulo: string; cor: string }> = {
  teoria:       { emoji: "📖", rotulo: "Teoria",        cor: "bg-azul-claro text-azul" },
  demonstracao: { emoji: "🎬", rotulo: "Demonstração",  cor: "bg-roxo-claro text-roxo" },
  pratica:      { emoji: "💪", rotulo: "Prática",       cor: "bg-verde-claro text-verde" },
  quiz:         { emoji: "❓", rotulo: "Quiz",          cor: "bg-laranja-claro text-laranja" },
  projeto:      { emoji: "🚀", rotulo: "Projeto",       cor: "bg-vermelho-claro text-vermelho" },
};

const FASE_HEX: Record<number, string> = {
  1: "#1D9E75",
  2: "#378ADD",
  3: "#7F77DD",
  4: "#BA7517",
  5: "#D85A30",
};

export async function generateMetadata({ params }: Props) {
  const modulo = buscarModuloPorSlug(params.slug);
  return { title: modulo ? `${modulo.titulo} — IA Educadores` : "Módulo" };
}

export default async function PaginaModulo({ params }: Props) {
  const modulo = buscarModuloPorSlug(params.slug);
  if (!modulo) notFound();

  const supabase = await criarClienteSupabaseServidor();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [progressoRes, anotacaoRes, quizRes] = await Promise.all([
    supabase
      .from("progresso")
      .select("*")
      .eq("usuario_id", user.id)
      .eq("modulo_slug", params.slug)
      .single(),
    supabase
      .from("anotacoes")
      .select("conteudo")
      .eq("usuario_id", user.id)
      .eq("modulo_slug", params.slug)
      .single(),
    supabase
      .from("quiz_resultados")
      .select("pontuacao, aprovado")
      .eq("usuario_id", user.id)
      .eq("modulo_slug", params.slug)
      .order("feito_em", { ascending: false })
      .limit(1)
      .single(),
  ]);

  const concluido = progressoRes.data?.concluido || false;
  const percentual = progressoRes.data?.percentual || 0;
  const anotacaoInicial = anotacaoRes.data?.conteudo || "";
  const melhorQuiz = quizRes.data;
  const dadosQuiz = buscarQuizPorSlug(params.slug);

  const indiceAtual = MODULOS.findIndex((m) => m.slug === params.slug);
  const moduloAnterior = indiceAtual > 0 ? MODULOS[indiceAtual - 1] : null;
  const proximoModulo = indiceAtual < MODULOS.length - 1 ? MODULOS[indiceAtual + 1] : null;

  const nivelCfg = NIVEL_CONFIG[modulo.nivel];
  const duracaoTotal = modulo.aulas.reduce((s, a) => s + a.duracaoMinutos, 0);
  const faseHex = FASE_HEX[modulo.fase] || "#1D9E75";

  return (
    <div className="space-y-5 fade-in">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <Link href="/modulos" className="flex items-center gap-1 hover:text-verde transition-colors font-medium">
          <ChevronLeft className="w-3.5 h-3.5" />
          Módulos
        </Link>
        <span>/</span>
        <span className="font-medium" style={{ color: faseHex }}>Fase {modulo.fase}</span>
        <span className="hidden sm:inline">/</span>
        <span className="hidden sm:inline text-gray-400 truncate max-w-40">{modulo.titulo}</span>
      </div>

      {/* Header do módulo */}
      <div
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm shadow-gray-100/50"
        style={{ borderTopColor: faseHex, borderTopWidth: "3px" }}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ backgroundColor: `${faseHex}18` }}
            >
              {modulo.icone}
            </div>
            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: faseHex }}
                >
                  Fase {modulo.fase}
                </span>
                <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", nivelCfg.cor)}>
                  {nivelCfg.texto}
                </span>
                {concluido && (
                  <span className="flex items-center gap-1 text-[10px] bg-verde-claro text-verde px-2 py-0.5 rounded-full font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Concluído
                  </span>
                )}
                {dadosQuiz && melhorQuiz?.aprovado && (
                  <span className="flex items-center gap-1 text-[10px] bg-azul-claro text-azul px-2 py-0.5 rounded-full font-medium">
                    <Award className="w-3 h-3" />
                    Quiz: {melhorQuiz.pontuacao}%
                  </span>
                )}
              </div>

              <h1 className="text-xl font-bold text-gray-900 mb-1.5 leading-tight">{modulo.titulo}</h1>
              <p className="text-sm text-gray-500 leading-relaxed">{modulo.descricao}</p>

              {/* Metadados */}
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {modulo.cargaHoraria}h de carga horária
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {modulo.aulas.length} aulas · {duracaoTotal}min
                </span>
                {modulo.temQuiz && (
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    Inclui quiz
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Barra de progresso */}
          {percentual > 0 && (
            <div className="mt-5 pt-5 border-t border-gray-50">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-gray-500 font-medium">Progresso</span>
                <span className="font-bold" style={{ color: faseHex }}>{percentual}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${percentual}%`, backgroundColor: faseHex }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Objetivos */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="flex items-center gap-2 font-semibold text-gray-900 mb-4 text-sm">
          <Target className="w-4 h-4 text-verde" />
          O que você vai aprender
        </h2>
        <ul className="space-y-2.5">
          {modulo.objetivos.map((obj, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-600 leading-snug">
              <CheckCircle
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: faseHex }}
              />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Ferramentas utilizadas */}
      {modulo.ferramentas.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="flex items-center gap-2 font-semibold text-gray-900 mb-3 text-sm">
            <Wrench className="w-4 h-4 text-azul" />
            Ferramentas deste módulo
          </h2>
          <div className="flex flex-wrap gap-2">
            {modulo.ferramentas.map((f) => (
              <span key={f} className="px-3 py-1.5 bg-azul-claro text-azul text-xs rounded-full font-semibold">
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Lista de aulas */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">Aulas deste módulo</h2>
          <span className="text-xs text-gray-400">{modulo.aulas.length} aulas · {duracaoTotal}min</span>
        </div>
        <div className="divide-y divide-gray-50">
          {modulo.aulas.map((aula) => {
            const tipoCfg = TIPO_AULA[aula.tipo] || { emoji: "📄", rotulo: aula.tipo, cor: "bg-gray-100 text-gray-500" };
            return (
              <div
                key={aula.ordem}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/80 transition-colors group"
              >
                {/* Número da aula */}
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400 bg-gray-100 flex-shrink-0">
                  {aula.ordem}
                </div>
                {/* Tipo */}
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0", tipoCfg.cor)}>
                  {tipoCfg.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{aula.titulo}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{tipoCfg.rotulo}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 tabular-nums">{aula.duracaoMinutos}min</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz interativo */}
      {dadosQuiz && (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-laranja/5 to-transparent">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-laranja" />
              Quiz do Módulo
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Mínimo {dadosQuiz.pontuacaoMinima}% para aprovação · {dadosQuiz.questoes.length} questões
            </p>
          </div>
          <div className="p-5">
            <QuizInterativo
              questoes={dadosQuiz.questoes}
              pontuacaoMinima={dadosQuiz.pontuacaoMinima}
              moduloSlug={params.slug}
            />
          </div>
        </div>
      )}

      {/* Anotações */}
      <AnotacaoModulo
        moduloSlug={params.slug}
        conteudoInicial={anotacaoInicial}
      />

      {/* Botão concluir */}
      <BotaoConcluir
        moduloSlug={params.slug}
        jaConcluido={concluido}
        percentualAtual={percentual}
      />

      {/* Navegação entre módulos */}
      {(moduloAnterior || proximoModulo) && (
        <div className="flex gap-3">
          {moduloAnterior ? (
            <Link
              href={`/modulos/${moduloAnterior.slug}`}
              className="flex-1 flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
            >
              <ChevronLeft className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Anterior</p>
                <p className="text-sm font-semibold text-gray-700 truncate mt-0.5">{moduloAnterior.titulo}</p>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {proximoModulo && (
            <Link
              href={`/modulos/${proximoModulo.slug}`}
              className="flex-1 flex items-center justify-end gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-verde/20 hover:shadow-sm hover:shadow-verde/5 transition-all group"
            >
              <div className="min-w-0 text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Próximo</p>
                <p className="text-sm font-semibold text-gray-700 truncate mt-0.5">{proximoModulo.titulo}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-verde transition-colors flex-shrink-0" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
