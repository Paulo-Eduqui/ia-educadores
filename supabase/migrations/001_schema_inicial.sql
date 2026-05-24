-- ============================================================
-- IA Educadores — Schema Inicial do Banco de Dados
-- Executar no Supabase SQL Editor
-- ============================================================

-- PERFIS DE USUÁRIO (estende auth.users)
CREATE TABLE IF NOT EXISTS perfis (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nome        TEXT NOT NULL,
  email       TEXT NOT NULL,
  funcao      TEXT CHECK (funcao IN (
    'professor', 'mediador', 'assistente',
    'secretario', 'coordenador', 'gestor', 'outro'
  )),
  escola      TEXT,
  municipio   TEXT,
  estado      TEXT DEFAULT 'AC',
  avatar_url  TEXT,
  fase_atual  INTEGER DEFAULT 1,
  criado_em   TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW()
);

-- PROGRESSO POR MÓDULO
CREATE TABLE IF NOT EXISTS progresso (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id            UUID REFERENCES perfis(id) ON DELETE CASCADE NOT NULL,
  modulo_slug           TEXT NOT NULL,
  fase                  INTEGER NOT NULL,
  concluido             BOOLEAN DEFAULT FALSE,
  percentual            INTEGER DEFAULT 0 CHECK (percentual >= 0 AND percentual <= 100),
  tempo_total_segundos  INTEGER DEFAULT 0,
  iniciado_em           TIMESTAMPTZ DEFAULT NOW(),
  concluido_em          TIMESTAMPTZ,
  UNIQUE(usuario_id, modulo_slug)
);

-- RESULTADOS DE QUIZ
CREATE TABLE IF NOT EXISTS quiz_resultados (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id      UUID REFERENCES perfis(id) ON DELETE CASCADE NOT NULL,
  modulo_slug     TEXT NOT NULL,
  pontuacao       INTEGER NOT NULL CHECK (pontuacao >= 0),
  total_questoes  INTEGER NOT NULL CHECK (total_questoes > 0),
  aprovado        BOOLEAN GENERATED ALWAYS AS (
    (pontuacao::FLOAT / total_questoes::FLOAT) >= 0.7
  ) STORED,
  respostas       JSONB,
  feito_em        TIMESTAMPTZ DEFAULT NOW()
);

-- PROMPTS SALVOS PELO ALUNO
CREATE TABLE IF NOT EXISTS prompts_salvos (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id  UUID REFERENCES perfis(id) ON DELETE CASCADE NOT NULL,
  titulo      TEXT NOT NULL,
  conteudo    TEXT NOT NULL,
  categoria   TEXT,
  tags        TEXT[],
  publico     BOOLEAN DEFAULT FALSE,
  criado_em   TIMESTAMPTZ DEFAULT NOW()
);

-- ANOTAÇÕES POR MÓDULO
CREATE TABLE IF NOT EXISTS anotacoes (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id  UUID REFERENCES perfis(id) ON DELETE CASCADE NOT NULL,
  modulo_slug TEXT NOT NULL,
  conteudo    TEXT NOT NULL,
  criado_em   TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(usuario_id, modulo_slug)
);

-- CERTIFICADOS
CREATE TABLE IF NOT EXISTS certificados (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id          UUID REFERENCES perfis(id) ON DELETE CASCADE NOT NULL,
  fase                INTEGER NOT NULL CHECK (fase BETWEEN 1 AND 5),
  titulo_certificado  TEXT NOT NULL,
  carga_horaria       INTEGER NOT NULL,
  emitido_em          TIMESTAMPTZ DEFAULT NOW(),
  codigo_verificacao  TEXT UNIQUE DEFAULT gen_random_uuid()::TEXT
);

-- ============================================================
-- TRIGGER: Cria perfil automaticamente após cadastro
-- ============================================================
CREATE OR REPLACE FUNCTION criar_perfil_para_novo_usuario()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO perfis (id, nome, email, funcao, escola, municipio)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'funcao',
    NEW.raw_user_meta_data->>'escola',
    NEW.raw_user_meta_data->>'municipio'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER ao_criar_usuario
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION criar_perfil_para_novo_usuario();

-- ============================================================
-- ROW LEVEL SECURITY (RLS) — Cada usuário vê apenas seus dados
-- ============================================================
ALTER TABLE perfis         ENABLE ROW LEVEL SECURITY;
ALTER TABLE progresso      ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_resultados ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts_salvos ENABLE ROW LEVEL SECURITY;
ALTER TABLE anotacoes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificados   ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança

-- Perfis: cada usuário gerencia apenas o próprio
DROP POLICY IF EXISTS "perfis_proprio" ON perfis;
CREATE POLICY "perfis_proprio" ON perfis
  FOR ALL USING (auth.uid() = id);

-- Progresso: cada usuário gerencia apenas o próprio
DROP POLICY IF EXISTS "progresso_proprio" ON progresso;
CREATE POLICY "progresso_proprio" ON progresso
  FOR ALL USING (auth.uid() = usuario_id);

-- Quiz: cada usuário gerencia apenas o próprio
DROP POLICY IF EXISTS "quiz_proprio" ON quiz_resultados;
CREATE POLICY "quiz_proprio" ON quiz_resultados
  FOR ALL USING (auth.uid() = usuario_id);

-- Prompts: pode ver os próprios e os públicos, mas só edita os próprios
DROP POLICY IF EXISTS "prompts_leitura" ON prompts_salvos;
CREATE POLICY "prompts_leitura" ON prompts_salvos
  FOR SELECT USING (auth.uid() = usuario_id OR publico = TRUE);

DROP POLICY IF EXISTS "prompts_escrita" ON prompts_salvos;
CREATE POLICY "prompts_escrita" ON prompts_salvos
  FOR ALL USING (auth.uid() = usuario_id);

-- Anotações: cada usuário gerencia apenas as próprias
DROP POLICY IF EXISTS "anotacoes_proprias" ON anotacoes;
CREATE POLICY "anotacoes_proprias" ON anotacoes
  FOR ALL USING (auth.uid() = usuario_id);

-- Certificados: cada usuário vê apenas os próprios
DROP POLICY IF EXISTS "certificados_proprios" ON certificados;
CREATE POLICY "certificados_proprios" ON certificados
  FOR SELECT USING (auth.uid() = usuario_id);

-- ============================================================
-- ÍNDICES para melhorar performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_progresso_usuario    ON progresso(usuario_id);
CREATE INDEX IF NOT EXISTS idx_progresso_modulo     ON progresso(modulo_slug);
CREATE INDEX IF NOT EXISTS idx_quiz_usuario         ON quiz_resultados(usuario_id);
CREATE INDEX IF NOT EXISTS idx_prompts_usuario      ON prompts_salvos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_prompts_publico      ON prompts_salvos(publico) WHERE publico = TRUE;
CREATE INDEX IF NOT EXISTS idx_anotacoes_usuario    ON anotacoes(usuario_id);
CREATE INDEX IF NOT EXISTS idx_certificados_usuario ON certificados(usuario_id);
