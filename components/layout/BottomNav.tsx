"use client";
// BottomNav — navegação inferior mobile aprimorada
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Lightbulb,
  Award,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const itensNavMobile = [
  { href: "/dashboard",    rotulo: "Início",    icone: LayoutDashboard },
  { href: "/modulos",      rotulo: "Módulos",   icone: BookOpen },
  { href: "/prompts",      rotulo: "Prompts",   icone: Lightbulb },
  { href: "/certificados", rotulo: "Certs",     icone: Award },
  { href: "/perfil",       rotulo: "Perfil",    icone: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg shadow-gray-200/50"
      aria-label="Navegação principal mobile"
    >
      <div className="flex items-center justify-around px-1 py-2">
        {itensNavMobile.map((item) => {
          const Icone = item.icone;
          const ativo = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-150 min-w-[52px]",
                ativo ? "text-verde" : "text-gray-400"
              )}
              aria-label={item.rotulo}
              aria-current={ativo ? "page" : undefined}
            >
              <div className={cn(
                "w-10 h-8 rounded-xl flex items-center justify-center transition-all",
                ativo ? "bg-verde-claro" : "bg-transparent"
              )}>
                <Icone className={cn("w-5 h-5", ativo ? "text-verde" : "text-gray-400")} />
              </div>
              <span className={cn("text-[10px] font-medium leading-none", ativo ? "text-verde font-semibold" : "text-gray-400")}>
                {item.rotulo}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
