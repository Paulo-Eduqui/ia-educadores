// Progress — barra de progresso acessível
import { cn } from "@/lib/utils";

interface ProgressProps {
  value?: number;         // 0-100
  className?: string;
  cor?: string;          // classe de cor Tailwind (ex: "bg-verde")
  altura?: string;       // altura (ex: "h-2", "h-3")
  rotulo?: string;       // texto de acessibilidade
}

export function Progress({
  value = 0,
  className,
  cor = "bg-verde",
  altura = "h-2",
  rotulo,
}: ProgressProps) {
  const percentual = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn("w-full bg-gray-100 rounded-full overflow-hidden", altura, className)}
      role="progressbar"
      aria-valuenow={percentual}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={rotulo || `${percentual}%`}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", cor)}
        style={{ width: `${percentual}%` }}
      />
    </div>
  );
}
