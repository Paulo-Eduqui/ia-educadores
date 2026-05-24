// Card — componente de cartão simples
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-white rounded-2xl border border-gray-100 overflow-hidden", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-5 pt-5 pb-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3 className={cn("font-semibold text-gray-900 text-base", className)} {...props} />
  );
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-gray-500 mt-1", className)} {...props} />
  );
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-5 pb-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-5 py-3 border-t border-gray-50 bg-gray-50/50 flex items-center gap-3", className)}
      {...props}
    />
  );
}

// Compatibilidade
export const CardAction = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("ml-auto", className)} {...props} />
);
