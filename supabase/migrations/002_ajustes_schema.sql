-- ============================================================
-- IA Educadores — Ajustes de schema (migração 002)
-- Execute no Supabase SQL Editor após a migração 001
-- ============================================================

-- 1. Adicionar coluna 'nome_completo' como alias de 'nome' na tabela perfis
--    (Mantemos 'nome' existente e adicionamos 'nome_completo' para exibição)
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS nome_completo TEXT;

-- Preenche nome_completo com o valor de nome onde estiver vazio
UPDATE perfis SET nome_completo = nome WHERE nome_completo IS NULL;

-- Trigger para manter sincronizados
CREATE OR REPLACE FUNCTION sincronizar_nome_perfil()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.nome IS DISTINCT FROM OLD.nome AND NEW.nome_completo IS NOT DISTINCT FROM OLD.nome_completo THEN
    NEW.nome_completo := NEW.nome;
  END IF;
  IF NEW.nome_completo IS DISTINCT FROM OLD.nome_completo AND NEW.nome IS NOT DISTINCT FROM OLD.nome THEN
    NEW.nome := NEW.nome_completo;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sincronizar_nome ON perfis;
CREATE TRIGGER trg_sincronizar_nome
  BEFORE UPDATE ON perfis
  FOR EACH ROW EXECUTE FUNCTION sincronizar_nome_perfil();

-- 2. Política RLS para inserção de certificados pelo próprio usuário
DROP POLICY IF EXISTS "certificados_insert_proprio" ON certificados;
CREATE POLICY "certificados_insert_proprio" ON certificados
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

-- Atualiza a política de SELECT para cobrir tudo
DROP POLICY IF EXISTS "certificados_proprios" ON certificados;
CREATE POLICY "certificados_select_proprio" ON certificados
  FOR SELECT USING (auth.uid() = usuario_id);

-- 3. Ajuste quiz_resultados: a coluna 'aprovado' é GENERATED ALWAYS
--    Garantir que a definição está correta (idempotente se já existir)
-- Não é necessário recriar, apenas documentamos:
-- aprovado BOOLEAN GENERATED ALWAYS AS ((pontuacao::FLOAT / total_questoes::FLOAT) >= 0.7) STORED

-- 4. Índice adicional para quiz por módulo
CREATE INDEX IF NOT EXISTS idx_quiz_modulo ON quiz_resultados(modulo_slug);
CREATE INDEX IF NOT EXISTS idx_quiz_feito_em ON quiz_resultados(feito_em DESC);

-- 5. Adicionar coluna 'acertos' na quiz_resultados para rastrear quantidade certa
ALTER TABLE quiz_resultados ADD COLUMN IF NOT EXISTS acertos INTEGER DEFAULT 0;

-- 6. Garantir que anotacoes.atualizado_em é atualizado automaticamente
CREATE OR REPLACE FUNCTION atualizar_timestamp()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_anotacoes_atualizado ON anotacoes;
CREATE TRIGGER trg_anotacoes_atualizado
  BEFORE UPDATE ON anotacoes
  FOR EACH ROW EXECUTE FUNCTION atualizar_timestamp();
