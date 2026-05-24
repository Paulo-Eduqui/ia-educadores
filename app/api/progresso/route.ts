// API Route — Salvar e atualizar progresso do módulo
import { NextRequest, NextResponse } from "next/server";
import { criarClienteSupabaseServidor } from "@/lib/supabase/server";
import { buscarModuloPorSlug } from "@/lib/content/modulosData";

// GET /api/progresso?modulo=slug — busca progresso de um módulo
export async function GET(req: NextRequest) {
  const supabase = await criarClienteSupabaseServidor();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const moduloSlug = req.nextUrl.searchParams.get("modulo");
  if (!moduloSlug) {
    return NextResponse.json({ erro: "Parâmetro 'modulo' obrigatório" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("progresso")
    .select("*")
    .eq("usuario_id", user.id)
    .eq("modulo_slug", moduloSlug)
    .single();

  if (error && error.code !== "PGRST116") { // PGRST116 = not found
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  return NextResponse.json({ progresso: data || null });
}

// POST /api/progresso — cria ou atualiza progresso
export async function POST(req: NextRequest) {
  const supabase = await criarClienteSupabaseServidor();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const corpo = await req.json();
  const { moduloSlug, percentual, concluido } = corpo;

  if (!moduloSlug) {
    return NextResponse.json({ erro: "Campo 'moduloSlug' obrigatório" }, { status: 400 });
  }

  // Valida se o módulo existe
  const modulo = buscarModuloPorSlug(moduloSlug);
  if (!modulo) {
    return NextResponse.json({ erro: "Módulo não encontrado" }, { status: 404 });
  }

  // Upsert do progresso (cria ou atualiza)
  const dadosProgresso = {
    usuario_id: user.id,
    modulo_slug: moduloSlug,
    fase: modulo.fase,
    percentual: Math.min(100, Math.max(0, percentual ?? 0)),
    concluido: concluido ?? false,
    concluido_em: concluido ? new Date().toISOString() : null,
  };

  const { data, error } = await supabase
    .from("progresso")
    .upsert(dadosProgresso, { onConflict: "usuario_id,modulo_slug" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  // Se concluiu o módulo, verifica se deve emitir certificado da fase
  if (concluido) {
    await verificarEmissaoCertificado(supabase, user.id, modulo.fase);
  }

  return NextResponse.json({ progresso: data, sucesso: true });
}

// Verifica e emite certificado se a fase foi concluída
async function verificarEmissaoCertificado(
  supabase: Awaited<ReturnType<typeof criarClienteSupabaseServidor>>,
  userId: string,
  fase: number
) {
  // Importa dados dos módulos
  const { MODULOS, FASES } = await import("@/lib/content/modulosData");

  const modulosDaFase = MODULOS.filter((m) => m.fase === fase);

  // Busca todos os módulos concluídos pelo usuário nessa fase
  const { data: progressos } = await supabase
    .from("progresso")
    .select("modulo_slug, concluido")
    .eq("usuario_id", userId)
    .eq("fase", fase)
    .eq("concluido", true);

  const concluidosDaFase = progressos?.map((p) => p.modulo_slug) || [];
  const todosConcluidos = modulosDaFase.every((m) =>
    concluidosDaFase.includes(m.slug)
  );

  if (!todosConcluidos) return;

  // Verifica se o certificado já foi emitido
  const { data: certExistente } = await supabase
    .from("certificados")
    .select("id")
    .eq("usuario_id", userId)
    .eq("fase", fase)
    .single();

  if (certExistente) return; // Já emitido

  // Emite o certificado
  const faseDados = FASES.find((f) => f.numero === fase);
  const titulosCertificado: Record<number, string> = {
    1: "Certificado de Conclusão — Fase 1: Fundamentos de IA",
    2: "Certificado de Conclusão — Fase 2: Prompts para Educadores",
    3: "Certificado de Conclusão — Fase 3: Aplicações na Educação",
    4: "Certificado de Conclusão — Fase 4: Integração Avançada",
    5: "Certificado de Especialista em IA para Educação",
  };

  await supabase.from("certificados").insert({
    usuario_id: userId,
    fase,
    titulo_certificado: titulosCertificado[fase] || `Certificado Fase ${fase}`,
    carga_horaria: faseDados?.cargaHoraria || 0,
  });
}
