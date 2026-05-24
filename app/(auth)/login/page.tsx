"use client";
// Página de login — visual aprimorado
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { criarClienteSupabase } from "@/lib/supabase/client";

export default function PaginaLogin() {
  const router = useRouter();
  const supabase = criarClienteSupabase();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  async function fazerLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) { setErro(traduzirErroSupabase(error.message)); setCarregando(false); return; }
    router.push("/dashboard");
    router.refresh();
  }

  async function recuperarSenha() {
    if (!email) { setErro("Digite seu e-mail para recuperar a senha."); return; }
    setCarregando(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/nova-senha`,
    });
    setCarregando(false);
    if (error) { setErro(traduzirErroSupabase(error.message)); }
    else { setMensagemSucesso("Enviamos um link de recuperação para o seu e-mail!"); }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
         style={{ background: "linear-gradient(135deg, #e1f5ee 0%, #f0f9ff 50%, #eeedfe 100%)" }}>

      {/* Círculos decorativos de fundo */}
      <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-20"
           style={{ background: "radial-gradient(circle, #1D9E75, transparent)" }} />
      <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full opacity-15"
           style={{ background: "radial-gradient(circle, #378ADD, transparent)" }} />
      <div className="absolute top-1/2 left-[-40px] w-32 h-32 rounded-full opacity-10"
           style={{ background: "radial-gradient(circle, #7F77DD, transparent)" }} />

      <div className="w-full max-w-md relative z-10">

        {/* Logo + header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-5 shadow-lg shadow-verde/20"
               style={{ background: "linear-gradient(135deg, #1D9E75, #15735a)" }}>
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">IA Educadores</h1>
          <p className="text-gray-500 mt-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-verde" />
            Formação em IA para educadores
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-gray-200/80 border border-white p-8">

          <p className="text-lg font-semibold text-gray-800 mb-6">Entre na sua conta</p>

          <form onSubmit={fazerLogin} className="space-y-5">
            {/* E-mail */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1.5">
                E-mail
              </label>
              <input
                id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com" required autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-verde/25 focus:border-verde text-gray-900 placeholder-gray-300 transition-all text-sm"
              />
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-600 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  id="senha" type={verSenha ? "text" : "password"} value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••" required autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-verde/25 focus:border-verde text-gray-900 placeholder-gray-300 transition-all text-sm"
                />
                <button type="button" onClick={() => setVerSenha(!verSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  aria-label={verSenha ? "Ocultar senha" : "Mostrar senha"}>
                  {verSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {erro && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">
                <span className="text-red-400 mt-0.5">⚠️</span>
                <p className="text-sm text-red-600">{erro}</p>
              </div>
            )}

            {/* Sucesso */}
            {mensagemSucesso && (
              <div className="p-3 rounded-xl bg-verde-claro border border-verde/20 flex items-start gap-2">
                <span className="mt-0.5">✅</span>
                <p className="text-sm text-verde font-medium">{mensagemSucesso}</p>
              </div>
            )}

            {/* Botão entrar */}
            <button type="submit" disabled={carregando}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-verde/25 hover:shadow-lg hover:shadow-verde/30 active:scale-[0.98]"
              style={{ background: carregando ? "#1D9E75" : "linear-gradient(135deg, #1D9E75, #1a8d68)" }}>
              {carregando && <Loader2 className="w-4 h-4 animate-spin" />}
              {carregando ? "Entrando..." : "Entrar"}
            </button>

            {/* Esqueci a senha */}
            <button type="button" onClick={recuperarSenha}
              className="w-full text-center text-sm text-verde hover:text-verde/80 hover:underline transition-colors">
              Esqueci minha senha
            </button>
          </form>

          {/* Divisor + cadastro */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Não tem conta?{" "}
              <Link href="/cadastro" className="text-verde font-semibold hover:underline">
                Cadastre-se gratuitamente
              </Link>
            </p>
          </div>
        </div>

        {/* Link home */}
        <p className="text-center mt-5">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Voltar para a página inicial
          </Link>
        </p>
      </div>
    </div>
  );
}

function traduzirErroSupabase(mensagem: string): string {
  const t: Record<string, string> = {
    "Invalid login credentials": "E-mail ou senha incorretos.",
    "Email not confirmed": "Confirme seu e-mail antes de entrar.",
    "User not found": "Usuário não encontrado.",
    "Password is too short": "A senha deve ter pelo menos 6 caracteres.",
    "User already registered": "Este e-mail já está cadastrado.",
    "Email rate limit exceeded": "Muitas tentativas. Aguarde um momento.",
    "Invalid email": "E-mail inválido.",
    "Signup is disabled": "Cadastros desabilitados temporariamente.",
  };
  return t[mensagem] || mensagem;
}
