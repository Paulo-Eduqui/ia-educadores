"use client";
// Catálogo de ferramentas de IA para educadores — visual aprimorado + filtro interativo
import { useState, useMemo } from "react";
import { ExternalLink, Star, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

type CategoriaFerramenta = "Chat/Texto" | "Imagem" | "Apresentação" | "Áudio/Vídeo" | "Produtividade" | "Educação";

interface Ferramenta {
  id: number;
  nome: string;
  descricao: string;
  categoria: CategoriaFerramenta;
  url: string;
  gratis: boolean;
  nivel: "Básico" | "Intermediário" | "Avançado";
  destaque: boolean;
  usoCases: string[];
  emoji: string;
}

const FERRAMENTAS: Ferramenta[] = [
  // Chat / Texto
  {
    id: 1, nome: "ChatGPT", emoji: "🤖",
    descricao: "O assistente de IA mais popular do mundo. Excelente para criar textos, responder perguntas e auxiliar no planejamento de aulas.",
    categoria: "Chat/Texto", url: "https://chat.openai.com", gratis: true, nivel: "Básico", destaque: true,
    usoCases: ["Planos de aula", "Correção de texto", "Explicação de conteúdo", "Criação de atividades"],
  },
  {
    id: 2, nome: "Gemini (Google)", emoji: "✨",
    descricao: "IA do Google integrada ao Google Workspace. Funciona diretamente no Gmail, Docs, Sheets e Classroom.",
    categoria: "Chat/Texto", url: "https://gemini.google.com", gratis: true, nivel: "Básico", destaque: true,
    usoCases: ["Google Docs", "Resumos", "Pesquisa", "Gmail"],
  },
  {
    id: 3, nome: "Claude (Anthropic)", emoji: "🎯",
    descricao: "IA conhecida pela escrita de alta qualidade e raciocínio aprofundado. Ótima para textos longos e análises.",
    categoria: "Chat/Texto", url: "https://claude.ai", gratis: true, nivel: "Básico", destaque: false,
    usoCases: ["Textos longos", "Análise crítica", "Projetos pedagógicos", "Relatórios"],
  },
  {
    id: 4, nome: "Microsoft Copilot", emoji: "💼",
    descricao: "IA da Microsoft integrada ao Word, Excel, PowerPoint e Teams. Disponível para quem usa Microsoft 365.",
    categoria: "Chat/Texto", url: "https://copilot.microsoft.com", gratis: true, nivel: "Básico", destaque: false,
    usoCases: ["Word", "Excel", "PowerPoint", "Documentos escolares"],
  },
  // Imagem
  {
    id: 5, nome: "Canva IA", emoji: "🎨",
    descricao: "O Canva com superpoderes de IA. Crie apresentações, banners, infográficos e materiais didáticos com facilidade.",
    categoria: "Imagem", url: "https://canva.com", gratis: true, nivel: "Básico", destaque: true,
    usoCases: ["Apresentações", "Cartazes", "Infográficos", "Material didático"],
  },
  {
    id: 6, nome: "DALL-E 3", emoji: "🖼️",
    descricao: "Geração de imagens com IA pela OpenAI. Disponível no ChatGPT Plus. Ideal para criar ilustrações para aulas.",
    categoria: "Imagem", url: "https://chat.openai.com", gratis: false, nivel: "Intermediário", destaque: false,
    usoCases: ["Ilustrações", "Personagens", "Cenários históricos", "Material visual"],
  },
  // Apresentação
  {
    id: 7, nome: "Gamma.app", emoji: "📊",
    descricao: "Cria apresentações profissionais a partir de um texto. Você descreve o tema e a IA cria os slides automaticamente.",
    categoria: "Apresentação", url: "https://gamma.app", gratis: true, nivel: "Básico", destaque: true,
    usoCases: ["Slides de aula", "Apresentações para pais", "Treinamentos"],
  },
  {
    id: 8, nome: "Beautiful.ai", emoji: "✏️",
    descricao: "Templates inteligentes de apresentação que se adaptam automaticamente ao seu conteúdo.",
    categoria: "Apresentação", url: "https://beautiful.ai", gratis: false, nivel: "Básico", destaque: false,
    usoCases: ["Apresentações profissionais", "Relatórios visuais"],
  },
  // Áudio e Vídeo
  {
    id: 9, nome: "ElevenLabs", emoji: "🎙️",
    descricao: "Transforma texto em áudio com vozes realistas em português. Ideal para criar material acessível para alunos.",
    categoria: "Áudio/Vídeo", url: "https://elevenlabs.io", gratis: true, nivel: "Intermediário", destaque: false,
    usoCases: ["Audiolivros", "Aulas em áudio", "Acessibilidade", "Narração"],
  },
  {
    id: 10, nome: "Descript", emoji: "🎬",
    descricao: "Edita vídeos e podcasts editando o texto da transcrição. Perfeito para criar vídeoaulas.",
    categoria: "Áudio/Vídeo", url: "https://descript.com", gratis: true, nivel: "Intermediário", destaque: false,
    usoCases: ["Videoaulas", "Podcasts educativos", "Transcrições"],
  },
  // Produtividade
  {
    id: 11, nome: "NotebookLM", emoji: "📓",
    descricao: "IA do Google que aprende com seus documentos. Cole PDFs e faça perguntas sobre o conteúdo — incrível para estudar!",
    categoria: "Produtividade", url: "https://notebooklm.google.com", gratis: true, nivel: "Básico", destaque: true,
    usoCases: ["Estudo de documentos", "Análise de currículos", "Resumos automáticos", "Pesquisa"],
  },
  {
    id: 12, nome: "Perplexity AI", emoji: "🔍",
    descricao: "Motor de busca com IA que fornece respostas com fontes citadas. Excelente para pesquisa acadêmica.",
    categoria: "Produtividade", url: "https://perplexity.ai", gratis: true, nivel: "Básico", destaque: false,
    usoCases: ["Pesquisa com fontes", "Atualização profissional", "Fact-checking"],
  },
  // Educação
  {
    id: 13, nome: "MagicSchool AI", emoji: "🏫",
    descricao: "Plataforma de IA feita especialmente para educadores. Cria planos de aula, rubricas, e-mails e muito mais.",
    categoria: "Educação", url: "https://magicschool.ai", gratis: true, nivel: "Básico", destaque: true,
    usoCases: ["Planos de aula", "Rubricas", "IEP", "Comunicação com pais"],
  },
  {
    id: 14, nome: "Curipod", emoji: "🎮",
    descricao: "Cria aulas interativas com IA que engajam os alunos com polls, word clouds e atividades em tempo real.",
    categoria: "Educação", url: "https://curipod.com", gratis: true, nivel: "Básico", destaque: false,
    usoCases: ["Aulas interativas", "Engajamento", "Formativo", "Dinâmicas"],
  },
  {
    id: 15, nome: "Quizgecko", emoji: "❓",
    descricao: "Gera quizzes automaticamente a partir de qualquer texto, PDF ou URL. Ótimo para criar avaliações rápidas.",
    categoria: "Educação", url: "https://quizgecko.com", gratis: true, nivel: "Básico", destaque: false,
    usoCases: ["Quizzes", "Avaliações", "Revisão", "Engajamento"],
  },
];

const TODAS_CATEGORIAS = ["Todas", "Chat/Texto", "Imagem", "Apresentação", "Áudio/Vídeo", "Produtividade", "Educação"];

const CAT_ICON: Record<string, string> = {
  "Todas":        "🔍",
  "Chat/Texto":   "💬",
  "Imagem":        "🎨",
  "Apresentação":  "📊",
  "Áudio/Vídeo":  "🎬",
  "Produtividade": "⚡",
  "Educação":      "🏫",
};

const CORES_CATEGORIA: Record<CategoriaFerramenta, string> = {
  "Chat/Texto":    "bg-verde-claro text-verde",
  "Imagem":         "bg-roxo-claro text-roxo",
  "Apresentação":   "bg-azul-claro text-azul",
  "Áudio/Vídeo":   "bg-laranja-claro text-laranja",
  "Produtividade":  "bg-gray-100 text-gray-600",
  "Educação":       "bg-vermelho-claro text-vermelho",
};

// ── Componente principal ─────────────────────────────────────────────────────
export default function PaginaFerramentas() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");

  const ferramentasFiltradas = useMemo(
    () =>
      categoriaAtiva === "Todas"
        ? FERRAMENTAS
        : FERRAMENTAS.filter((f) => f.categoria === categoriaAtiva),
    [categoriaAtiva]
  );

  const destaques = ferramentasFiltradas.filter((f) => f.destaque);
  const restantes = ferramentasFiltradas.filter((f) => !f.destaque);
  const totalGratis = FERRAMENTAS.filter((f) => f.gratis).length;

  return (
    <div className="space-y-6 fade-in">

      {/* Banner de cabeçalho */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1D9E75 0%, #378ADD 100%)" }}
      >
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute right-16 bottom-[-20px] w-24 h-24 rounded-full bg-white/5" />
        <div className="relative px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Ferramentas de IA</h1>
              <p className="text-white/75 text-sm mt-0.5">
                {FERRAMENTAS.length} ferramentas · {totalGratis} gratuitas · testadas para educadores
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 text-right hidden sm:block">
            <div className="text-3xl font-black text-white/20 leading-none">{FERRAMENTAS.length}</div>
            <div className="text-white/60 text-xs">ferramentas</div>
          </div>
        </div>
      </div>

      {/* Filtro de categoria */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm shadow-gray-100/50">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-0.5">
          {TODAS_CATEGORIAS.map((cat) => {
            const ativo = categoriaAtiva === cat;
            const count =
              cat === "Todas"
                ? FERRAMENTAS.length
                : FERRAMENTAS.filter((f) => f.categoria === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-1.5 pl-2.5 pr-2.5 py-1.5 rounded-full text-xs font-medium transition-all",
                  ativo
                    ? "bg-verde text-white shadow-sm shadow-verde/30"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
                )}
              >
                <span className="text-sm leading-none">{CAT_ICON[cat]}</span>
                <span>{cat}</span>
                <span
                  className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none",
                    ativo ? "bg-white/25 text-white" : "bg-gray-200 text-gray-500"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Seção de destaques */}
      {destaques.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <Star className="w-4 h-4 text-laranja fill-laranja" />
            {categoriaAtiva === "Todas" ? "Destaques — comece por aqui" : "Destaques"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {destaques.map((f) => (
              <CartaoFerramenta key={f.id} ferramenta={f} destaque />
            ))}
          </div>
        </div>
      )}

      {/* Mais opções */}
      {restantes.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-900 mb-3 text-sm">
            {destaques.length > 0 ? "Mais opções" : "Todas as ferramentas"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {restantes.map((f) => (
              <CartaoFerramenta key={f.id} ferramenta={f} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Cartão de ferramenta ─────────────────────────────────────────────────────
function CartaoFerramenta({
  ferramenta: f,
  destaque = false,
}: {
  ferramenta: Ferramenta;
  destaque?: boolean;
}) {
  const corCategoria = CORES_CATEGORIA[f.categoria];

  return (
    <div
      className={cn(
        "bg-white rounded-2xl border p-4 group transition-all duration-200",
        "hover:shadow-lg hover:shadow-gray-100/80 hover:-translate-y-0.5",
        destaque
          ? "border-verde/25 shadow-sm shadow-verde/5"
          : "border-gray-100"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl leading-none">{f.emoji}</span>
          <div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">{f.nome}</h3>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", corCategoria)}>
              {f.categoria}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={cn(
              "text-[10px] px-2 py-0.5 rounded-full font-bold",
              f.gratis ? "bg-verde-claro text-verde" : "bg-laranja-claro text-laranja"
            )}
          >
            {f.gratis ? "Grátis" : "Pago"}
          </span>
          {destaque && <Star className="w-3.5 h-3.5 text-laranja fill-laranja" />}
        </div>
      </div>

      {/* Descrição */}
      <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">{f.descricao}</p>

      {/* Casos de uso */}
      <div className="flex flex-wrap gap-1 mb-4">
        {f.usoCases.slice(0, 3).map((uc) => (
          <span
            key={uc}
            className="text-[10px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100"
          >
            {uc}
          </span>
        ))}
      </div>

      {/* Link externo */}
      <a
        href={f.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-verde hover:text-verde/80 transition-all group-hover:gap-2"
      >
        Acessar ferramenta
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
