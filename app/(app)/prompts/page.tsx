"use client";
// Biblioteca de prompts educacionais — visual aprimorado
import { useState, useMemo } from "react";
import { Search, Lightbulb, X } from "lucide-react";
import PromptCopiavel from "@/components/prompts/PromptCopiavel";
import { cn } from "@/lib/utils";

// ── Dados da biblioteca de prompts ──────────────────────────────────────────
const PROMPTS_BIBLIOTECA = [
  // Planejamento de Aulas
  {
    id: 1, categoria: "Planejamento de Aulas", tags: ["plano", "aula", "BNCC"],
    titulo: "Plano de Aula Completo",
    conteudo: `Crie um plano de aula completo para [DISCIPLINA], [SÉRIE/ANO], sobre o tema "[TEMA]".

Inclua:
- Objetivo geral e específicos
- Competências e habilidades da BNCC
- Duração: [TEMPO]
- Materiais necessários
- Desenvolvimento (introdução, desenvolvimento, conclusão)
- Avaliação
- Referências

Adapte para alunos do [CONTEXTO DA TURMA].`,
  },
  {
    id: 2, categoria: "Planejamento de Aulas", tags: ["sequência", "atividades"],
    titulo: "Sequência Didática",
    conteudo: `Crie uma sequência didática com [NÚMERO] aulas sobre "[TEMA]" para [SÉRIE].

Para cada aula, inclua:
- Título e objetivo
- Materiais
- Atividade principal
- Avaliação da aprendizagem
- Tempo estimado

Perfil da turma: [DESCREVA A TURMA]`,
  },
  // Avaliações
  {
    id: 3, categoria: "Avaliações", tags: ["prova", "questões", "gabarito"],
    titulo: "Criação de Avaliação com Gabarito",
    conteudo: `Crie uma avaliação sobre "[TEMA]" para [SÉRIE/DISCIPLINA] com:
- [NÚMERO] questões objetivas (múltipla escolha)
- [NÚMERO] questões dissertativas
- Gabarito completo
- Critérios de correção

Nível de dificuldade: [BÁSICO/MÉDIO/DIFÍCIL]
Duração da prova: [TEMPO]`,
  },
  {
    id: 4, categoria: "Avaliações", tags: ["feedback", "correção", "personalizado"],
    titulo: "Feedback Personalizado para Aluno",
    conteudo: `Analise a resposta do aluno abaixo e forneça um feedback construtivo e encorajador:

Atividade proposta: [DESCREVA A ATIVIDADE]
Resposta do aluno: [COLE A RESPOSTA]
Nível esperado: [SÉRIE/NÍVEL]

Forneça:
- Pontos positivos
- O que pode melhorar (de forma gentil)
- Sugestões práticas de estudo
- Palavras de encorajamento`,
  },
  // Comunicação escolar
  {
    id: 5, categoria: "Comunicação Escolar", tags: ["circular", "comunicado", "pais"],
    titulo: "Circular para Pais e Responsáveis",
    conteudo: `Redigir uma circular/comunicado para pais e responsáveis sobre:
[ASSUNTO DO COMUNICADO]

Tom: Cordial e profissional
Escola: [NOME DA ESCOLA]
Data do evento/prazo: [DATA]

Inclua:
- Cabeçalho formal
- Corpo do comunicado claro e objetivo
- Informações de contato
- Local para assinatura dos pais`,
  },
  {
    id: 6, categoria: "Comunicação Escolar", tags: ["ata", "reunião"],
    titulo: "Ata de Reunião Pedagógica",
    conteudo: `Crie uma ata de reunião pedagógica com base nas informações abaixo:

Data: [DATA]
Local: [LOCAL]
Presentes: [LISTE OS PARTICIPANTES]
Pauta da reunião:
1. [ITEM 1]
2. [ITEM 2]
3. [ITEM 3]

Encaminhamentos discutidos: [LISTE OS ENCAMINHAMENTOS]`,
  },
  // Adaptações
  {
    id: 7, categoria: "Adaptação e Inclusão", tags: ["TEA", "inclusão", "adaptação"],
    titulo: "Adaptar Atividade para Aluno com TEA",
    conteudo: `Adapte a seguinte atividade para um aluno com Transtorno do Espectro Autista (TEA):

Atividade original: [DESCREVA A ATIVIDADE]
Características do aluno: [DESCREVA AS NECESSIDADES]

Adapte considerando:
- Instruções claras e objetivas
- Suporte visual (descreva como criar)
- Redução de estímulos distratores
- Possibilidade de pausas
- Formas alternativas de resposta`,
  },
  {
    id: 8, categoria: "Adaptação e Inclusão", tags: ["reforço", "dificuldade", "aprendizagem"],
    titulo: "Atividade de Reforço Personalizada",
    conteudo: `Crie uma atividade de reforço escolar para um aluno com dificuldade em [CONTEÚDO/DISCIPLINA].

Série: [SÉRIE]
Dificuldades observadas: [DESCREVA AS DIFICULDADES]
Pontos fortes do aluno: [DESCREVA OS PONTOS FORTES]

Elabore:
- 3 atividades progressivas (do mais fácil para o mais difícil)
- Linguagem simples e acessível
- Exemplos práticos do dia a dia`,
  },
  // Gestão
  {
    id: 9, categoria: "Gestão e Documentação", tags: ["relatório", "desempenho"],
    titulo: "Relatório de Desempenho Escolar",
    conteudo: `Elabore um relatório de desempenho escolar do aluno com base nas informações:

Nome do aluno: [NOME]
Série: [SÉRIE]
Período: [PERÍODO]
Disciplinas e médias: [LISTE AS DISCIPLINAS E NOTAS]
Frequência: [PERCENTUAL]
Observações do professor: [DESCREVA]

O relatório deve ser objetivo, construtivo e indicar caminhos para melhoria.`,
  },
  {
    id: 10, categoria: "Gestão e Documentação", tags: ["ofício", "secretaria", "formal"],
    titulo: "Ofício Escolar",
    conteudo: `Redigir um ofício formal da escola para [DESTINATÁRIO] sobre:
[ASSUNTO DO OFÍCIO]

Dados da escola:
- Nome: [NOME DA ESCOLA]
- Diretor(a): [NOME]
- Data: [DATA]

O ofício deve ser formal, claro e seguir as normas da ABNT para documentos oficiais.`,
  },
  // Criação de conteúdo
  {
    id: 11, categoria: "Criação de Conteúdo", tags: ["explicação", "texto", "didático"],
    titulo: "Explicação de Conteúdo Difícil",
    conteudo: `Explique o conceito de [CONCEITO/TEMA] para alunos do [SÉRIE/NÍVEL] de forma simples e envolvente.

Use:
- Linguagem acessível (sem jargões)
- Analogias com o cotidiano dos alunos
- Um exemplo prático
- Uma curiosidade interessante
- No máximo [NÚMERO] parágrafos`,
  },
  {
    id: 12, categoria: "Criação de Conteúdo", tags: ["história", "narrativa", "interdisciplinar"],
    titulo: "História Educativa Interdisciplinar",
    conteudo: `Crie uma história curta que ensine [CONTEÚDO] de forma lúdica para alunos do [SÉRIE].

A história deve:
- Ter personagens com os quais os alunos se identifiquem
- Integrar os temas [DISCIPLINA 1] e [DISCIPLINA 2]
- Incluir uma lição/moral ao final
- Ter entre [NÚMERO] e [NÚMERO] parágrafos
- Ser adequada para o contexto [LOCAL/CULTURAL]`,
  },
];

const CATEGORIAS = [
  "Todas",
  "Planejamento de Aulas",
  "Avaliações",
  "Comunicação Escolar",
  "Adaptação e Inclusão",
  "Gestão e Documentação",
  "Criação de Conteúdo",
];

const CAT_CONFIG: Record<string, { emoji: string }> = {
  "Todas":                 { emoji: "✨" },
  "Planejamento de Aulas": { emoji: "📅" },
  "Avaliações":            { emoji: "📝" },
  "Comunicação Escolar":   { emoji: "📨" },
  "Adaptação e Inclusão":  { emoji: "💙" },
  "Gestão e Documentação": { emoji: "📁" },
  "Criação de Conteúdo":   { emoji: "✍️" },
};

const CAT_BORDA: Record<string, string> = {
  "Planejamento de Aulas": "border-l-verde",
  "Avaliações":            "border-l-azul",
  "Comunicação Escolar":   "border-l-roxo",
  "Adaptação e Inclusão":  "border-l-azul",
  "Gestão e Documentação": "border-l-laranja",
  "Criação de Conteúdo":   "border-l-roxo",
};

const CAT_TEXTO: Record<string, string> = {
  "Planejamento de Aulas": "text-verde",
  "Avaliações":            "text-azul",
  "Comunicação Escolar":   "text-roxo",
  "Adaptação e Inclusão":  "text-azul",
  "Gestão e Documentação": "text-laranja",
  "Criação de Conteúdo":   "text-roxo",
};

// ── Componente principal ─────────────────────────────────────────────────────
export default function PaginaPrompts() {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");

  const promptsFiltrados = useMemo(
    () =>
      PROMPTS_BIBLIOTECA.filter((p) => {
        const correspondeBusca =
          !busca ||
          p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
          p.conteudo.toLowerCase().includes(busca.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(busca.toLowerCase()));
        const correspondeCategoria =
          categoriaAtiva === "Todas" || p.categoria === categoriaAtiva;
        return correspondeBusca && correspondeCategoria;
      }),
    [busca, categoriaAtiva]
  );

  return (
    <div className="space-y-5 fade-in">

      {/* Banner de cabeçalho */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #7F77DD 0%, #378ADD 100%)" }}
      >
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10" />
        <div className="absolute right-16 bottom-[-20px] w-24 h-24 rounded-full bg-white/5" />
        <div className="relative px-6 py-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Biblioteca de Prompts</h1>
            <p className="text-white/75 text-sm mt-0.5">
              {PROMPTS_BIBLIOTECA.length} prompts prontos para educadores · use e adapte à vontade
            </p>
          </div>
        </div>
      </div>

      {/* Busca + Filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3 shadow-sm shadow-gray-100/50">
        {/* Campo de busca */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Buscar por título, conteúdo ou tag..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-roxo focus:outline-none focus:ring-2 focus:ring-roxo/20 text-sm text-gray-900 placeholder-gray-400 transition-all"
          />
          {busca && (
            <button
              onClick={() => setBusca("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Chips de categoria */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-0.5">
          {CATEGORIAS.map((cat) => {
            const ativo = categoriaAtiva === cat;
            const count =
              cat === "Todas"
                ? PROMPTS_BIBLIOTECA.length
                : PROMPTS_BIBLIOTECA.filter((p) => p.categoria === cat).length;
            const cfg = CAT_CONFIG[cat] || { emoji: "📌" };

            return (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-1.5 pl-2.5 pr-2.5 py-1.5 rounded-full text-xs font-medium transition-all",
                  ativo
                    ? "bg-roxo text-white shadow-sm shadow-roxo/30"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100"
                )}
              >
                <span className="text-sm leading-none">{cfg.emoji}</span>
                <span className="hidden sm:inline">{cat}</span>
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

      {/* Barra de resultado */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {promptsFiltrados.length} prompt{promptsFiltrados.length !== 1 ? "s" : ""}{" "}
          {categoriaAtiva !== "Todas" && (
            <span>em <strong className="text-gray-600">{categoriaAtiva}</strong></span>
          )}
          {busca && (
            <span> para &ldquo;<strong className="text-gray-600">{busca}</strong>&rdquo;</span>
          )}
        </p>
        {(busca || categoriaAtiva !== "Todas") && (
          <button
            onClick={() => { setBusca(""); setCategoriaAtiva("Todas"); }}
            className="text-xs text-roxo hover:underline font-medium"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* Grid de prompts */}
      {promptsFiltrados.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold text-gray-700 mb-1">Nenhum prompt encontrado</p>
          <p className="text-sm text-gray-400">Tente outra busca ou selecione outra categoria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {promptsFiltrados.map((prompt) => {
            const borda = CAT_BORDA[prompt.categoria] || "border-l-gray-300";
            const corTexto = CAT_TEXTO[prompt.categoria] || "text-gray-500";

            return (
              <div
                key={prompt.id}
                className={cn(
                  "bg-white rounded-2xl border border-gray-100 border-l-4 overflow-hidden",
                  "hover:shadow-lg hover:shadow-gray-100/80 hover:-translate-y-0.5 transition-all duration-200",
                  borda
                )}
              >
                <div className="px-5 pt-4 pb-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={cn("text-[10px] font-bold uppercase tracking-wider", corTexto)}>
                      {prompt.categoria}
                    </p>
                    <div className="flex gap-1 flex-shrink-0 flex-wrap justify-end">
                      {prompt.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{prompt.titulo}</h3>
                </div>
                <div className="px-5 pb-4">
                  <PromptCopiavel titulo={prompt.titulo} categoria={prompt.categoria}>
                    {prompt.conteudo}
                  </PromptCopiavel>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
