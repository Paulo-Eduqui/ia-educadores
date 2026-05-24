// Página da Comunidade
import { redirect } from "next/navigation";
import { MessageCircle, Users, Shield, Star, ArrowRight } from "lucide-react";
import { criarClienteSupabaseServidor } from "@/lib/supabase/server";

export const metadata = { title: "Comunidade — IA Educadores" };

export default async function PaginaComunidade() {
  const supabase = await criarClienteSupabaseServidor();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const linkWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL || "https://chat.whatsapp.com/";

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Comunidade IA Educadores</h1>
        <p className="text-gray-500 mt-1">
          Um espaço para trocar experiências, prompts e dicas com outros educadores
        </p>
      </div>

      {/* Card principal de entrada */}
      <div className="bg-gradient-to-br from-verde to-verde/80 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-xl">Grupo no WhatsApp</h2>
            <p className="text-white/80 text-sm">Comunidade ativa de educadores</p>
          </div>
        </div>
        <p className="text-white/90 mb-6 text-sm leading-relaxed">
          Junte-se ao nosso grupo no WhatsApp e conecte-se com professores, coordenadores
          e gestores de todo o Acre que estão usando IA na educação. Compartilhe prompts,
          tire dúvidas e inspire outros colegas!
        </p>
        <a
          href={linkWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-verde px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-colors"
        >
          Entrar no grupo
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icone: <Users className="w-5 h-5 text-verde" />,       valor: "200+",  rotulo: "Educadores" },
          { icone: <MessageCircle className="w-5 h-5 text-azul" />, valor: "500+",  rotulo: "Prompts compartilhados" },
          { icone: <Star className="w-5 h-5 text-laranja" />,       valor: "5",     rotulo: "Municípios" },
        ].map((stat) => (
          <div key={stat.rotulo} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <div className="flex justify-center mb-2">{stat.icone}</div>
            <p className="text-xl font-bold text-gray-900">{stat.valor}</p>
            <p className="text-xs text-gray-500">{stat.rotulo}</p>
          </div>
        ))}
      </div>

      {/* Regras da comunidade */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-verde" />
          <h2 className="font-semibold text-gray-900">Regras da Comunidade</h2>
        </div>
        <ul className="space-y-2">
          {REGRAS.map((regra, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-600">
              <span className="text-verde font-bold flex-shrink-0">{i + 1}.</span>
              <span>{regra}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Últimas dicas */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Dicas Recentes da Comunidade</h2>
        <div className="space-y-4">
          {DICAS_COMUNIDADE.map((dica) => (
            <div key={dica.id} className="flex gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
              <div className="w-8 h-8 rounded-full bg-verde-claro flex items-center justify-center flex-shrink-0 text-sm font-bold text-verde">
                {dica.autor.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">{dica.mensagem}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {dica.autor} · {dica.funcao} · {dica.data}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const REGRAS = [
  "Respeite todos os membros — educação começa pelo exemplo",
  "Compartilhe prompts, experiências e recursos úteis para a educação",
  "Não envie spam, vendas ou conteúdo irrelevante",
  "Mantenha as discussões relacionadas à IA e educação",
  "Não compartilhe dados pessoais de alunos ou famílias",
  "Em caso de dúvida, peça ajuda com gentileza",
];

const DICAS_COMUNIDADE = [
  {
    id: 1,
    autor: "Maria José",
    funcao: "Professora",
    data: "Hoje",
    mensagem: "Dica: use o prompt 'Aja como um aluno de 5º ano e me faça perguntas sobre [TEMA]' para testar se sua explicação está clara o suficiente! Funcionou muito bem na minha turma.",
  },
  {
    id: 2,
    autor: "Carlos Alberto",
    funcao: "Coordenador Pedagógico",
    data: "Ontem",
    mensagem: "Novidade: descobri que o NotebookLM consegue criar um 'podcast' entre dois hosts discutindo o conteúdo do documento. Os professores estão amando para ouvir enquanto se preparam!",
  },
  {
    id: 3,
    autor: "Ana Paula",
    funcao: "Secretária Escolar",
    data: "2 dias atrás",
    mensagem: "Para quem trabalha com secretaria: criei um prompt que gera ofícios padronizados automaticamente. Economizei 2 horas de trabalho hoje. Posso compartilhar no grupo quem tiver interesse!",
  },
];
