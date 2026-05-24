// Componente Button — compatível com Tailwind 3
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const varianteClasses: Record<string, string> = {
  default:     "bg-verde text-white hover:bg-verde/90 shadow-sm",
  outline:     "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900",
  ghost:       "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  link:        "text-verde underline-offset-4 hover:underline p-0 h-auto",
  destructive: "bg-vermelho text-white hover:bg-vermelho/90 shadow-sm",
  secondary:   "bg-gray-100 text-gray-700 hover:bg-gray-200",
};

const tamanhoClasses: Record<string, string> = {
  default: "h-10 px-4 py-2 text-sm",
  sm:      "h-8 px-3 py-1.5 text-xs",
  lg:      "h-12 px-6 py-3 text-base",
  icon:    "h-10 w-10 p-0",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
          "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde/30",
          "disabled:opacity-50 disabled:pointer-events-none",
          "[&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0",
          varianteClasses[variant],
          tamanhoClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
