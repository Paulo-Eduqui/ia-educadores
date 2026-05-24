// Página de perfil e estatísticas do usuário — visual aprimorado
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { BookOpen, Clock, Award, CheckCircle, TrendingUp, MapPin, Briefcase, School } from "lucide-react";
import { criarClienteSupabaseServidor } from "@/lib/supabase/server";
import { MODULOS, FASES, CARGA_HORARIA_TOTAL } from "@/lib/content/modulosData";
import { cn } from "@/lib/utils";

export const metadata = { title: "Meu Perfil — IA Educadores" };

const FUNCAO_ROTULO: Record<string, string> = {
  professor:   "Professor(a)",
  mediador:    "Mediador(a)",
  assistente:  "Assistente",
  secretario:  "Secretário(a)",
  coordenador: "Coordenador(a) Pedagógico(a)",
  gestor:      "Gestor(a) / Diretor(a)",
  outro:       "Outro",
};

const FASE_CORES: Record<number, { bg: string; text: string; hex: string }> = {
  1: { bg: "bg-verde",    text: "text-verde",   hex: "#1D9E75" },
  2: { bg: "bg-azul",     text: "text-azul",    hex: "#378ADD" },
  3: { bg: "bg-roxo",     text: "text-roxo",    hex: "#7F77DD" },
  4: { bg: "bg-laranja",  text: "text-laranja", hex: "#BA7517" },
  5: { bg: "bg-vermelho", text: "text-vermelho",hex: "#D85A30" },
};

export default async function PaginaPerfil() {
  const supabase = await criarClienteSupabaseServidor();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: perfil }, { data: progressos }, { data: quizResultados }, { data: certificados }] =
    await Promise.all([
      supabase.from("perfis").select("*").eq("id", user.id).single(),
      supabase.from("progresso").select("*").eq("usuario_id", user.id),
      supabase.from("quiz_resultados").select("pontuacao, total_questoes, feito_em").eq("usuario_id", user.id),
      supabase.from("certificados").select("*").eq("usuario_id", user.id),
    ]);

  // Cálculos
  const modulosConcluidos = progressos?.filter((p) => p.concluido).map((p) => p.modulo_slug) || [];
  const totalConcluidos = modulosConcluidos.length;
  const horasCumpridas = MODULOS.filter((m) => modulosConcluidos.includes(m.slug))
    .reduce((soma, m) => soma + m.cargaHoraria, 0);
  const progressoGeral = Math.round((totalConcluidos / MODULOS.length) * 100);
  const totalQuizzes = quizResultados?.length || 0;
  const mediaNota =
    totalQuizzes > 0
      ? Math.round(
          quizResultados!.reduce((sum, r) => sum + (r.pontuacao / r.total_questoes) * 100, 0) / totalQuizzes
        )
      : null;

  const nomeExibicao = perfil?.nome || user.email?.split("@")[0] || "Educador";
  // Duas iniciais para o avatar
  const partes = nomeExibicao.trim().split(/\s+/);
  const iniciais = partes.length >= 2
    ? (partes[0][0] + partes[partes.length - 1][0]).toUpperCase()
    : nomeExibicao.charAt(0).toUpperCase();

  return (
    <div className="space-y-5 fade-in">

      {/* Card de perfil */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm shadow-gray-100/50">
        {/* Faixa de capa */}
        <div
          className="h-16"
          style={{ background: "linear-gradient(135deg, #1D9E75 0%, #378ADD 100%)" }}
        />
        {/* Conteúdo do perfil */}
        <div className="px-5 pb-5">
          {/* Avatar posicionado sobre a faixa */}
          <div className="flex items-end justify-between -mt-8 mb-3">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #1D9E75, #378ADD)" }}
            >
              {iniciais}
            </div>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">{nomeExibicao}</h1>
              {perfil?.funcao && (
                <p className="text-verde text-sm font-medium flex items-center gap-1.5 mt-0.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  {FUNCAO_ROTULO[perfil.funcao] || perfil.funcao}
                </p>
              )}
              {perfil?.escola && (
                <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-0.5">
                  <School className="w-3.5 h-3.5 text-gray-400" />
                  {perfil.escola}
                </p>
              )}
              {perfil?.municipio && (
                <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  {perfil.municipio}, AC
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-3 text-sm">Minhas estatísticas</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            cor="verde"
            icone={<CheckCircle className="w-4 h-4 text-verde" />}
            valor={String(totalConcluidos)}
            rotulo="Módulos concluídos"
            sub={`de ${MODULOS.length}`}
          />
          <StatCard
            cor="azul"
            icone={<Clock className="w-4 h-4 text-azul" />}
            valor={`${horasCumpridas}h`}
            rotulo="Horas estudadas"
            sub={`de ${CARGA_HORARIA_TOTAL}h`}
          />
          <StatCard
            cor="roxo"
            icone={<BookOpen className="w-4 h-4 text-roxo" />}
            valor={String(totalQuizzes)}
            rotulo="Quizzes realizados"
          />
          <StatCard
            cor="laranja"
            icone={<Award className="w-4 h-4 text-laranja" />}
            valor={mediaNota !== null ? `${mediaNota}%` : "—"}
            rotulo="Média nos quizzes"
          />
        </div>
      </div>

      {/* Progresso geral */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-verde" />
            Progresso geral
          </h2>
          <span className="text-sm font-bold text-verde">{progressoGeral}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden mb-2">
          <div
            className="bg-verde h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${progressoGeral}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">
          {horasCumpridas}h concluídas de {CARGA_HORARIA_TOTAL}h totais
        </p>
      </div>

      {/* Progresso por fase */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-900 mb-4 text-sm">Progresso por fase</h2>
        <div className="space-y-3.5">
          {FASES.map((fase) => {
            const modulosDaFase = MODULOS.filter((m) => m.fase === fase.numero as 1|2|3|4|5);
            const concluidos = modulosDaFase.filter((m) => modulosConcluidos.includes(m.slug)).length;
            const prog = Math.round((concluidos / modulosDaFase.length) * 100);
            const cores = FASE_CORES[fase.numero];

            return (
              <div key={fase.numero} className="flex items-center gap-3">
                <div
                  className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold text-white")}
                  style={{ backgroundColor: cores.hex }}
                >
                  {fase.numero}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-gray-600 truncate">{fase.titulo}</span>
                    <span className="text-xs font-bold flex-shrink-0 ml-2" style={{ color: cores.hex }}>
                      {concluidos}/{modulosDaFase.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${prog}%`, backgroundColor: cores.hex }}
                    />
                  </div>
                </div>
                {prog === 100 && <CheckCircle className="w-4 h-4 text-verde flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificados */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900 text-sm">Certificados</h2>
          <a href="/certificados" className="text-xs text-verde hover:underline font-medium">
            Ver todos →
          </a>
        </div>
        {!certificados || certificados.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">Nenhum certificado ainda</p>
            <p className="text-xs text-gray-400">
              Conclua todos os módulos de uma fase para obter o certificado
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {certificados.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center gap-3 p-3 bg-verde-claro rounded-xl hover:bg-verde/10 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-verde" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-xs truncate">{cert.titulo_certificado}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {cert.carga_horaria}h · {new Date(cert.emitido_em).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <a
                  href={`/certificados/${cert.id}/imprimir`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-verde font-semibold hover:underline flex-shrink-0"
                >
                  Imprimir
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Componente de estatística ────────────────────────────────────────────────
function StatCard({
  cor, icone, valor, rotulo, sub,
}: {
  cor: string; icone: ReactNode; valor: string; rotulo: string; sub?: string;
}) {
  const bgMap: Record<string, string> = {
    verde: "bg-verde-claro",
    azul: "bg-azul-claro",
    roxo: "bg-roxo-claro",
    laranja: "bg-laranja-claro",
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md hover:shadow-gray-100 transition-all">
      <div className={cn("inline-flex p-2 rounded-xl mb-3", bgMap[cor])}>{icone}</div>
      <p className="text-2xl font-black text-gray-900 leading-none">{valor}</p>
      <p className="text-xs text-gray-500 mt-1">{rotulo}</p>
      {sub && <p className="text-[10px] text-gray-400">{sub}</p>}
    </div>
  );
}
