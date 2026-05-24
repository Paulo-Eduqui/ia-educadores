// API Route — Salvar resultado de quiz
import { NextRequest, NextResponse } from "next/server";
import { criarClienteSupabaseServidor } from "@/lib/supabase/server";
import { buscarModuloPorSlug } from "@/lib/content/modulosData";

// GET /api/quiz?modulo=slug — busca resultado anterior do quiz
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
    .from("quiz_resultados")
    .select("*")
    .eq("usuario_id", user.id)
    .eq("modulo_slug", moduloSlug)
    .order("feito_em", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  return NextResponse.json({ resultado: data || null });
}

// POST /api/quiz — salva resultado do quiz
export async function POST(req: NextRequest) {
  const supabase = await criarClienteSupabaseServidor();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const corpo = await req.json();
  const { moduloSlug, pontuacao, totalQuestoes, acertos, aprovado } = corpo;

  if (!moduloSlug || pontuacao === undefined || !totalQuestoes) {
    return NextResponse.json({ erro: "Campos obrigatórios: moduloSlug, pontuacao, totalQuestoes" }, { status: 400 });
  }

  // Valida módulo
  const modulo = buscarModuloPorSlug(moduloSlug);
  if (!modulo) {
    return NextResponse.json({ erro: "Módulo não encontrado" }, { status: 404 });
  }

  // Salva resultado — aprovado é GENERATED no banco, não inserir manualmente
  const { data, error } = await supabase
    .from("quiz_resultados")
    .insert({
      usuario_id: user.id,
      modulo_slug: moduloSlug,
      pontuacao: Math.min(100, Math.max(0, pontuacao)),
      total_questoes: totalQuestoes,
      acertos: acertos ?? 0,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  // Se aprovado, atualiza progresso do módulo automaticamente
  if (aprovado) {
    await supabase
      .from("progresso")
      .upsert(
        {
          usuario_id: user.id,
          modulo_slug: moduloSlug,
          fase: modulo.fase,
          percentual: 100,
          concluido: true,
          concluido_em: new Date().toISOString(),
        },
        { onConflict: "usuario_id,modulo_slug" }
      );
  }

  return NextResponse.json({ resultado: data, sucesso: true });
}
