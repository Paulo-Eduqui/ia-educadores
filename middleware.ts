// Middleware de autenticação — protege as rotas do app
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: req,
  });

  // Cria o cliente Supabase para o middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value)
          );
          response = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Verifica a sessão do usuário
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const caminho = req.nextUrl.pathname;

  // Rotas de autenticação (login/cadastro)
  const ehPaginaAuth =
    caminho.startsWith("/login") || caminho.startsWith("/cadastro");

  // Rotas protegidas (requerem login)
  const ehProtegido =
    caminho.startsWith("/dashboard") ||
    caminho.startsWith("/modulos") ||
    caminho.startsWith("/prompts") ||
    caminho.startsWith("/ferramentas") ||
    caminho.startsWith("/comunidade") ||
    caminho.startsWith("/certificados") ||
    caminho.startsWith("/perfil");

  // Se não está logado e tenta acessar rota protegida → redireciona para login
  if (ehProtegido && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Se já está logado e tenta acessar login/cadastro → redireciona para dashboard
  if (ehPaginaAuth && user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return response;
}

// Configuração das rotas que o middleware deve processar
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icons|manifest.json|screenshots|sw.js|workbox-*.js).*)",
  ],
};
