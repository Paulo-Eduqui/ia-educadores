"use client";
// Sheet — painel lateral deslizante sem dependências externas
import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  aberto: boolean;
  aoFechar: () => void;
  lado?: "esquerda" | "direita";
  children: React.ReactNode;
  className?: string;
}

export function Sheet({ aberto, aoFechar, lado = "direita", children, className }: SheetProps) {
  // Trava o scroll quando aberto
  useEffect(() => {
    if (aberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [aberto]);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={aoFechar}
        aria-hidden="true"
      />
      {/* Painel */}
      <div
        className={cn(
          "absolute top-0 bottom-0 w-80 bg-white shadow-xl flex flex-col",
          lado === "direita" ? "right-0" : "left-0",
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Botão fechar */}
        <button
          onClick={aoFechar}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Fechar painel"
        >
          <X className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );
}

// Subcomponentes para compatibilidade de API
export function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-6 pb-4 border-b border-gray-100", className)} {...props} />;
}

export function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("font-bold text-lg text-gray-900 pr-8", className)} {...props} />;
}

export function SheetDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-gray-500 mt-1", className)} {...props} />;
}

export function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-6 pt-4 border-t border-gray-100 mt-auto", className)} {...props} />;
}

export function SheetContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex-1 overflow-y-auto p-6", className)}>{children}</div>;
}

// Stubs para compatibilidade
export const SheetTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SheetClose = ({ children }: { children: React.ReactNode }) => <>{children}</>;
