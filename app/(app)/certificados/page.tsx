// Página de Certificados — visual aprimorado
import { redirect } from "next/navigation";
import { Award, Download, Calendar, Clock, Lock, CheckCircle } from "lucide-react";
import { criarClienteSupabaseServidor } from "@/lib/supabase/server";
import { FASES } from "@/lib/content/modulosData";
import { cn } from "@/lib/utils";

export const metadata = { title: "Meus Certificados — IA Educadores" };

const COR_FASE: Record<number, {
  bg: string; texto: string; borda: string;
  hex: string; emblema: string; gradiente: string;
}> = {
  1: { bg: "bg-verde-claro",   texto: "text-verde",   borda: "border-verde/25",   hex: "#1D9E75", emblema: "🌱", gradiente: "from-verde/10" },
  2: { bg: "bg-azul-claro",    texto: "text-azul",    borda: "border-azul/25",    hex: "#378ADD", emblema: "✏️", gradiente: "from-azul/10" },
  3: { bg: "bg-roxo-claro",    texto: "text-roxo",    borda: "border-roxo/25",    hex: "#7F77DD", emblema: "🎯", gradiente: "from-roxo/10" },
  4: { bg: "bg-laranja-claro", texto: "text-laranja", borda: "border-laranja/25", hex: "#BA7517", emblema: "⚡", gradiente: "from-laranja/10" },
  5: { bg: "bg-vermelho-claro",texto: "text-vermelho",borda: "border-vermelho/25",hex: "#D85A30", emblema: "🏆", gradiente: "from-vermelho/10" },
};

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function PaginaCertificados() {
  const supabase = await criarClienteSupabaseServidor();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [perfilRes, certRes] = await Promise.all([
    supabase.from("perfis").select("nome, funcao").eq("id", user.id).single(),
    supabase
      .from("certificados")
      .select("*")
      .eq("usuario_id", user.id)
      .order("fase", { ascending: true }),
  ]);

  const perfil = perfilRes.data;
  const certificados = certRes.data || [];
  const progressoCert = Math.round((certificados.length / FASES.length) * 100);

  return (
    <div className="space-y-5 fade-in">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meus Certificados</h1>
          <p className="text-sm text-gray-400 mt-1">
            Conclua todos os módulos de uma fase para receber o certificado.
          </p>
        </div>
        {/* Badge de certificados */}
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm">
          <Award className="w-4 h-4 text-laranja" />
          <span className="text-sm font-bold text-gray-900">
            {certificados.length}
            <span className="font-normal text-gray-400">/{FASES.length}</span>
          </span>
          <span className="text-xs text-gray-400">certificados</span>
        </div>
      </div>

      {/* Barra de progresso geral */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm shadow-gray-100/50">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-laranja-claro flex items-center justify-center flex-shrink-0">
            <Award className="w-7 h-7 text-laranja" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-900">
                {certificados.length === 0
                  ? "Nenhum certificado ainda"
                  : certificados.length === FASES.length
                  ? "Formação completa! 🎉"
                  : `${certificados.length} de ${FASES.length} certificados obtidos`}
              </p>
              <span className="text-sm font-bold text-laranja">{progressoCert}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-laranja h-2 rounded-full transition-all duration-700"
                style={{ width: `${progressoCert}%` }}
              />
            </div>
            {perfil?.nome && (
              <p className="text-xs text-gray-400 mt-2">
                Certificados emitidos para <strong className="text-gray-600">{perfil.nome}</strong>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Fases */}
      <div className="space-y-3">
        {FASES.map((fase) => {
          const cert = certificados.find((c) => c.fase === fase.numero);
          const cor = COR_FASE[fase.numero] || COR_FASE[1];

          return (
            <div
              key={fase.numero}
              className={cn(
                "rounded-2xl border transition-all",
                cert
                  ? `bg-white ${cor.borda} shadow-sm`
                  : "bg-gray-50/80 border-gray-100"
              )}
            >
              {/* Faixa superior colorida quando desbloqueado */}
              {cert && (
                <div
                  className="h-1.5 rounded-t-2xl"
                  style={{ backgroundColor: cor.hex }}
                />
              )}

              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Emblema */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
                      cert ? cor.bg : "bg-gray-100"
                    )}
                  >
                    {cert ? cor.emblema : <Lock className="w-5 h-5 text-gray-300" />}
                  </div>

                  {/* Conteúdo principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                          Fase {fase.numero}
                        </p>
                        <h3
                          className={cn(
                            "font-semibold text-sm",
                            cert ? "text-gray-900" : "text-gray-400"
                          )}
                        >
                          {fase.titulo}
                        </h3>
                      </div>
                      {cert ? (
                        <span
                          className={cn(
                            "flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full",
                            cor.bg, cor.texto
                          )}
                        >
                          <CheckCircle className="w-3 h-3" />
                          Certificado emitido
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-300 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                          Bloqueado
                        </span>
                      )}
                    </div>

                    {/* Detalhes do certificado */}
                    {cert && (
                      <div className="mt-2.5 space-y-1.5">
                        <p className="text-xs font-medium text-gray-600">{cert.titulo_certificado}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatarData(cert.emitido_em || cert.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {cert.carga_horaria}h de carga horária
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Info quando bloqueado */}
                    {!cert && (
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                        Conclua todos os {fase.totalModulos} módulos da fase para desbloquear.
                      </p>
                    )}
                  </div>
                </div>

                {/* Botão imprimir */}
                {cert && (
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <a
                      href={`/certificados/${cert.id}/imprimir`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:opacity-90 hover:-translate-y-0.5",
                        cor.bg, cor.texto
                      )}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Visualizar / Imprimir certificado
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Banner especialista — curso completo */}
      {certificados.length === FASES.length && (
        <div
          className="relative rounded-3xl overflow-hidden p-6 text-center"
          style={{ background: "linear-gradient(135deg, #1D9E75 0%, #7F77DD 50%, #378ADD 100%)" }}
        >
          <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10" />
          <div className="absolute left-8 bottom-[-16px] w-24 h-24 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-5xl mb-3">🏅</p>
            <h2 className="text-xl font-bold text-white mb-1">Especialista em IA para Educação</h2>
            <p className="text-white/80 text-sm mb-5">
              Parabéns! Você completou todas as 5 fases e 80 horas de formação.
            </p>
            <a
              href="/certificados/especial/imprimir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-verde font-bold px-6 py-2.5 rounded-2xl hover:bg-white/90 hover:shadow-lg transition-all text-sm"
            >
              <Award className="w-4 h-4" />
              Baixar certificado de especialista
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
