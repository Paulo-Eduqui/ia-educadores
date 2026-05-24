// Cliente Supabase para uso no navegador (componentes client-side)
import { createBrowserClient } from "@supabase/ssr";

/**
 * Cria e retorna o cliente Supabase para uso em componentes React (client components).
 * Usa as variáveis de ambiente públicas (NEXT_PUBLIC_*).
 */
export function criarClienteSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
