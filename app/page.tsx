// Landing page pública — apresentação do curso
import Link from "next/link";
import {
  GraduationCap, CheckCircle, Users, Award, BookOpen,
  Lightbulb, Wrench, ArrowRight, Zap
} from "lucide-react";

export default function PaginaInicial() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-verde text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-bold text-gray-900">IA Educadores</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="text-sm bg-verde text-white px-4 py-2 rounded-lg font-semibold hover:bg-verde/90 transition-colors"
              >
                Começar grátis
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-verde-claro via-white to-azul-claro py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-verde/10 text-verde px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Formação 100% online e no seu ritmo
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Inteligência Artificial<br />
            <span className="text-verde">para Educadores</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            O curso completo de IA para professores, coordenadores, gestores e
            secretários. Do básico ao avançado, com aplicação prática no dia a dia escolar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cadastro"
              className="inline-flex items-center justify-center gap-2 bg-verde text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-verde/90 transition-colors shadow-lg shadow-verde/20"
            >
              Começar agora — é grátis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Já tenho conta
            </Link>
          </div>

          {/* Números */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-gray-100">
            {[
              { valor: "24",   rotulo: "módulos" },
              { valor: "80h",  rotulo: "de conteúdo" },
              { valor: "5",    rotulo: "certificados" },
              { valor: "100+", rotulo: "prompts prontos" },
            ].map((item) => (
              <div key={item.rotulo} className="text-center">
                <p className="text-3xl font-bold text-verde">{item.valor}</p>
                <p className="text-sm text-gray-500">{item.rotulo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Para quem é esse curso?</h2>
            <p className="text-gray-500 text-lg">Conteúdo personalizado para cada função na educação</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PUBLICOS.map((p) => (
              <div key={p.funcao} className="p-6 rounded-2xl border border-gray-100 hover:border-verde/20 hover:bg-verde-claro/50 transition-all">
                <span className="text-3xl mb-3 block">{p.icone}</span>
                <h3 className="font-bold text-gray-900 mb-2">{p.funcao}</h3>
                <p className="text-sm text-gray-500">{p.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* As 5 fases */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">O que você vai aprender</h2>
            <p className="text-gray-500 text-lg">5 fases progressivas, do básico à liderança</p>
          </div>
          <div className="space-y-4">
            {FASES.map((fase) => (
              <div key={fase.numero} className="flex gap-4 bg-white p-6 rounded-2xl border border-gray-100">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${fase.cor} text-white font-bold text-lg flex-shrink-0`}>
                  {fase.numero}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">Fase {fase.numero} — {fase.titulo}</h3>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {fase.cargaHoraria}h · {fase.modulos} módulos
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{fase.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O que está incluído */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">O que está incluído</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCLUIDOS.map((item) => (
              <div key={item.titulo} className="flex gap-3 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex-shrink-0 text-verde mt-0.5">{item.icone}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.titulo}</h3>
                  <p className="text-sm text-gray-500">{item.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4 bg-verde">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para transformar sua prática pedagógica?
          </h2>
          <p className="text-verde-claro text-lg mb-8">
            Junte-se a educadores de todo o Acre que já estão usando IA no dia a dia.
          </p>
          <Link
            href="/cadastro"
            className="inline-flex items-center gap-2 bg-white text-verde px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            Criar minha conta grátis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="py-8 px-4 bg-gray-900 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-verde text-white">
            <GraduationCap className="w-3.5 h-3.5" />
          </div>
          <span className="text-white font-semibold">IA Educadores</span>
        </div>
        <p className="text-gray-400 text-sm">
          Plataforma de formação em IA para profissionais da educação
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Senador Guiomard, Acre · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

// Dados da landing page
const PUBLICOS = [
  { funcao: "Professores",          icone: "👩‍🏫", descricao: "Planos de aula, atividades, avaliações e recursos didáticos com IA" },
  { funcao: "Mediadores",           icone: "🤝",  descricao: "Recursos personalizados para apoio a alunos com necessidades específicas" },
  { funcao: "Secretários",          icone: "📑",  descricao: "Documentos, comunicados, atas e processos administrativos automatizados" },
  { funcao: "Coordenadores",        icone: "📊",  descricao: "Análise de aprendizagem, formação de professores e projeto pedagógico" },
  { funcao: "Gestores / Diretores", icone: "🏫",  descricao: "Indicadores, planejamento estratégico e gestão da equipe" },
  { funcao: "Outros profissionais", icone: "⭐",  descricao: "Qualquer pessoa que trabalhe com educação e queira usar IA" },
];

const FASES = [
  { numero: 1, titulo: "Fundamentos", cargaHoraria: 12, modulos: 4,  cor: "bg-verde",    descricao: "O que é IA, IA generativa, ética e ecossistema de ferramentas" },
  { numero: 2, titulo: "Prompts",     cargaHoraria: 16, modulos: 5,  cor: "bg-azul",     descricao: "Do básico ao avançado, com biblioteca colaborativa de prompts" },
  { numero: 3, titulo: "Aplicações",  cargaHoraria: 20, modulos: 7,  cor: "bg-roxo",     descricao: "Conteúdo específico para cada função na escola" },
  { numero: 4, titulo: "Integração",  cargaHoraria: 20, modulos: 5,  cor: "bg-laranja",  descricao: "Automação, dados, assistentes personalizados e política de IA" },
  { numero: 5, titulo: "Liderança",   cargaHoraria: 12, modulos: 3,  cor: "bg-vermelho", descricao: "Formar sua equipe e liderar a transformação digital da escola" },
];

const INCLUIDOS = [
  { icone: <BookOpen className="w-5 h-5" />,    titulo: "24 módulos completos", descricao: "80 horas de conteúdo teórico e prático, do básico ao avançado" },
  { icone: <Lightbulb className="w-5 h-5" />,   titulo: "100+ prompts prontos", descricao: "Biblioteca de prompts para todas as funções e situações escolares" },
  { icone: <Wrench className="w-5 h-5" />,      titulo: "Guia de ferramentas",  descricao: "Catálogo completo com as melhores ferramentas de IA para educadores" },
  { icone: <Award className="w-5 h-5" />,       titulo: "5 certificados",       descricao: "Um certificado ao concluir cada fase, com carga horária reconhecida" },
  { icone: <Users className="w-5 h-5" />,       titulo: "Comunidade ativa",     descricao: "Grupo de WhatsApp com educadores compartilhando dicas e prompts" },
  { icone: <CheckCircle className="w-5 h-5" />, titulo: "Acesso vitalício",     descricao: "Acesse quando e onde quiser, no celular ou computador" },
];
