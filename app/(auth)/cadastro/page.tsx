"use client";
// Página de cadastro de novos usuários
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Eye, EyeOff, Loader2 } from "lucide-react";
import { criarClienteSupabase } from "@/lib/supabase/client";

// Funções disponíveis no sistema
const FUNCOES = [
  { valor: "professor",    rotulo: "Professor(a)" },
  { valor: "mediador",     rotulo: "Mediador(a) / Assistente" },
  { valor: "secretario",   rotulo: "Secretário(a) Escolar" },
  { valor: "coordenador",  rotulo: "Coordenador(a) Pedagógico(a)" },
  { valor: "gestor",       rotulo: "Gestor(a) / Diretor(a)" },
  { valor: "outro",        rotulo: "Outro" },
];

export default function PaginaCadastro() {
  const router = useRouter();
  const supabase = criarClienteSupabase();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [funcao, setFuncao] = useState("");
  const [escola, setEscola] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  // Realiza o cadastro
  async function fazerCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);

    // Cria a conta no Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          nome,
          funcao,
          escola,
          municipio,
        },
      },
    });

    if (error) {
      setErro(traduzirErroSupabase(error.message));
      setCarregando(false);
      return;
    }

    // Se confirmação de e-mail não é necessária, vai direto ao dashboard
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    // Se precisar confirmar e-mail
    setSucesso(true);
    setCarregando(false);
  }

  // Tela de sucesso após cadastro
  if (sucesso) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-verde-claro to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Cadastro realizado!</h2>
          <p className="text-gray-500 mb-6">
            Enviamos um link de confirmação para{" "}
            <strong className="text-gray-700">{email}</strong>. Acesse seu e-mail para ativar sua conta.
          </p>
          <Link
            href="/login"
            className="inline-block w-full py-3 px-4 bg-verde text-white rounded-xl font-semibold hover:bg-verde/90 transition-all text-center"
          >
            Ir para o login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-verde-claro to-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-verde text-white mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">IA Educadores</h1>
          <p className="text-gray-500 mt-1">Crie sua conta gratuita</p>
        </div>

        {/* Card de cadastro */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={fazerCadastro} className="space-y-4">
            {/* Nome completo */}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1.5">
                Nome completo *
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                required
                autoComplete="name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-verde/30 focus:border-verde text-gray-900 placeholder-gray-400 transition-all"
              />
            </div>

            {/* E-mail */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                E-mail *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-verde/30 focus:border-verde text-gray-900 placeholder-gray-400 transition-all"
              />
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1.5">
                Senha *
              </label>
              <div className="relative">
                <input
                  id="senha"
                  type={verSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  autoComplete="new-password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-verde/30 focus:border-verde text-gray-900 placeholder-gray-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setVerSenha(!verSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={verSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {verSenha ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Função */}
            <div>
              <label htmlFor="funcao" className="block text-sm font-medium text-gray-700 mb-1.5">
                Função *
              </label>
              <select
                id="funcao"
                value={funcao}
                onChange={(e) => setFuncao(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-verde/30 focus:border-verde text-gray-900 bg-white transition-all"
              >
                <option value="" disabled>Selecione sua função</option>
                {FUNCOES.map((f) => (
                  <option key={f.valor} value={f.valor}>{f.rotulo}</option>
                ))}
              </select>
            </div>

            {/* Escola e município em linha */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="escola" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Escola
                </label>
                <input
                  id="escola"
                  type="text"
                  value={escola}
                  onChange={(e) => setEscola(e.target.value)}
                  placeholder="Nome da escola"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-verde/30 focus:border-verde text-gray-900 placeholder-gray-400 transition-all"
                />
              </div>
              <div>
                <label htmlFor="municipio" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Município
                </label>
                <input
                  id="municipio"
                  type="text"
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  placeholder="Sua cidade"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-verde/30 focus:border-verde text-gray-900 placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Mensagem de erro */}
            {erro && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                <p className="text-sm text-red-600">{erro}</p>
              </div>
            )}

            {/* Botão cadastrar */}
            <button
              type="submit"
              disabled={carregando}
              className="w-full py-3 px-4 bg-verde text-white rounded-xl font-semibold hover:bg-verde/90 focus:outline-none focus:ring-2 focus:ring-verde/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-2"
            >
              {carregando && <Loader2 className="w-4 h-4 animate-spin" />}
              {carregando ? "Cadastrando..." : "Criar minha conta"}
            </button>
          </form>

          {/* Link para login */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Já tem conta?{" "}
              <Link href="/login" className="text-verde font-semibold hover:underline">
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
            ← Voltar para a página inicial
          </Link>
        </p>
      </div>
    </div>
  );
}

function traduzirErroSupabase(mensagem: string): string {
  const traducoes: Record<string, string> = {
    "User already registered": "Este e-mail já está cadastrado.",
    "Password is too short": "A senha deve ter pelo menos 6 caracteres.",
    "Invalid email": "E-mail inválido.",
    "Signup is disabled": "Cadastros desabilitados temporariamente.",
    "Email rate limit exceeded": "Muitas tentativas. Aguarde um momento.",
  };
  return traducoes[mensagem] || mensagem;
}
