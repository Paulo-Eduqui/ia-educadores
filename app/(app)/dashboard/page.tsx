// Dashboard — página inicial do aluno, visual aprimorado
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, Lightbulb, Wrench, Users, Award, Clock, CheckCircle, TrendingUp, ChevronRight, Flame } from "lucide-react";
import { criarClienteSupabaseServidor } from "@/lib/supabase/server";
import { MODULOS, FASES, TOTAL_MODULOS, CARGA_HORARIA_TOTAL } from "@/lib/content/modulosData";
import { cn } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

const CORES_FASE = [
  { bar: "#1D9E75", bg: "bg-verde-claro",   text: "text-verde",   hex: "#1D9E75" },
  { bar: "#378ADD", bg: "bg-azul-claro",    text: "text-azul",    hex: "#378ADD" },
  { bar: "#7F77DD", bg: "bg-roxo-claro",    text: "text-roxo",    hex: "#7F77DD" },
  { bar: "#BA7517", bg: "bg-laranja-claro", text: "text-laranja", hex: "#BA7517" },
  { bar: "#D85A30", bg: "bg-red-50",        text: "text-vermelho",hex: "#D85A30" },
];

export default async function PaginaDashboard() {
  const supabase = await criarClienteSupabaseServidor();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: perfil }, { data: progressos }, { data: certificados }] = await Promise.all([
    supabase.from("perfis").select("*").eq("id", user.id).single(),
    supabase.from("progresso").select("*").eq("usuario_id", user.id),
    supabase.from("certificados").select("fase").eq("usuario_id", user.id),
  ]);

  const modulosConcluidos = progressos?.filter((p) => p.concluido).map((p) => p.modulo_slug) || [];
  const totalConcluidos = modulosConcluidos.length;
  const progressoGeral = Math.round((totalConcluidos / TOTAL_MODULOS) * 100);
  const horasCumpridas = MODULOS.filter((m) => modulosConcluidos.includes(m.slug)).reduce((s, m) => s + m.cargaHoraria, 0);
  const totalCerts = certificados?.length || 0;
  const proximoModulo = MODULOS.find((m) => !modulosConcluidos.includes(m.slug));
  const primeiroNome = (perfil?.nome || user.email || "Educador").split(" ")[0];

  // Progresso em módulo aberto (não concluído)
  const emAndamento = progressos?.find((p) => !p.concluido && p.percentual > 0);
  const moduloEmAndamento = emAndamento ? MODULOS.find((m) => m.slug === emAndamento.modulo_slug) : null;

  return (
    <div className="space-y-5 fade-in">

      {/* Hero banner de saudação */}
      <div className="relative rounded-3xl overflow-hidden"
           style={{ background: "linear-gradient(135deg, #1D9E75 0%, #378ADD 100%)" }}>
        {/* Círculos decorativos */}
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute right-16 bottom-[-20px] w-24 h-24 rounded-full bg-white/5" />

        <div className="relative px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Bem-vindo de volta 👋</p>
              <h1 className="text-2xl font-bold text-white leading-tight">
                {primeiroNome}
              </h1>
              <p className="text-white/70 text-sm mt-1">
                {totalConcluidos === 0
                  ? "Vamos começar sua jornada em IA?"
                  : `${totalConcluidos} de ${TOTAL_MODULOS} módulos concluídos`}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-4xl font-black text-white/20 leading-none">{progressoGeral}%</div>
              <div className="text-white/60 text-xs mt-0.5">do curso</div>
            </div>
          </div>

          {/* Barra de progresso no banner */}
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-700"
                style={{ width: `${progressoGeral}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icone: CheckCircle, valor: `${totalConcluidos}`, sub: `de ${TOTAL_MODULOS} módulos`, bg: "bg-verde-claro", cor: "text-verde", hex: "#1D9E75" },
          { icone: Clock,        valor: `${horasCumpridas}h`, sub: `de ${CARGA_HORARIA_TOTAL}h`,  bg: "bg-azul-claro",  cor: "text-azul",  hex: "#378ADD" },
          { icone: Award,        valor: `${totalCerts}`,     sub: "certificados",                bg: "bg-laranja-claro",cor: "text-laranja",hex: "#BA7517" },
          { icone: TrendingUp,   valor: `${progressoGeral}%`,sub: "progresso geral",             bg: "bg-roxo-claro",  cor: "text-roxo",  hex: "#7F77DD" },
        ].map((s, i) => {
          const Icone = s.icone;
          return (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md hover:shadow-gray-100 transition-all">
              <div className={cn("inline-flex p-2 rounded-xl mb-3", s.bg)}>
                <Icone className={cn("w-4 h-4", s.cor)} />
              </div>
              <p className="text-2xl font-black text-gray-900">{s.valor}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-tight">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Módulo em andamento (se houver) */}
      {moduloEmAndamento && emAndamento && (
        <Link href={`/modulos/${moduloEmAndamento.slug}`}
          className="flex items-center gap-4 bg-white border border-verde/20 rounded-2xl p-4 hover:shadow-md hover:border-verde/40 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-verde-claro flex items-center justify-center text-2xl flex-shrink-0">
            {moduloEmAndamento.icone}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <Flame className="w-3 h-3 text-laranja" />
              <p className="text-xs font-semibold text-laranja uppercase tracking-wide">Em andamento</p>
            </div>
            <p className="font-semibold text-gray-900 truncate text-sm">{moduloEmAndamento.titulo}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                <div className="bg-verde h-1.5 rounded-full" style={{ width: `${emAndamento.percentual}%` }} />
              </div>
              <span className="text-xs font-bold text-verde flex-shrink-0">{emAndamento.percentual}%</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-verde group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </Link>
      )}

      {/* Próximo módulo */}
      {proximoModulo && !moduloEmAndamento && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-verde" />
            Continue sua jornada
          </h2>
          <Link
            href={`/modulos/${proximoModulo.slug}`}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-verde-claro border border-transparent hover:border-verde/20 transition-all group"
          >
            <span className="text-3xl flex-shrink-0">{proximoModulo.icone}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-verde/80 uppercase tracking-wide mb-0.5">
                Fase {proximoModulo.fase} · Próximo passo
              </p>
              <p className="font-semibold text-gray-900 truncate">{proximoModulo.titulo}</p>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{proximoModulo.descricao}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-verde group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </Link>
        </div>
      )}

      {/* Progresso por fase */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-verde" />
          Progresso por fase
        </h2>
        <div className="space-y-3.5">
          {FASES.map((fase, i) => {
            const modulosDaFase = MODULOS.filter((m) => m.fase === fase.numero);
            const concluidosDaFase = modulosDaFase.filter((m) => modulosConcluidos.includes(m.slug)).length;
            const pct = Math.round((concluidosDaFase / modulosDaFase.length) * 100);
            const c = CORES_FASE[i];

            return (
              <div key={fase.numero} className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold", c.bg, c.text)}>
                  {fase.numero}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-gray-600 truncate">{fase.titulo}</span>
                    <span className="text-xs font-bold flex-shrink-0 ml-2" style={{ color: c.hex }}>
                      {concluidosDaFase}/{modulosDaFase.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: c.hex }}
                    />
                  </div>
                </div>
                {pct === 100 && (
                  <CheckCircle className="w-4 h-4 text-verde flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Acesso rápido */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-3">Acesso rápido</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { href: "/prompts",      icone: Lightbulb, titulo: "Biblioteca de Prompts",   descricao: "Prompts prontos para usar",  bg: "bg-verde-claro",   cor: "text-verde",   hex: "#1D9E75" },
            { href: "/ferramentas",  icone: Wrench,    titulo: "Ferramentas de IA",        descricao: "Guia das melhores",          bg: "bg-azul-claro",    cor: "text-azul",    hex: "#378ADD" },
            { href: "/comunidade",   icone: Users,     titulo: "Comunidade",               descricao: "Conecte-se com educadores",  bg: "bg-roxo-claro",    cor: "text-roxo",    hex: "#7F77DD" },
          ].map((item) => {
            const Icone = item.icone;
            return (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group">
                <div className={cn("flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0", item.bg, item.cor)}>
                  <Icone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{item.titulo}</p>
                  <p className="text-xs text-gray-400">{item.descricao}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:translate-x-0.5 group-hover:text-gray-500 transition-all" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
