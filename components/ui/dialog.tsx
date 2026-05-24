"use client";
// Dialog — modal simples sem dependências externas
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  aberto: boolean;
  aoFechar: () => void;
  titulo?: string;
  children: React.ReactNode;
  className?: string;
}

export function Dialog({ aberto, aoFechar, titulo, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (aberto) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [aberto]);

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={aoFechar}
        aria-hidden="true"
      />
      {/* Conteúdo */}
      <div
        className={cn(
          "relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md p-6",
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
      >
        {/* Botão fechar */}
        <button
          onClick={aoFechar}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
        {/* Título */}
        {titulo && (
          <h2 className="font-bold text-lg text-gray-900 mb-4 pr-8">{titulo}</h2>
        )}
        {children}
      </div>
    </div>
  );
}

// Componentes auxiliares para compatibilidade
export function DialogContent({ className, children, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("", className)} {...props}>{children}</div>;
}

export function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return <h2 className={cn("font-bold text-lg text-gray-900", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-gray-500 mt-1", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100", className)} {...props} />
  );
}

export function DialogClose({ children, onClick }: { children?: React.ReactNode; onClick?: () => void }) {
  return <button onClick={onClick}>{children}</button>;
}

// Tipos de compatibilidade
export const DialogTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const DialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const DialogOverlay = () => null;
