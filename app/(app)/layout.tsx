// Layout principal do app — envolve todas as páginas autenticadas
import { redirect } from "next/navigation";
import { criarClienteSupabaseServidor } from "@/lib/supabase/server";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verifica a sessão no servidor
  const supabase = await criarClienteSupabaseServidor();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Se não está autenticado, redireciona para o login
  if (!user) {
    redirect("/login");
  }

  // Busca os dados do perfil do usuário
  const { data: perfil } = await supabase
    .from("perfis")
    .select("nome")
    .eq("id", user.id)
    .single();

  const nomeUsuario = perfil?.nome || user.email || "Educador";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar — visível apenas em desktop (lg+) */}
      <Sidebar />

      {/* Área principal de conteúdo */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header com saudação */}
        <Header nomeUsuario={nomeUsuario} />

        {/* Conteúdo da página */}
        <main className="flex-1 px-4 py-6 pb-24 lg:pb-6 lg:px-8 max-w-5xl">
          {children}
        </main>
      </div>

      {/* Bottom nav — visível apenas em mobile */}
      <BottomNav />
    </div>
  );
}
