// API Route — Anotações por módulo
import { NextRequest, NextResponse } from "next/server";
import { criarClienteSupabaseServidor } from "@/lib/supabase/server";

// GET /api/anotacoes?modulo=slug — busca anotação do módulo
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
    .from("anotacoes")
    .select("*")
    .eq("usuario_id", user.id)
    .eq("modulo_slug", moduloSlug)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  return NextResponse.json({ anotacao: data || null });
}

// POST /api/anotacoes — cria ou atualiza anotação
export async function POST(req: NextRequest) {
  const supabase = await criarClienteSupabaseServidor();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const corpo = await req.json();
  const { moduloSlug, conteudo } = corpo;

  if (!moduloSlug) {
    return NextResponse.json({ erro: "Campo 'moduloSlug' obrigatório" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("anotacoes")
    .upsert(
      {
        usuario_id: user.id,
        modulo_slug: moduloSlug,
        conteudo: conteudo ?? "",
        atualizado_em: new Date().toISOString(),
      },
      { onConflict: "usuario_id,modulo_slug" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  return NextResponse.json({ anotacao: data, sucesso: true });
}

// DELETE /api/anotacoes?modulo=slug — apaga anotação
export async function DELETE(req: NextRequest) {
  const supabase = await criarClienteSupabaseServidor();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const moduloSlug = req.nextUrl.searchParams.get("modulo");
  if (!moduloSlug) {
    return NextResponse.json({ erro: "Parâmetro 'modulo' obrigatório" }, { status: 400 });
  }

  const { error } = await supabase
    .from("anotacoes")
    .delete()
    .eq("usuario_id", user.id)
    .eq("modulo_slug", moduloSlug);

  if (error) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  return NextResponse.json({ sucesso: true });
}
