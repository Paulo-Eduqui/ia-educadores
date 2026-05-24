// Dados dos quizzes por módulo
export interface QuestaoQuiz {
  id: number;
  pergunta: string;
  opcoes: string[];
  correta: number; // índice da opção correta (0-based)
  explicacao: string;
}

export interface DadosQuiz {
  moduloSlug: string;
  titulo: string;
  descricao: string;
  questoes: QuestaoQuiz[];
  pontuacaoMinima: number; // % mínima para aprovação
}

// ─── FASE 1 ────────────────────────────────────────────────────────────────

export const QUIZZES: Record<string, DadosQuiz> = {
  "o-que-e-ia": {
    moduloSlug: "o-que-e-ia",
    titulo: "Quiz — O que é Inteligência Artificial?",
    descricao: "Teste seus conhecimentos sobre os conceitos fundamentais de IA.",
    pontuacaoMinima: 70,
    questoes: [
      {
        id: 1,
        pergunta: "O que é Inteligência Artificial (IA)?",
        opcoes: [
          "Um robô físico que substitui humanos em tarefas perigosas",
          "Um campo da ciência da computação que cria sistemas capazes de realizar tarefas que normalmente exigiriam inteligência humana",
          "Um software exclusivo para grandes empresas de tecnologia",
          "Um sistema que apenas executa comandos pré-programados sem aprender nada",
        ],
        correta: 1,
        explicacao:
          "A IA é um ramo da ciência da computação que desenvolve sistemas capazes de aprender, raciocinar e resolver problemas de forma semelhante aos humanos. Ela não precisa ser física nem é exclusiva de grandes empresas.",
      },
      {
        id: 2,
        pergunta: "O que significa dizer que uma IA é 'treinada'?",
        opcoes: [
          "A IA foi programada manualmente para cada resposta possível",
          "Um humano digitou todas as respostas que a IA pode dar",
          "A IA aprendeu padrões a partir de grandes volumes de dados",
          "A IA foi instalada em um computador potente",
        ],
        correta: 2,
        explicacao:
          "Treinar uma IA significa expô-la a grandes quantidades de dados (textos, imagens, etc.) para que ela aprenda padrões automaticamente. Não é uma programação manual linha a linha.",
      },
      {
        id: 3,
        pergunta: "Qual destas é uma limitação importante da IA atual?",
        opcoes: [
          "Ela não consegue processar texto em português",
          "Ela pode gerar informações incorretas com aparência de verdadeiras ('alucinações')",
          "Ela só funciona conectada à internet de alta velocidade",
          "Ela exige conhecimento de programação para ser usada",
        ],
        correta: 1,
        explicacao:
          "As IAs generativas podem 'alucinar' — produzir respostas que parecem corretas mas contêm erros ou informações falsas. Por isso, é fundamental verificar as informações geradas antes de usá-las.",
      },
      {
        id: 4,
        pergunta: "Como um educador pode usar IA de forma ética na escola?",
        opcoes: [
          "Usar a IA para fazer todas as atividades dos alunos sem que eles participem",
          "Usar a IA apenas para atividades administrativas, nunca pedagógicas",
          "Usar a IA como ferramenta de apoio, sendo transparente com alunos e comunidade",
          "Proibir completamente o uso de IA para evitar problemas",
        ],
        correta: 2,
        explicacao:
          "O uso ético da IA envolve transparência, senso crítico e responsabilidade. A IA deve ser uma parceira do educador, não substituta. Ser transparente com a comunidade escolar sobre como e quando a IA é usada é uma boa prática.",
      },
      {
        id: 5,
        pergunta: "O que diferencia IA Generativa de outros tipos de IA?",
        opcoes: [
          "A IA Generativa só funciona com imagens",
          "A IA Generativa cria conteúdo novo (textos, imagens, áudios) a partir de solicitações",
          "A IA Generativa é exclusiva para diagnósticos médicos",
          "A IA Generativa memoriza e repete exatamente o que foi digitado",
        ],
        correta: 1,
        explicacao:
          "IA Generativa é um tipo de IA capaz de criar conteúdo original — como textos, imagens, músicas e vídeos — a partir de uma solicitação (prompt). Ferramentas como ChatGPT, Gemini e Claude são exemplos de IA generativa de texto.",
      },
    ],
  },

  "ia-na-educacao": {
    moduloSlug: "ia-na-educacao",
    titulo: "Quiz — IA na Educação",
    descricao: "Verifique o que você aprendeu sobre aplicações de IA no contexto educacional.",
    pontuacaoMinima: 70,
    questoes: [
      {
        id: 1,
        pergunta: "Qual é o papel ideal da IA para um educador?",
        opcoes: [
          "Substituir completamente o planejamento pedagógico do professor",
          "Fazer as correções e atribuir notas automaticamente sem revisão humana",
          "Ser uma ferramenta de apoio que amplia a capacidade do educador, sem substituí-lo",
          "Funcionar apenas como entretenimento para os alunos",
        ],
        correta: 2,
        explicacao:
          "A IA deve ampliar — não substituir — o trabalho do educador. Ela pode automatizar tarefas repetitivas, gerar sugestões e personalizar materiais, mas o julgamento pedagógico e o vínculo humano continuam sendo insubstituíveis.",
      },
      {
        id: 2,
        pergunta: "Quais tarefas educacionais a IA pode ajudar a tornar mais rápidas?",
        opcoes: [
          "Criar vínculos afetivos com os alunos",
          "Realizar visitas domiciliares a famílias",
          "Elaborar planos de aula, sugestões de atividades e resumos de conteúdo",
          "Avaliar o comportamento social dos alunos na hora do recreio",
        ],
        correta: 2,
        explicacao:
          "A IA é especialmente útil para tarefas textuais como elaboração de planos de aula, criação de atividades, resumos e adaptações de conteúdo. Tarefas que envolvem presença humana, empatia e julgamento contextual ainda dependem do educador.",
      },
      {
        id: 3,
        pergunta: "O que é personalização de aprendizado com IA?",
        opcoes: [
          "Criar um perfil nas redes sociais para cada aluno",
          "Usar IA para adaptar conteúdos e atividades às necessidades individuais de cada aluno",
          "Comprar materiais personalizados importados com ajuda de IA",
          "Dar um computador diferente para cada aluno",
        ],
        correta: 1,
        explicacao:
          "Personalização de aprendizado significa usar a IA para adaptar ritmo, linguagem, exemplos e atividades ao perfil e às necessidades de cada estudante, tornando o ensino mais inclusivo e eficaz.",
      },
      {
        id: 4,
        pergunta: "Qual preocupação ética é importante ao usar IA com alunos?",
        opcoes: [
          "A IA pode deixar o computador mais lento",
          "A privacidade dos dados dos alunos deve ser protegida",
          "A IA pode mudar o idioma do sistema operacional",
          "A IA consome muita eletricidade",
        ],
        correta: 1,
        explicacao:
          "Proteger os dados pessoais dos alunos é uma obrigação ética e legal (LGPD no Brasil). É fundamental não inserir informações identificáveis de alunos em ferramentas de IA sem consentimento e conhecer a política de privacidade de cada ferramenta.",
      },
      {
        id: 5,
        pergunta: "Como a IA pode apoiar alunos com necessidades educacionais especiais?",
        opcoes: [
          "Dispensando o professor de fazer qualquer adaptação",
          "Gerando materiais em linguagem simplificada, com recursos visuais e adaptações de acessibilidade",
          "Avaliando se o aluno tem ou não uma deficiência",
          "Substituindo o laudo médico e psicopedagógico",
        ],
        correta: 1,
        explicacao:
          "A IA pode gerar materiais adaptados — com linguagem mais simples, mais recursos visuais, maior fonte, síntese de voz — apoiando a inclusão. Mas ela não substitui diagnósticos profissionais nem o papel do especialista em educação especial.",
      },
    ],
  },

  "ferramentas-ia-educadores": {
    moduloSlug: "ferramentas-ia-educadores",
    titulo: "Quiz — Ferramentas de IA para Educadores",
    descricao: "Teste seu conhecimento sobre as principais ferramentas de IA disponíveis para educadores.",
    pontuacaoMinima: 70,
    questoes: [
      {
        id: 1,
        pergunta: "Para que serve o ChatGPT na prática escolar?",
        opcoes: [
          "Somente para criar imagens artísticas",
          "Para gerar textos, responder perguntas, criar planos de aula e sugestões pedagógicas",
          "Exclusivamente para programação e código",
          "Para traduzir documentos oficiais com validade jurídica",
        ],
        correta: 1,
        explicacao:
          "O ChatGPT é um assistente de IA de texto que pode ajudar educadores a criar planos de aula, atividades, avaliações, comunicados, resumos de conteúdo e muito mais. É uma ferramenta versátil para o trabalho pedagógico e administrativo.",
      },
      {
        id: 2,
        pergunta: "O Canva com IA pode ser usado por educadores para:",
        opcoes: [
          "Criar vídeos de alta fidelidade sem câmera",
          "Gerar relatórios financeiros automaticamente",
          "Criar apresentações, infográficos e materiais visuais com sugestões automáticas de design",
          "Substituir o sistema de gestão escolar",
        ],
        correta: 2,
        explicacao:
          "O Canva integra recursos de IA para sugerir layouts, gerar imagens, criar apresentações e facilitar o design de materiais didáticos visuais, mesmo para quem não tem experiência em design gráfico.",
      },
      {
        id: 3,
        pergunta: "O que o NotebookLM do Google oferece de especial para educadores?",
        opcoes: [
          "Permite criar músicas educativas automaticamente",
          "Gera análises e respostas baseadas em documentos que você mesmo faz upload",
          "Substitui a plataforma de reuniões do Google Meet",
          "Cria animações 3D de conteúdos pedagógicos",
        ],
        correta: 1,
        explicacao:
          "O NotebookLM é uma ferramenta de IA que analisa documentos enviados pelo usuário — como PDFs, anotações e livros — e responde perguntas, cria resumos e ajuda a estudar com base exatamente nesses materiais.",
      },
      {
        id: 4,
        pergunta: "O que significa uma ferramenta ser 'freemium'?",
        opcoes: [
          "Ela é completamente gratuita e sem limitações",
          "Ela é paga e exige assinatura mensal obrigatória",
          "Ela tem uma versão gratuita com recursos limitados e versão paga com mais funcionalidades",
          "Ela é gratuita apenas para estudantes universitários",
        ],
        correta: 2,
        explicacao:
          "Freemium significa que a ferramenta oferece acesso gratuito a recursos básicos e cobra para recursos avançados. Muitas ferramentas de IA para educadores — como ChatGPT, Canva e Gamma — funcionam nesse modelo.",
      },
      {
        id: 5,
        pergunta: "Ao escolher uma ferramenta de IA para usar com alunos, o educador deve verificar:",
        opcoes: [
          "Se a ferramenta tem o logo mais bonito",
          "Quantos seguidores a empresa tem nas redes sociais",
          "A política de privacidade e se a ferramenta é adequada para a faixa etária dos alunos",
          "Se a ferramenta foi criada por uma empresa brasileira",
        ],
        correta: 2,
        explicacao:
          "Antes de usar qualquer ferramenta de IA com alunos, é fundamental verificar: política de privacidade (o que é feito com os dados), termos de uso (há restrição de idade?), e se a ferramenta é adequada ao contexto escolar.",
      },
    ],
  },

  "primeiros-prompts": {
    moduloSlug: "primeiros-prompts",
    titulo: "Quiz — Primeiros Prompts",
    descricao: "Avalie sua compreensão sobre como escrever prompts eficazes para IAs.",
    pontuacaoMinima: 70,
    questoes: [
      {
        id: 1,
        pergunta: "O que é um 'prompt' no contexto de IA?",
        opcoes: [
          "Um tipo de vírus de computador",
          "A instrução ou solicitação que você escreve para a IA",
          "O nome do servidor onde a IA está instalada",
          "Um arquivo de configuração do sistema",
        ],
        correta: 1,
        explicacao:
          "Prompt é a mensagem, instrução ou pergunta que você escreve para se comunicar com a IA. É como você 'conversa' com ela. A qualidade do prompt influencia diretamente a qualidade da resposta.",
      },
      {
        id: 2,
        pergunta: "Qual é a melhor forma de pedir um plano de aula para uma IA?",
        opcoes: [
          "\"Faça um plano de aula.\"",
          "\"Crie um plano de aula de 50 minutos sobre frações para alunos do 5º ano do Ensino Fundamental, usando atividades práticas com materiais concretos.\"",
          "\"Plano de aula.\"",
          "\"Você consegue fazer planos de aula?\"",
        ],
        correta: 1,
        explicacao:
          "Prompts específicos geram respostas muito mais úteis. Incluir: ano/série, disciplina, duração, conteúdo, metodologia desejada e contexto dos alunos faz toda a diferença na qualidade do resultado.",
      },
      {
        id: 3,
        pergunta: "O que é 'engenharia de prompt'?",
        opcoes: [
          "Uma forma de consertar computadores com defeito",
          "A arte e técnica de escrever instruções eficazes para obter melhores respostas da IA",
          "O processo de instalar uma IA em um servidor",
          "Uma linguagem de programação para criar IAs",
        ],
        correta: 1,
        explicacao:
          "Engenharia de prompt é a habilidade de estruturar suas solicitações de forma a orientar a IA para produzir respostas mais precisas, relevantes e úteis. É uma competência cada vez mais valorizada no uso profissional de IA.",
      },
      {
        id: 4,
        pergunta: "Se a IA deu uma resposta que não atendeu ao que você precisava, o que você deve fazer?",
        opcoes: [
          "Fechar a janela e nunca mais usar a IA",
          "Aceitar a resposta assim mesmo, pois a IA nunca erra",
          "Reformular o prompt com mais detalhes, exemplos ou contexto e tentar novamente",
          "Reiniciar o computador",
        ],
        correta: 2,
        explicacao:
          "A conversa com a IA é iterativa. Se a primeira resposta não foi boa, você pode refinar o prompt: adicionar mais contexto, especificar o formato desejado, dar exemplos ou pedir ajustes. A IA aprende com o contexto da conversa.",
      },
      {
        id: 5,
        pergunta: "Qual elemento NÃO é recomendado incluir em um prompt para a IA?",
        opcoes: [
          "O contexto da turma ou escola",
          "O formato da resposta desejada (lista, texto, tabela...)",
          "Dados pessoais identificáveis de alunos (nome completo, CPF)",
          "O objetivo pedagógico da atividade",
        ],
        correta: 2,
        explicacao:
          "Nunca inclua dados pessoais identificáveis de alunos em prompts de IA (nomes completos, CPF, endereço, situação familiar). Isso viola a privacidade e a LGPD. Use apenas informações genéricas como 'aluno do 3º ano com dificuldade em leitura'.",
      },
    ],
  },
};

export function buscarQuizPorSlug(slug: string): DadosQuiz | undefined {
  return QUIZZES[slug];
}
