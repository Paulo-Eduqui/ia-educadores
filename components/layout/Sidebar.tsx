"use client";
// Sidebar — navegação lateral aprimorada
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Lightbulb,
  Wrench,
  Users,
  User,
  GraduationCap,
  Award,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { criarClienteSupabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const itensNavegacao = [
  { href: "/dashboard",    rotulo: "Dashboard",    icone: LayoutDashboard, cor: "text-verde",   bg: "bg-verde-claro" },
  { href: "/modulos",      rotulo: "Módulos",      icone: BookOpen,        cor: "text-azul",    bg: "bg-azul-claro" },
  { href: "/prompts",      rotulo: "Prompts",      icone: Lightbulb,       cor: "text-laranja", bg: "bg-laranja-claro" },
  { href: "/ferramentas",  rotulo: "Ferramentas",  icone: Wrench,          cor: "text-roxo",    bg: "bg-roxo-claro" },
  { href: "/comunidade",   rotulo: "Comunidade",   icone: Users,           cor: "text-azul",    bg: "bg-azul-claro" },
  { href: "/certificados", rotulo: "Certificados", icone: Award,           cor: "text-laranja", bg: "bg-laranja-claro" },
  { href: "/perfil",       rotulo: "Meu Perfil",   icone: User,            cor: "text-verde",   bg: "bg-verde-claro" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = criarClienteSupabase();

  async function sair() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 fixed left-0 top-0 z-30">

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
        <div className="flex items-center justify-center w-10 h-10 rounded-2xl shadow-md shadow-verde/20 flex-shrink-0"
             style={{ background: "linear-gradient(135deg, #1D9E75, #15735a)" }}>
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 leading-tight text-sm">IA Educadores</p>
          <p className="text-xs text-gray-400 mt-0.5">Plataforma de Formação</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">
          Menu principal
        </p>
        {itensNavegacao.map((item) => {
          const Icone = item.icone;
          const ativo = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                ativo
                  ? "bg-verde-claro text-verde shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              )}
            >
              <div className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
                ativo ? `${item.bg} ${item.cor}` : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
              )}>
                <Icone className="w-3.5 h-3.5" />
              </div>
              <span className={ativo ? "font-semibold" : ""}>{item.rotulo}</span>
              {ativo && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-verde" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Rodapé — sair */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={sair}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-150 w-full group"
        >
          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-red-100 transition-all">
            <LogOut className="w-3.5 h-3.5" />
          </div>
          Sair da conta
        </button>
      </div>
    </aside>
  );
}
