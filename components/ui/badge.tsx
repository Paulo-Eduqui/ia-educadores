// Badge — componente de etiqueta/tag
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const varianteClasses: Record<BadgeVariant, string> = {
  default:     "bg-verde text-white",
  secondary:   "bg-gray-100 text-gray-600",
  destructive: "bg-red-50 text-vermelho border border-vermelho/20",
  outline:     "border border-gray-200 text-gray-600 bg-transparent",
  success:     "bg-verde-claro text-verde",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        varianteClasses[variant],
        className
      )}
      {...props}
    />
  );
}
