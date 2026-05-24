"use client";
// Tabs — componente de abas sem dependências externas
import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

// Context para compartilhar a aba ativa
const TabsContext = createContext<{ ativo: string; setAtivo: (v: string) => void }>({
  ativo: "",
  setAtivo: () => {},
});

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ defaultValue = "", value, onValueChange, children, className }: TabsProps) {
  const [abaInterna, setAbaInterna] = useState(defaultValue);
  const abaAtiva = value ?? abaInterna;

  function setAtivo(v: string) {
    setAbaInterna(v);
    onValueChange?.(v);
  }

  return (
    <TabsContext.Provider value={{ ativo: abaAtiva, setAtivo }}>
      <div className={cn("", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center gap-1 bg-gray-100 p-1 rounded-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const { ativo, setAtivo } = useContext(TabsContext);
  const estaAtivo = ativo === value;

  return (
    <button
      role="tab"
      aria-selected={estaAtivo}
      onClick={() => setAtivo(value)}
      className={cn(
        "flex-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150",
        estaAtivo
          ? "bg-white text-gray-900 shadow-sm"
          : "text-gray-500 hover:text-gray-700"
      )}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const { ativo } = useContext(TabsContext);
  if (ativo !== value) return null;

  return (
    <div role="tabpanel" className={cn("mt-4", className)}>
      {children}
    </div>
  );
}
