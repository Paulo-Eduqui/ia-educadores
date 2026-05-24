// BlocoDestaque — caixa colorida para destacar conteúdo importante
import { Info, AlertTriangle, AlertCircle, CheckCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type TipoBloco = "dica" | "atencao" | "cuidado" | "info" | "exemplo";

interface BlocoDestaqueProps {
  tipo: TipoBloco;
  titulo?: string;
  children: React.ReactNode;
  className?: string;
}

// Configuração visual por tipo
const CONFIG: Record<TipoBloco, {
  bg: string;
  border: string;
  titulo: string;
  textoCor: string;
  iconeCor: string;
  Icone: React.ElementType;
}> = {
  dica: {
    bg: "bg-verde-claro",
    border: "border-verde/30",
    titulo: "💡 Dica",
    textoCor: "text-gray-700",
    iconeCor: "text-verde",
    Icone: Lightbulb,
  },
  atencao: {
    bg: "bg-laranja-claro",
    border: "border-laranja/30",
    titulo: "⚠️ Atenção",
    textoCor: "text-gray-700",
    iconeCor: "text-laranja",
    Icone: AlertTriangle,
  },
  cuidado: {
    bg: "bg-red-50",
    border: "border-vermelho/30",
    titulo: "🚨 Cuidado",
    textoCor: "text-gray-700",
    iconeCor: "text-vermelho",
    Icone: AlertCircle,
  },
  info: {
    bg: "bg-azul-claro",
    border: "border-azul/30",
    titulo: "ℹ️ Saiba mais",
    textoCor: "text-gray-700",
    iconeCor: "text-azul",
    Icone: Info,
  },
  exemplo: {
    bg: "bg-roxo-claro",
    border: "border-roxo/30",
    titulo: "📌 Exemplo prático",
    textoCor: "text-gray-700",
    iconeCor: "text-roxo",
    Icone: CheckCircle,
  },
};

export default function BlocoDestaque({ tipo, titulo, children, className }: BlocoDestaqueProps) {
  const cfg = CONFIG[tipo];

  return (
    <div
      className={cn(
        "rounded-xl border p-4 my-4",
        cfg.bg,
        cfg.border,
        className
      )}
      role="note"
      aria-label={titulo || cfg.titulo}
    >
      {/* Cabeçalho */}
      <p className={cn("font-semibold text-sm mb-2", cfg.iconeCor)}>
        {titulo || cfg.titulo}
      </p>

      {/* Conteúdo */}
      <div className={cn("text-sm leading-relaxed", cfg.textoCor)}>
        {children}
      </div>
    </div>
  );
}
