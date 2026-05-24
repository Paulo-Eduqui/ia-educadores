// Página de listagem de módulos — visual aprimorado
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Clock, Lock, CheckCircle, ChevronRight } from "lucide-react";
import { criarClienteSupabaseServidor } from "@/lib/supabase/server";
import { MODULOS, FASES, type FaseModulo, type NivelModulo } from "@/lib/content/modulosData";
import { cn } from "@/lib/utils";

export const metadata = { title: "Módulos" };

const NIVEL_ROTULO: Record<NivelModulo, { texto: string; cor: string }> = {
  basico:        { texto: "Básico",        cor: "bg-verde-claro text-verde" },
  intermediario: { texto: "Intermediário", cor: "bg-azul-claro text-azul" },
  avancado:      { texto: "Avançado",      cor: "bg-roxo-claro text-roxo" },
};

const FASE_CONFIG = [
  { bar: "bg-verde",   hex: "#1D9E75", borda: "border-l-verde",   header: "from-verde/10 to-transparent",   badge: "bg-verde text-white" },
  { bar: "bg-azul",    hex: "#378ADD", borda: "border-l-azul",    header: "from-azul/10 to-transparent",    badge: "bg-azul text-white" },
  { bar: "bg-roxo",    hex: "#7F77DD", borda: "border-l-roxo",    header: "from-roxo/10 to-transparent",    badge: "bg-roxo text-white" },
  { bar: "bg-laranja", hex: "#BA7517", borda: "border-l-laranja", header: "from-laranja/10 to-transparent", badge: "bg-laranja text-white" },
  { bar: "bg-vermelho",hex: "#D85A30", borda: "border-l-vermelho",header: "from-vermelho/10 to-transparent",badge: "bg-vermelho text-white" },
];

export default async function PaginaModulos() {
  const supabase = await criarClienteSupabaseServidor();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: progressos } = await supabase
    .from("progresso")
    .select("modulo_slug, concluido, percentual")
    .eq("usuario_id", user.id);

  const modulosConcluidos = progressos?.filter((p) => p.concluido).map((p) => p.modulo_slug) || [];
  const progressoPorModulo = new Map(progressos?.map((p) => [p.modulo_slug, p.percentual]) || []);

  function estaDesbloqueado(slug: string): boolean {
    const modulo = MODULOS.find((m) => m.slug === slug);
    if (!modulo) return false;
    if (modulo.prerequisitos.length === 0) return true;
    return modulo.prerequisitos.every((s) => modulosConcluidos.includes(s));
  }

  const totalConcluidos = modulosConcluidos.length;

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Módulos do Curso</h1>
          <p className="text-gray-400 mt-1 text-sm">24 módulos · 5 fases progressivas · 80 horas</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm">
          <CheckCircle className="w-4 h-4 text-verde" />
          <span className="text-sm font-bold text-gray-900">{totalConcluidos}<span className="font-normal text-gray-400">/24</span></span>
          <span className="text-xs text-gray-400">concluídos</span>
        </div>
      </div>

      {/* Listagem por fase */}
      {FASES.map((fase, i) => {
        const cfg = FASE_CONFIG[i];
        const modulosDaFase = MODULOS.filter((m) => m.fase === fase.numero as FaseModulo);
        const concluidos = modulosDaFase.filter((m) => modulosConcluidos.includes(m.slug)).length;
        const progresso = Math.round((concluidos / modulosDaFase.length) * 100);
        const todosDesbloqueados = modulosDaFase.some((m) => estaDesbloqueado(m.slug));

        return (
          <div key={fase.numero} className="space-y-3">
            {/* Header da fase */}
            <div className={cn(
              "flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r border border-gray-100",
              cfg.header
            )}>
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm", cfg.badge)}>
                  {fase.numero}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-gray-900 text-sm">Fase {fase.numero} — {fase.titulo}</h2>
                    {progresso === 100 && (
                      <span className="flex items-center gap-1 text-xs bg-verde-claro text-verde px-2 py-0.5 rounded-full font-medium">
                        <CheckCircle className="w-3 h-3" /> Concluída
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {fase.cargaHoraria}h · {modulosDaFase.length} módulos
                  </p>
                </div>
              </div>
              {/* Mini barra de progresso da fase */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="hidden sm:flex w-20 bg-gray-200/60 rounded-full h-1.5 overflow-hidden">
                  <div className={cn("h-1.5 rounded-full transition-all duration-700", cfg.bar)}
                       style={{ width: `${progresso}%` }} />
                </div>
                <span className="text-sm font-bold" style={{ color: cfg.hex }}>{progresso}%</span>
              </div>
            </div>

            {/* Grid de módulos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {modulosDaFase.map((modulo) => {
                const desbloqueado = estaDesbloqueado(modulo.slug);
                const concluido = modulosConcluidos.includes(modulo.slug);
                const percentual = progressoPorModulo.get(modulo.slug) || 0;
                const nivelCfg = NIVEL_ROTULO[modulo.nivel];

                return desbloqueado ? (
                  <Link
                    key={modulo.id}
                    href={`/modulos/${modulo.slug}`}
                    className={cn(
                      "group relative bg-white rounded-2xl border-l-4 border border-gray-100 p-4",
                      "hover:shadow-lg hover:shadow-gray-100/80 hover:-translate-y-0.5 transition-all duration-200",
                      cfg.borda
                    )}
                  >
                    <ModuloCard
                      modulo={modulo} concluido={concluido} percentual={percentual}
                      nivelCfg={nivelCfg} faseCfg={cfg} desbloqueado={true}
                    />
                  </Link>
                ) : (
                  <div
                    key={modulo.id}
                    className="relative bg-gray-50 rounded-2xl border border-gray-100 border-l-4 border-l-gray-200 p-4 opacity-55"
                  >
                    <ModuloCard
                      modulo={modulo} concluido={concluido} percentual={percentual}
                      nivelCfg={nivelCfg} faseCfg={cfg} desbloqueado={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ModuloCard({
  modulo, concluido, percentual, nivelCfg, faseCfg, desbloqueado
}: {
  modulo: typeof MODULOS[0];
  concluido: boolean; percentual: number;
  nivelCfg: { texto: string; cor: string };
  faseCfg: typeof FASE_CONFIG[0];
  desbloqueado: boolean;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Topo: ícone + badge status */}
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl leading-none">{modulo.icone}</div>
        <div>
          {concluido ? (
            <div className="flex items-center gap-1 bg-verde-claro text-verde text-xs font-semibold px-2 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" />
              Feito
            </div>
          ) : !desbloqueado ? (
            <div className="flex items-center gap-1 bg-gray-100 text-gray-400 text-xs px-2 py-1 rounded-full">
              <Lock className="w-3 h-3" />
              Bloqueado
            </div>
          ) : percentual > 0 ? (
            <div className="text-xs font-bold px-2 py-1 rounded-full bg-azul-claro text-azul">
              {percentual}%
            </div>
          ) : null}
        </div>
      </div>

      {/* Título */}
      <h3 className={cn("font-semibold leading-snug mb-1 text-sm",
        desbloqueado ? "text-gray-900 group-hover:text-gray-700" : "text-gray-500")}>
        {modulo.titulo}
      </h3>

      {/* Descrição */}
      <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed flex-1">
        {desbloqueado ? modulo.descricao : "Conclua os módulos anteriores para desbloquear este."}
      </p>

      {/* Metadados */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", nivelCfg.cor)}>
          {nivelCfg.texto}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-3 h-3" />{modulo.cargaHoraria}h
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <BookOpen className="w-3 h-3" />{modulo.aulas.length} aulas
        </span>
      </div>

      {/* Progresso bar */}
      {desbloqueado && percentual > 0 && (
        <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
          <div className={cn("h-1 rounded-full transition-all", faseCfg.bar)}
               style={{ width: `${percentual}%` }} />
        </div>
      )}

      {/* Seta indicadora */}
      {desbloqueado && !concluido && (
        <div className="flex justify-end mt-2">
          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
        </div>
      )}
    </div>
  );
}
