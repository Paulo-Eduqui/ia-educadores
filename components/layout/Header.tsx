"use client";
// Header — barra superior aprimorada
import { Bell, GraduationCap, Search } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  nomeUsuario?: string;
}

export default function Header({ nomeUsuario = "Educador" }: HeaderProps) {
  const primeiroNome = nomeUsuario.split(" ")[0];
  const iniciais = nomeUsuario
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm shadow-gray-100/50">
      <div className="flex items-center justify-between px-4 lg:px-8 h-14">

        {/* Logo mobile */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl text-white flex-shrink-0"
               style={{ background: "linear-gradient(135deg, #1D9E75, #15735a)" }}>
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="font-bold text-gray-900 text-sm tracking-tight">IA Educadores</span>
        </div>

        {/* Saudação desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-xl">👋</span>
          <div>
            <p className="text-sm text-gray-500 leading-none mb-0.5">Bem-vindo de volta,</p>
            <p className="text-sm font-bold text-gray-900 leading-none">{primeiroNome}</p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-1.5">
          {/* Notificação */}
          <button
            className="relative p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
            aria-label="Notificações"
          >
            <Bell className="w-4.5 h-4.5" />
            {/* Badge */}
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-verde rounded-full" />
          </button>

          {/* Avatar */}
          <Link
            href="/perfil"
            className="flex items-center justify-center w-9 h-9 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-all shadow-sm"
            style={{ background: "linear-gradient(135deg, #1D9E75, #15735a)" }}
            aria-label="Meu perfil"
          >
            {iniciais || primeiroNome.charAt(0).toUpperCase()}
          </Link>
        </div>
      </div>
    </header>
  );
}
