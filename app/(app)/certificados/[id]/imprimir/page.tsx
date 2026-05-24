// Página de impressão do certificado — abre em nova aba
import { notFound, redirect } from "next/navigation";
import { criarClienteSupabaseServidor } from "@/lib/supabase/server";
import { FASES } from "@/lib/content/modulosData";

interface Props {
  params: { id: string };
}

function formatarDataExtenso(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PaginaImprimirCertificado({ params }: Props) {
  const supabase = await criarClienteSupabaseServidor();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Busca certificado e perfil em paralelo
  const [certRes, perfilRes] = await Promise.all([
    supabase
      .from("certificados")
      .select("*")
      .eq("id", params.id)
      .eq("usuario_id", user.id)
      .single(),
    supabase
      .from("perfis")
      .select("nome, funcao, escola, municipio")
      .eq("id", user.id)
      .single(),
  ]);

  if (certRes.error || !certRes.data) notFound();

  const cert = certRes.data;
  const perfil = perfilRes.data;
  const fase = FASES.find((f) => f.numero === cert.fase);

  const COR_FASE_HEX: Record<number, { primaria: string; secundaria: string; texto: string }> = {
    1: { primaria: "#1D9E75", secundaria: "#E1F5EE", texto: "#0f5c43" },
    2: { primaria: "#378ADD", secundaria: "#E6F1FB", texto: "#1a4a7a" },
    3: { primaria: "#7F77DD", secundaria: "#EEEDFE", texto: "#3d3799" },
    4: { primaria: "#BA7517", secundaria: "#FAEEDA", texto: "#6b4209" },
    5: { primaria: "#1D9E75", secundaria: "#E1F5EE", texto: "#0f5c43" },
  };

  const cor = COR_FASE_HEX[cert.fase] || COR_FASE_HEX[1];
  const dataEmissao = formatarDataExtenso(cert.emitido_em || cert.created_at);

  return (
    <>
      {/* Script para imprimir automaticamente */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.onload = function() { window.print(); }`,
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: #f8f9fa; }

        @media print {
          body { background: white; }
          .no-print { display: none !important; }
          @page { size: A4 landscape; margin: 0; }
        }

        .certificado {
          width: 297mm;
          height: 210mm;
          margin: 0 auto;
          background: white;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20mm 24mm;
        }

        .borda-decorativa {
          position: absolute;
          inset: 8mm;
          border: 3px solid ${cor.primaria};
          border-radius: 8px;
          pointer-events: none;
        }

        .borda-decorativa::before {
          content: '';
          position: absolute;
          inset: 4px;
          border: 1px solid ${cor.primaria}40;
          border-radius: 4px;
        }

        .canto {
          position: absolute;
          width: 12mm;
          height: 12mm;
          border-color: ${cor.primaria};
          border-style: solid;
        }
        .canto-tl { top: 5mm; left: 5mm; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
        .canto-tr { top: 5mm; right: 5mm; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
        .canto-bl { bottom: 5mm; left: 5mm; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
        .canto-br { bottom: 5mm; right: 5mm; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

        .logo-area { text-align: center; margin-bottom: 6mm; }
        .logo-icone { font-size: 28px; }
        .logo-texto {
          font-size: 11pt;
          font-weight: 600;
          color: ${cor.primaria};
          letter-spacing: 0.05em;
        }

        .titulo-cert {
          font-family: 'Playfair Display', serif;
          font-size: 10pt;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 4mm;
        }

        .nome-aluno {
          font-family: 'Playfair Display', serif;
          font-size: 26pt;
          color: #111827;
          text-align: center;
          margin-bottom: 4mm;
          line-height: 1.2;
        }

        .texto-central {
          font-size: 11pt;
          color: #4b5563;
          text-align: center;
          line-height: 1.6;
          max-width: 200mm;
          margin-bottom: 5mm;
        }

        .titulo-curso {
          font-family: 'Playfair Display', serif;
          font-size: 15pt;
          color: ${cor.texto};
          text-align: center;
          margin-bottom: 2mm;
        }

        .subtitulo-curso {
          font-size: 10pt;
          color: ${cor.primaria};
          text-align: center;
          margin-bottom: 6mm;
        }

        .info-bar {
          display: flex;
          gap: 8mm;
          justify-content: center;
          align-items: center;
          margin-bottom: 8mm;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1mm;
        }

        .info-valor {
          font-size: 13pt;
          font-weight: 700;
          color: ${cor.primaria};
        }

        .info-rotulo {
          font-size: 8pt;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .separador { width: 1px; height: 8mm; background: #e5e7eb; }

        .rodape {
          display: flex;
          gap: 16mm;
          justify-content: center;
          align-items: flex-end;
          margin-top: 2mm;
        }

        .assinatura {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2mm;
        }

        .linha-assinatura {
          width: 40mm;
          height: 1px;
          background: #d1d5db;
        }

        .assinatura-nome { font-size: 9pt; font-weight: 600; color: #374151; }
        .assinatura-cargo { font-size: 8pt; color: #9ca3af; }

        .codigo-cert {
          position: absolute;
          bottom: 10mm;
          right: 12mm;
          font-size: 7pt;
          color: #d1d5db;
          font-family: monospace;
        }

        .faixa-cor {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2mm;
          background: ${cor.primaria};
        }
        .faixa-cor-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2mm;
          background: ${cor.primaria};
        }
      `}</style>

      {/* Botão imprimir (some na impressão) */}
      <div
        className="no-print"
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 100,
          display: "flex",
          gap: 8,
        }}
      >
        <button
          onClick={() => window.print()}
          style={{
            background: cor.primaria,
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          🖨️ Imprimir
        </button>
        <button
          onClick={() => window.close()}
          style={{
            background: "#f3f4f6",
            color: "#374151",
            border: "none",
            padding: "10px 20px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Fechar
        </button>
      </div>

      {/* Certificado */}
      <div className="certificado">
        <div className="faixa-cor" />
        <div className="faixa-cor-bottom" />
        <div className="borda-decorativa" />
        <div className="canto canto-tl" />
        <div className="canto canto-tr" />
        <div className="canto canto-bl" />
        <div className="canto canto-br" />

        {/* Logo */}
        <div className="logo-area">
          <div className="logo-icone">🤖</div>
          <div className="logo-texto">IA EDUCADORES</div>
        </div>

        {/* Título */}
        <div className="titulo-cert">Certificado de Conclusão</div>

        {/* Nome */}
        <div className="nome-aluno">
          {perfil?.nome || user.email}
        </div>

        {/* Texto */}
        <p className="texto-central">
          {perfil?.funcao
            ? `${perfil.funcao}${perfil.escola ? ` da ${perfil.escola}` : ""}${perfil.municipio ? `, ${perfil.municipio}` : ""}, concluiu com êxito:`
            : "concluiu com êxito:"}
        </p>

        {/* Título do curso */}
        <div className="titulo-curso">{cert.titulo_certificado}</div>
        {fase && (
          <div className="subtitulo-curso">
            Fase {cert.fase} — {fase.titulo} · Formação em IA para a Educação
          </div>
        )}

        {/* Info bar */}
        <div className="info-bar">
          <div className="info-item">
            <span className="info-valor">{cert.carga_horaria}h</span>
            <span className="info-rotulo">Carga horária</span>
          </div>
          <div className="separador" />
          <div className="info-item">
            <span className="info-valor">Fase {cert.fase}</span>
            <span className="info-rotulo">de 5 fases</span>
          </div>
          <div className="separador" />
          <div className="info-item">
            <span className="info-valor">{dataEmissao}</span>
            <span className="info-rotulo">Data de emissão</span>
          </div>
        </div>

        {/* Rodapé com assinaturas */}
        <div className="rodape">
          <div className="assinatura">
            <div className="linha-assinatura" />
            <div className="assinatura-nome">Coordenação Pedagógica</div>
            <div className="assinatura-cargo">IA Educadores</div>
          </div>
          <div className="assinatura">
            <div className="linha-assinatura" />
            <div className="assinatura-nome">{perfil?.nome || "Participante"}</div>
            <div className="assinatura-cargo">{perfil?.funcao || "Educador"}</div>
          </div>
        </div>

        {/* Código */}
        <div className="codigo-cert">
          Código: {cert.id?.slice(0, 8).toUpperCase()}
        </div>
      </div>
    </>
  );
}
