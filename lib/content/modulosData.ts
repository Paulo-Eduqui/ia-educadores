// Dados estáticos de todos os 24 módulos do curso IA Educadores
// Este arquivo é a fonte de verdade para a estrutura do curso

export type NivelModulo = "basico" | "intermediario" | "avancado";
export type FaseModulo = 1 | 2 | 3 | 4 | 5;
export type TipoAula = "teoria" | "demonstracao" | "pratica" | "quiz" | "projeto";
export type FuncaoUsuario =
  | "professor"
  | "mediador"
  | "assistente"
  | "secretario"
  | "coordenador"
  | "gestor"
  | "outro";

export interface Aula {
  ordem: number;
  titulo: string;
  tipo: TipoAula;
  duracaoMinutos: number;
}

export interface Modulo {
  id: number;
  slug: string;
  titulo: string;
  descricao: string;
  fase: FaseModulo;
  cargaHoraria: number; // em horas
  nivel: NivelModulo;
  publico: FuncaoUsuario[]; // público-alvo (vazio = todos)
  ferramentas: string[];
  objetivos: string[];
  prerequisitos: string[]; // slugs de módulos anteriores
  temQuiz: boolean;
  temPrompts: boolean;
  temProjeto: boolean;
  aulas: Aula[];
  icone: string; // emoji representativo
}

// === FASE 1 — FUNDAMENTOS (12h) ===
// Todos desbloqueados inicialmente para todos os usuários

const fase1: Modulo[] = [
  {
    id: 1,
    slug: "o-que-e-ia",
    titulo: "O que é Inteligência Artificial",
    descricao: "Entenda o que é IA, como ela funciona e de onde veio. Uma introdução clara e sem jargão técnico para educadores.",
    fase: 1,
    cargaHoraria: 3,
    nivel: "basico",
    publico: [],
    ferramentas: ["ChatGPT", "Gemini"],
    objetivos: [
      "Compreender o conceito de Inteligência Artificial",
      "Conhecer a história e evolução da IA",
      "Distinguir IA de ficção científica",
      "Identificar IA no cotidiano",
    ],
    prerequisitos: [],
    temQuiz: true,
    temPrompts: false,
    temProjeto: false,
    icone: "🧠",
    aulas: [
      { ordem: 1, titulo: "O que é IA — definição simples",                tipo: "teoria",        duracaoMinutos: 30 },
      { ordem: 2, titulo: "Breve história da IA",                           tipo: "teoria",        duracaoMinutos: 20 },
      { ordem: 3, titulo: "IA no nosso dia a dia",                          tipo: "demonstracao",  duracaoMinutos: 25 },
      { ordem: 4, titulo: "Mitos e verdades sobre IA",                      tipo: "teoria",        duracaoMinutos: 20 },
      { ordem: 5, titulo: "Quiz — Teste seus conhecimentos",                tipo: "quiz",          duracaoMinutos: 15 },
    ],
  },
  {
    id: 2,
    slug: "ia-generativa",
    titulo: "IA Generativa na Prática",
    descricao: "Conheça a IA generativa — a tecnologia por trás do ChatGPT e outras ferramentas — e veja como ela pode transformar o trabalho do educador.",
    fase: 1,
    cargaHoraria: 3,
    nivel: "basico",
    publico: [],
    ferramentas: ["ChatGPT", "Gemini", "Claude", "Copilot"],
    objetivos: [
      "Entender o que é IA generativa",
      "Conhecer os principais modelos de linguagem",
      "Fazer sua primeira conversa com uma IA",
      "Identificar casos de uso na educação",
    ],
    prerequisitos: ["o-que-e-ia"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: false,
    icone: "✨",
    aulas: [
      { ordem: 1, titulo: "O que é IA Generativa",                          tipo: "teoria",        duracaoMinutos: 25 },
      { ordem: 2, titulo: "ChatGPT, Gemini, Claude — qual a diferença?",   tipo: "demonstracao",  duracaoMinutos: 30 },
      { ordem: 3, titulo: "Sua primeira conversa com uma IA",               tipo: "pratica",       duracaoMinutos: 30 },
      { ordem: 4, titulo: "Casos de uso na educação",                       tipo: "teoria",        duracaoMinutos: 20 },
      { ordem: 5, titulo: "Quiz — IA Generativa",                          tipo: "quiz",          duracaoMinutos: 15 },
    ],
  },
  {
    id: 3,
    slug: "etica-e-privacidade",
    titulo: "Ética, Privacidade e Uso Responsável",
    descricao: "Como usar a IA de forma responsável na escola? Questões éticas, privacidade de dados dos alunos e diretrizes para uso seguro.",
    fase: 1,
    cargaHoraria: 3,
    nivel: "basico",
    publico: [],
    ferramentas: [],
    objetivos: [
      "Compreender os riscos éticos da IA",
      "Entender a proteção de dados (LGPD) na escola",
      "Criar diretrizes de uso de IA para alunos",
      "Reconhecer vieses e limitações da IA",
    ],
    prerequisitos: ["o-que-e-ia"],
    temQuiz: true,
    temPrompts: false,
    temProjeto: false,
    icone: "⚖️",
    aulas: [
      { ordem: 1, titulo: "Ética na IA — o que todo educador precisa saber", tipo: "teoria",       duracaoMinutos: 30 },
      { ordem: 2, titulo: "LGPD e dados dos alunos",                         tipo: "teoria",       duracaoMinutos: 25 },
      { ordem: 3, titulo: "Plágio, criatividade e autoria",                  tipo: "teoria",       duracaoMinutos: 25 },
      { ordem: 4, titulo: "Como criar diretrizes de uso de IA na escola",    tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 5, titulo: "Quiz — Ética e Privacidade",                      tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 4,
    slug: "tour-ferramentas",
    titulo: "Tour pelo Ecossistema de Ferramentas",
    descricao: "Conheça as principais ferramentas de IA disponíveis para educadores: do ChatGPT ao Canva IA, passando por geração de imagens e áudio.",
    fase: 1,
    cargaHoraria: 3,
    nivel: "basico",
    publico: [],
    ferramentas: ["ChatGPT", "Gemini", "Canva IA", "DALL-E", "ElevenLabs", "NotebookLM"],
    objetivos: [
      "Conhecer o ecossistema de ferramentas de IA",
      "Entender as diferenças entre ferramentas gratuitas e pagas",
      "Criar conta nas principais ferramentas",
      "Identificar a ferramenta certa para cada necessidade",
    ],
    prerequisitos: ["ia-generativa"],
    temQuiz: true,
    temPrompts: false,
    temProjeto: false,
    icone: "🛠️",
    aulas: [
      { ordem: 1, titulo: "Mapa das ferramentas de IA",                     tipo: "teoria",       duracaoMinutos: 25 },
      { ordem: 2, titulo: "Ferramentas de texto e chat",                    tipo: "demonstracao", duracaoMinutos: 30 },
      { ordem: 3, titulo: "Ferramentas de imagem e apresentação",           tipo: "demonstracao", duracaoMinutos: 25 },
      { ordem: 4, titulo: "Ferramentas de áudio e vídeo",                  tipo: "demonstracao", duracaoMinutos: 20 },
      { ordem: 5, titulo: "Quiz — Ferramentas de IA",                       tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
];

// === FASE 2 — PROMPTS (16h) ===
const fase2: Modulo[] = [
  {
    id: 5,
    slug: "o-que-e-prompt",
    titulo: "O que é um Prompt e Por que Importa",
    descricao: "A habilidade de fazer as perguntas certas para a IA. Aprenda os fundamentos do prompting e transforme suas interações com ferramentas de IA.",
    fase: 2,
    cargaHoraria: 3,
    nivel: "basico",
    publico: [],
    ferramentas: ["ChatGPT", "Gemini"],
    objetivos: [
      "Entender o que é um prompt e sua estrutura",
      "Escrever prompts claros e eficazes",
      "Conhecer os erros mais comuns no prompting",
      "Aplicar a estrutura básica de prompt",
    ],
    prerequisitos: ["tour-ferramentas"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: false,
    icone: "💬",
    aulas: [
      { ordem: 1, titulo: "O que é um prompt",                              tipo: "teoria",       duracaoMinutos: 20 },
      { ordem: 2, titulo: "Estrutura de um bom prompt",                     tipo: "teoria",       duracaoMinutos: 25 },
      { ordem: 3, titulo: "Erros comuns e como evitá-los",                  tipo: "teoria",       duracaoMinutos: 20 },
      { ordem: 4, titulo: "Prática — seus primeiros prompts",               tipo: "pratica",      duracaoMinutos: 40 },
      { ordem: 5, titulo: "Quiz — Fundamentos de Prompt",                   tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 6,
    slug: "tecnicas-prompt",
    titulo: "Técnicas Avançadas de Prompt",
    descricao: "Vá além do básico com técnicas como Chain of Thought, Few-Shot, Role Prompting e outras estratégias para resultados mais precisos.",
    fase: 2,
    cargaHoraria: 4,
    nivel: "intermediario",
    publico: [],
    ferramentas: ["ChatGPT", "Claude", "Gemini"],
    objetivos: [
      "Aplicar técnicas avançadas de prompting",
      "Usar o Few-Shot Prompting com exemplos",
      "Criar personas e contextos para a IA",
      "Encadear prompts para tarefas complexas",
    ],
    prerequisitos: ["o-que-e-prompt"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: false,
    icone: "🎯",
    aulas: [
      { ordem: 1, titulo: "Chain of Thought — pense passo a passo",        tipo: "teoria",       duracaoMinutos: 30 },
      { ordem: 2, titulo: "Few-Shot Prompting com exemplos",                tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 3, titulo: "Role Prompting — dê uma persona à IA",          tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 4, titulo: "Encadeamento de prompts",                        tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 5, titulo: "Quiz — Técnicas Avançadas",                      tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 7,
    slug: "prompts-sala-de-aula",
    titulo: "Prompts para Sala de Aula",
    descricao: "100+ prompts prontos para usar na sala de aula: planos de aula, atividades diferenciadas, avaliações, textos explicativos e muito mais.",
    fase: 2,
    cargaHoraria: 3,
    nivel: "basico",
    publico: ["professor", "mediador", "assistente", "coordenador"],
    ferramentas: ["ChatGPT", "Gemini", "Claude"],
    objetivos: [
      "Usar prompts para criar planos de aula",
      "Gerar atividades diferenciadas para diferentes perfis",
      "Criar avaliações com gabarito",
      "Adaptar conteúdo para diferentes níveis",
    ],
    prerequisitos: ["o-que-e-prompt"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: false,
    icone: "📚",
    aulas: [
      { ordem: 1, titulo: "Prompts para planos de aula",                    tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 2, titulo: "Prompts para atividades e exercícios",           tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 3, titulo: "Prompts para avaliações",                        tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 4, titulo: "Diferenciação pedagógica com IA",               tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 5, titulo: "Quiz — Prompts para Sala de Aula",              tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 8,
    slug: "prompts-gestao",
    titulo: "Prompts para Gestão e Secretaria",
    descricao: "Prompts especializados para gestores e secretários: atas, relatórios, comunicados, planilhas, ofícios e documentos escolares.",
    fase: 2,
    cargaHoraria: 3,
    nivel: "basico",
    publico: ["secretario", "coordenador", "gestor"],
    ferramentas: ["ChatGPT", "Gemini", "Claude"],
    objetivos: [
      "Criar documentos escolares com IA",
      "Redigir comunicados e ofícios",
      "Gerar relatórios e análises",
      "Otimizar processos administrativos",
    ],
    prerequisitos: ["o-que-e-prompt"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: false,
    icone: "📋",
    aulas: [
      { ordem: 1, titulo: "Prompts para documentos escolares",              tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 2, titulo: "Comunicados e e-mails profissionais",            tipo: "pratica",      duracaoMinutos: 25 },
      { ordem: 3, titulo: "Atas, relatórios e ofícios",                    tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 4, titulo: "Análise de dados com IA",                       tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 5, titulo: "Quiz — Prompts para Gestão",                    tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 9,
    slug: "biblioteca-prompts",
    titulo: "Biblioteca Colaborativa de Prompts",
    descricao: "Como construir, organizar e compartilhar sua biblioteca pessoal de prompts. Inclui os melhores prompts da comunidade IA Educadores.",
    fase: 2,
    cargaHoraria: 3,
    nivel: "intermediario",
    publico: [],
    ferramentas: ["ChatGPT", "Notion", "Google Docs"],
    objetivos: [
      "Criar sua biblioteca de prompts pessoal",
      "Organizar prompts por categoria",
      "Compartilhar e adaptar prompts da comunidade",
      "Criar templates de prompts reutilizáveis",
    ],
    prerequisitos: ["prompts-sala-de-aula", "prompts-gestao"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: true,
    icone: "📖",
    aulas: [
      { ordem: 1, titulo: "Como organizar sua biblioteca de prompts",       tipo: "teoria",       duracaoMinutos: 25 },
      { ordem: 2, titulo: "Templates e variáveis em prompts",               tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 3, titulo: "Melhores prompts da comunidade",                 tipo: "demonstracao", duracaoMinutos: 25 },
      { ordem: 4, titulo: "Projeto — Monte sua biblioteca",                 tipo: "projeto",      duracaoMinutos: 45 },
      { ordem: 5, titulo: "Quiz — Biblioteca de Prompts",                  tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
];

// === FASE 3 — APLICAÇÕES POR FUNÇÃO (20h) ===
const fase3: Modulo[] = [
  {
    id: 10,
    slug: "professor-com-ia",
    titulo: "Professor com IA",
    descricao: "Ferramentas e práticas de IA especialmente pensadas para professores: planejamento, preparação de aulas, correção e feedback personalizado.",
    fase: 3,
    cargaHoraria: 3,
    nivel: "intermediario",
    publico: ["professor"],
    ferramentas: ["ChatGPT", "Gemini", "Canva IA", "MagicSchool"],
    objetivos: [
      "Usar IA para planejamento semanal de aulas",
      "Criar materiais didáticos com IA",
      "Dar feedback personalizado com IA",
      "Adaptar atividades para necessidades especiais",
    ],
    prerequisitos: ["biblioteca-prompts"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: false,
    icone: "👩‍🏫",
    aulas: [
      { ordem: 1, titulo: "Planejamento de aulas com IA",                   tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 2, titulo: "Criação de materiais didáticos",                 tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 3, titulo: "Feedback e correção com IA",                     tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 4, titulo: "Inclusão e diferenciação com IA",                tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 5, titulo: "Quiz — Professor com IA",                        tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 11,
    slug: "mediador-com-ia",
    titulo: "Mediador e Assistente com IA",
    descricao: "Como mediadores e assistentes educacionais podem usar a IA para apoiar alunos com necessidades específicas e otimizar seu trabalho diário.",
    fase: 3,
    cargaHoraria: 3,
    nivel: "intermediario",
    publico: ["mediador", "assistente"],
    ferramentas: ["ChatGPT", "Gemini", "Canva IA"],
    objetivos: [
      "Criar recursos de apoio personalizados com IA",
      "Usar IA para comunicação alternativa",
      "Adaptar materiais para diferentes necessidades",
      "Documentar acompanhamentos com IA",
    ],
    prerequisitos: ["biblioteca-prompts"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: false,
    icone: "🤝",
    aulas: [
      { ordem: 1, titulo: "Apoio personalizado com IA",                     tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 2, titulo: "Comunicação e inclusão com IA",                  tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 3, titulo: "Documentação e relatórios de acompanhamento",   tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 4, titulo: "Ferramentas para necessidades especiais",        tipo: "demonstracao", duracaoMinutos: 35 },
      { ordem: 5, titulo: "Quiz — Mediador com IA",                         tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 12,
    slug: "secretaria-com-ia",
    titulo: "Secretaria e Documentação com IA",
    descricao: "Automatize tarefas administrativas: geração de documentos, matrículas, comunicados, gestão de arquivos e atendimento às famílias.",
    fase: 3,
    cargaHoraria: 3,
    nivel: "intermediario",
    publico: ["secretario"],
    ferramentas: ["ChatGPT", "Gemini", "Google Workspace"],
    objetivos: [
      "Gerar documentos escolares automaticamente",
      "Criar modelos de comunicação para famílias",
      "Organizar arquivos e registros com IA",
      "Otimizar o atendimento na secretaria",
    ],
    prerequisitos: ["biblioteca-prompts"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: false,
    icone: "📑",
    aulas: [
      { ordem: 1, titulo: "Documentos escolares automatizados",             tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 2, titulo: "Comunicação com famílias",                       tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 3, titulo: "Organização de arquivos e dados",                tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 4, titulo: "Atendimento e respostas frequentes",             tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 5, titulo: "Quiz — Secretaria com IA",                       tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 13,
    slug: "coordenacao-com-ia",
    titulo: "Coordenação Pedagógica com IA",
    descricao: "IA para coordenadores pedagógicos: análise de aprendizagem, formação de professores, acompanhamento de resultados e projeto pedagógico.",
    fase: 3,
    cargaHoraria: 3,
    nivel: "intermediario",
    publico: ["coordenador"],
    ferramentas: ["ChatGPT", "Gemini", "NotebookLM"],
    objetivos: [
      "Analisar dados de aprendizagem com IA",
      "Planejar formação continuada de professores",
      "Criar relatórios pedagógicos",
      "Usar IA para tomada de decisão educacional",
    ],
    prerequisitos: ["biblioteca-prompts"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: false,
    icone: "📊",
    aulas: [
      { ordem: 1, titulo: "Análise de aprendizagem com IA",                 tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 2, titulo: "Formação de professores mediada por IA",         tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 3, titulo: "Projeto pedagógico e currículo com IA",          tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 4, titulo: "Relatórios e tomada de decisão",                 tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 5, titulo: "Quiz — Coordenação com IA",                      tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 14,
    slug: "gestao-com-ia",
    titulo: "Gestão Escolar com IA",
    descricao: "Para diretores e gestores: indicadores escolares, comunicação institucional, gestão de equipes, planejamento estratégico com IA.",
    fase: 3,
    cargaHoraria: 3,
    nivel: "intermediario",
    publico: ["gestor"],
    ferramentas: ["ChatGPT", "Gemini", "NotebookLM", "Power BI"],
    objetivos: [
      "Analisar indicadores escolares com IA",
      "Criar comunicações institucionais",
      "Planejar estrategicamente com IA",
      "Gerir equipes e processos com IA",
    ],
    prerequisitos: ["biblioteca-prompts"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: false,
    icone: "🏫",
    aulas: [
      { ordem: 1, titulo: "Indicadores e métricas escolares com IA",        tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 2, titulo: "Comunicação institucional e com a comunidade",   tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 3, titulo: "Planejamento estratégico da escola",             tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 4, titulo: "Gestão de pessoas e processos",                  tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 5, titulo: "Quiz — Gestão com IA",                           tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 15,
    slug: "criacao-de-conteudo",
    titulo: "Criação de Conteúdo com IA",
    descricao: "Produza conteúdo educacional de qualidade: posts, vídeos, apresentações, infográficos, podcasts e materiais impressos com ajuda da IA.",
    fase: 3,
    cargaHoraria: 3,
    nivel: "intermediario",
    publico: [],
    ferramentas: ["Canva IA", "ChatGPT", "DALL-E", "ElevenLabs", "Runway"],
    objetivos: [
      "Criar apresentações visuais com IA",
      "Produzir conteúdo para redes sociais da escola",
      "Gerar imagens e infográficos educativos",
      "Criar material multimídia para aulas",
    ],
    prerequisitos: ["biblioteca-prompts"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: false,
    icone: "🎨",
    aulas: [
      { ordem: 1, titulo: "Apresentações visuais com Canva IA",             tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 2, titulo: "Criação de imagens e infográficos",              tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 3, titulo: "Conteúdo para redes sociais da escola",          tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 4, titulo: "Vídeos e áudio com IA",                          tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 5, titulo: "Quiz — Criação de Conteúdo",                     tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 16,
    slug: "projeto-integrador",
    titulo: "Projeto Integrador por Perfil",
    descricao: "Aplique o que aprendeu! Cada educador desenvolve um projeto real adaptado à sua função e contexto escolar.",
    fase: 3,
    cargaHoraria: 2,
    nivel: "intermediario",
    publico: [],
    ferramentas: [],
    objetivos: [
      "Integrar os conhecimentos da Fase 3",
      "Desenvolver um projeto prático real",
      "Apresentar resultados para a turma",
      "Receber e dar feedback de pares",
    ],
    prerequisitos: ["professor-com-ia", "mediador-com-ia", "secretaria-com-ia", "coordenacao-com-ia", "gestao-com-ia", "criacao-de-conteudo"],
    temQuiz: false,
    temPrompts: false,
    temProjeto: true,
    icone: "🚀",
    aulas: [
      { ordem: 1, titulo: "Orientações do projeto integrador",              tipo: "teoria",       duracaoMinutos: 20 },
      { ordem: 2, titulo: "Desenvolvimento do projeto",                     tipo: "projeto",      duracaoMinutos: 60 },
      { ordem: 3, titulo: "Apresentação e feedback",                        tipo: "pratica",      duracaoMinutos: 30 },
    ],
  },
];

// === FASE 4 — INTEGRAÇÃO AVANÇADA (20h) ===
const fase4: Modulo[] = [
  {
    id: 17,
    slug: "automacao-sem-codigo",
    titulo: "Automação sem Código",
    descricao: "Automatize tarefas repetitivas com Make, Zapier e n8n. Crie fluxos que conectam ferramentas e economizam horas de trabalho.",
    fase: 4,
    cargaHoraria: 4,
    nivel: "avancado",
    publico: [],
    ferramentas: ["Make", "Zapier", "n8n", "Google Apps Script"],
    objetivos: [
      "Criar automações sem precisar programar",
      "Conectar ferramentas com Make/Zapier",
      "Automatizar comunicações da escola",
      "Criar fluxos de aprovação e notificação",
    ],
    prerequisitos: ["projeto-integrador"],
    temQuiz: true,
    temPrompts: false,
    temProjeto: true,
    icone: "⚡",
    aulas: [
      { ordem: 1, titulo: "Introdução à automação sem código",              tipo: "teoria",       duracaoMinutos: 30 },
      { ordem: 2, titulo: "Make — criando seus primeiros fluxos",           tipo: "pratica",      duracaoMinutos: 45 },
      { ordem: 3, titulo: "Zapier para educadores",                         tipo: "pratica",      duracaoMinutos: 40 },
      { ordem: 4, titulo: "Google Apps Script básico",                      tipo: "pratica",      duracaoMinutos: 40 },
      { ordem: 5, titulo: "Projeto — Automação real na escola",             tipo: "projeto",      duracaoMinutos: 45 },
      { ordem: 6, titulo: "Quiz — Automação sem Código",                    tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 18,
    slug: "analise-de-dados",
    titulo: "Análise de Dados Educacionais",
    descricao: "Transforme dados escolares em insights. Use IA para analisar resultados, identificar padrões e tomar decisões baseadas em evidências.",
    fase: 4,
    cargaHoraria: 4,
    nivel: "avancado",
    publico: [],
    ferramentas: ["ChatGPT", "Gemini", "Google Sheets", "NotebookLM", "Power BI"],
    objetivos: [
      "Analisar dados escolares com IA",
      "Identificar padrões de aprendizagem",
      "Criar dashboards com dados educacionais",
      "Tomar decisões baseadas em dados",
    ],
    prerequisitos: ["projeto-integrador"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: true,
    icone: "📈",
    aulas: [
      { ordem: 1, titulo: "Dados educacionais — o que coletar e analisar",  tipo: "teoria",       duracaoMinutos: 30 },
      { ordem: 2, titulo: "Análise com ChatGPT e Gemini",                   tipo: "pratica",      duracaoMinutos: 40 },
      { ordem: 3, titulo: "Google Sheets com IA",                           tipo: "pratica",      duracaoMinutos: 40 },
      { ordem: 4, titulo: "Visualização e dashboards",                      tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 5, titulo: "Projeto — Análise real da sua escola",           tipo: "projeto",      duracaoMinutos: 40 },
      { ordem: 6, titulo: "Quiz — Análise de Dados",                        tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 19,
    slug: "assistentes-personalizados",
    titulo: "Criação de Assistentes Personalizados",
    descricao: "Crie seus próprios GPTs e assistentes de IA personalizados para diferentes necessidades da escola.",
    fase: 4,
    cargaHoraria: 4,
    nivel: "avancado",
    publico: [],
    ferramentas: ["ChatGPT (GPTs)", "Claude Projects", "Gemini Gems"],
    objetivos: [
      "Criar GPTs personalizados para a escola",
      "Configurar assistentes com documentos da escola",
      "Criar assistentes para alunos e pais",
      "Manter e atualizar assistentes de IA",
    ],
    prerequisitos: ["projeto-integrador"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: true,
    icone: "🤖",
    aulas: [
      { ordem: 1, titulo: "O que são GPTs e assistentes personalizados",   tipo: "teoria",       duracaoMinutos: 25 },
      { ordem: 2, titulo: "Criando seu primeiro GPT",                       tipo: "pratica",      duracaoMinutos: 45 },
      { ordem: 3, titulo: "Claude Projects e Gemini Gems",                  tipo: "pratica",      duracaoMinutos: 40 },
      { ordem: 4, titulo: "Assistente para alunos e famílias",             tipo: "pratica",      duracaoMinutos: 40 },
      { ordem: 5, titulo: "Projeto — Assistente da sua escola",             tipo: "projeto",      duracaoMinutos: 40 },
      { ordem: 6, titulo: "Quiz — Assistentes Personalizados",             tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 20,
    slug: "ia-em-plataformas",
    titulo: "IA em Plataformas Educacionais",
    descricao: "Descubra como as plataformas educacionais já usam IA: Khan Academy, Duolingo, Google Classroom, e como aproveitar ao máximo.",
    fase: 4,
    cargaHoraria: 4,
    nivel: "avancado",
    publico: [],
    ferramentas: ["Khan Academy", "Duolingo", "Google Classroom", "Quizlet", "Canva Education"],
    objetivos: [
      "Conhecer plataformas educacionais com IA",
      "Integrar plataformas ao trabalho pedagógico",
      "Avaliar plataformas para sua realidade",
      "Criar ecossistema digital educacional",
    ],
    prerequisitos: ["projeto-integrador"],
    temQuiz: true,
    temPrompts: false,
    temProjeto: false,
    icone: "🌐",
    aulas: [
      { ordem: 1, titulo: "Panorama das plataformas educacionais com IA",  tipo: "teoria",       duracaoMinutos: 30 },
      { ordem: 2, titulo: "Khan Academy Khanmigo na prática",              tipo: "demonstracao", duracaoMinutos: 40 },
      { ordem: 3, titulo: "Google Workspace for Education",                 tipo: "pratica",      duracaoMinutos: 40 },
      { ordem: 4, titulo: "Outras plataformas e avaliação crítica",        tipo: "teoria",       duracaoMinutos: 35 },
      { ordem: 5, titulo: "Quiz — IA em Plataformas",                      tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 21,
    slug: "politica-de-ia",
    titulo: "Política de IA para a Escola",
    descricao: "Como criar e implementar uma política de uso de IA na escola que seja justa, ética e eficaz para alunos, professores e famílias.",
    fase: 4,
    cargaHoraria: 4,
    nivel: "avancado",
    publico: [],
    ferramentas: ["ChatGPT", "Google Docs"],
    objetivos: [
      "Criar uma política de IA para a escola",
      "Envolver a comunidade escolar na política",
      "Definir regras claras de uso de IA",
      "Revisar e atualizar a política periodicamente",
    ],
    prerequisitos: ["projeto-integrador"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: true,
    icone: "📜",
    aulas: [
      { ordem: 1, titulo: "Por que a escola precisa de uma política de IA", tipo: "teoria",      duracaoMinutos: 30 },
      { ordem: 2, titulo: "Exemplos de políticas de IA em escolas",         tipo: "teoria",      duracaoMinutos: 30 },
      { ordem: 3, titulo: "Como criar a política da sua escola",            tipo: "pratica",      duracaoMinutos: 45 },
      { ordem: 4, titulo: "Implementação e comunicação",                    tipo: "pratica",      duracaoMinutos: 35 },
      { ordem: 5, titulo: "Projeto — Política de IA da sua escola",        tipo: "projeto",      duracaoMinutos: 40 },
      { ordem: 6, titulo: "Quiz — Política de IA",                          tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
];

// === FASE 5 — LIDERANÇA (12h) ===
const fase5: Modulo[] = [
  {
    id: 22,
    slug: "formar-equipe",
    titulo: "Como Formar sua Equipe em IA",
    descricao: "Estratégias práticas para capacitar professores e funcionários da escola no uso de IA. Seja o multiplicador da transformação digital.",
    fase: 5,
    cargaHoraria: 4,
    nivel: "avancado",
    publico: [],
    ferramentas: ["ChatGPT", "Canva IA", "Kahoot"],
    objetivos: [
      "Planejar a formação da equipe em IA",
      "Criar materiais de formação com IA",
      "Conduzir oficinas práticas",
      "Sustentar a cultura de inovação",
    ],
    prerequisitos: ["politica-de-ia"],
    temQuiz: true,
    temPrompts: true,
    temProjeto: true,
    icone: "👥",
    aulas: [
      { ordem: 1, titulo: "Diagnóstico da equipe — onde cada um está",     tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 2, titulo: "Planejando a formação em IA",                    tipo: "pratica",      duracaoMinutos: 40 },
      { ordem: 3, titulo: "Conduzindo oficinas práticas",                   tipo: "pratica",      duracaoMinutos: 40 },
      { ordem: 4, titulo: "Projeto — Plano de formação da equipe",          tipo: "projeto",      duracaoMinutos: 50 },
      { ordem: 5, titulo: "Quiz — Formação de Equipe",                      tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 23,
    slug: "futuro-da-educacao",
    titulo: "Futuro da Educação com IA",
    descricao: "Tendências, cenários e desafios da IA na educação nos próximos anos. Como se preparar e liderar a transformação.",
    fase: 5,
    cargaHoraria: 4,
    nivel: "avancado",
    publico: [],
    ferramentas: [],
    objetivos: [
      "Compreender as tendências da IA na educação",
      "Analisar cenários futuros de forma crítica",
      "Identificar oportunidades e ameaças",
      "Posicionar-se como líder da transformação",
    ],
    prerequisitos: ["politica-de-ia"],
    temQuiz: true,
    temPrompts: false,
    temProjeto: false,
    icone: "🔭",
    aulas: [
      { ordem: 1, titulo: "Tendências globais da IA na educação",           tipo: "teoria",       duracaoMinutos: 40 },
      { ordem: 2, titulo: "Sala de aula do futuro — cenários possíveis",   tipo: "teoria",       duracaoMinutos: 35 },
      { ordem: 3, titulo: "O papel do educador na era da IA",              tipo: "teoria",       duracaoMinutos: 35 },
      { ordem: 4, titulo: "Como se manter atualizado",                      tipo: "pratica",      duracaoMinutos: 30 },
      { ordem: 5, titulo: "Quiz — Futuro da Educação",                      tipo: "quiz",         duracaoMinutos: 15 },
    ],
  },
  {
    id: 24,
    slug: "projeto-final",
    titulo: "Projeto Final — Plano de Transformação Digital",
    descricao: "O grande projeto de conclusão. Cada educador apresenta um Plano de Transformação Digital para sua escola ou rede de ensino.",
    fase: 5,
    cargaHoraria: 4,
    nivel: "avancado",
    publico: [],
    ferramentas: [],
    objetivos: [
      "Integrar todos os conhecimentos do curso",
      "Criar um plano real de transformação digital",
      "Apresentar para avaliação dos pares",
      "Obter o certificado de Especialista em IA",
    ],
    prerequisitos: ["formar-equipe", "futuro-da-educacao"],
    temQuiz: false,
    temPrompts: false,
    temProjeto: true,
    icone: "🏆",
    aulas: [
      { ordem: 1, titulo: "Orientações do projeto final",                   tipo: "teoria",       duracaoMinutos: 20 },
      { ordem: 2, titulo: "Desenvolvimento do Plano de Transformação",      tipo: "projeto",      duracaoMinutos: 90 },
      { ordem: 3, titulo: "Apresentação e defesa do projeto",               tipo: "pratica",      duracaoMinutos: 45 },
      { ordem: 4, titulo: "Emissão do certificado de Especialista",        tipo: "teoria",       duracaoMinutos: 10 },
    ],
  },
];

// Exporta todos os módulos combinados
export const MODULOS: Modulo[] = [...fase1, ...fase2, ...fase3, ...fase4, ...fase5];

// Metadados das fases
export const FASES = [
  { numero: 1, titulo: "Fundamentos",      cargaHoraria: 12, totalModulos: 4,  cor: "verde" },
  { numero: 2, titulo: "Prompts",           cargaHoraria: 16, totalModulos: 5,  cor: "azul" },
  { numero: 3, titulo: "Aplicações",        cargaHoraria: 20, totalModulos: 7,  cor: "roxo" },
  { numero: 4, titulo: "Integração",        cargaHoraria: 20, totalModulos: 5,  cor: "laranja" },
  { numero: 5, titulo: "Liderança",         cargaHoraria: 12, totalModulos: 3,  cor: "vermelho" },
] as const;

// Carga horária total do curso
export const CARGA_HORARIA_TOTAL = 80;
export const TOTAL_MODULOS = 24;

// Retorna módulo pelo slug
export function buscarModuloPorSlug(slug: string): Modulo | undefined {
  return MODULOS.find((m) => m.slug === slug);
}

// Retorna módulos de uma fase
export function modulosDaFase(fase: FaseModulo): Modulo[] {
  return MODULOS.filter((m) => m.fase === fase);
}

// Verifica se um módulo está disponível para desbloqueio
export function verificarPrerequisitos(
  slugModulo: string,
  modulosConcluidos: string[]
): boolean {
  const modulo = buscarModuloPorSlug(slugModulo);
  if (!modulo) return false;
  // Verifica se todos os pré-requisitos foram concluídos
  return modulo.prerequisitos.every((slug) => modulosConcluidos.includes(slug));
}
