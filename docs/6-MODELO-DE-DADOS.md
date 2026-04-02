# 🗄️ MODELO DE DADOS - INFLUENCY v2

**Versão:** 2.0.0  
**Data:** 07/03/2026  
**SGBD:** PostgreSQL 15 (Supabase)  
**Status:** ✅ ESPECIFICAÇÃO COMPLETA

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Lista de Tabelas](#lista-de-tabelas)
3. [Funções e Triggers](#funções-e-triggers)
4. [Schemas SQL](#schemas-sql)
5. [Row-Level Security (RLS)](#row-level-security-rls)
6. [Índices e Performance](#índices-e-performance)
7. [Extensões PostgreSQL](#extensões-postgresql)

---

## 🎯 VISÃO GERAL

### Princípios de Design

1. **Isolamento por Usuário:** Todas as tabelas têm `user_id` com RLS
2. **JSONB para Flexibilidade:** Dados semi-estruturados em JSONB
3. **Triggers Automáticos:** Campos calculados automaticamente
4. **Soft Delete:** Deleção lógica com `deleted_at`
5. **Auditoria:** `created_at` e `updated_at` em todas as tabelas

### Extensões Necessárias

```sql
-- Vetores para RAG (Learning System)
CREATE EXTENSION IF NOT EXISTS vector;

-- UUID v4
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Funções de texto
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

---

## 📊 LISTA DE TABELAS

### Tabelas Principais (10)

1. **users** - Usuários (estendida do Supabase Auth)
2. **business_profiles** - Business DNA
3. **scripts** - Roteiros gerados
4. **videos** - Vídeos gravados e editados
5. **carousels** - Carrosséis gerados
6. **posts** - Posts agendados/publicados
7. **assets** - Assets de marca (logo, intro, outro, watermark)
8. **assistant_conversations** - Conversas com assistente IA
9. **social_accounts** - Contas de redes sociais conectadas
10. **analytics_cache** - Cache de métricas de posts

### Tabelas de Sistema (2)

11. **api_usage** - Tracking de uso de APIs externas
12. **notifications** - Notificações push

**Total:** 12 tabelas

---

## 🔧 FUNÇÕES E TRIGGERS

### Função: update_updated_at_column()

```sql
-- ============================================
-- TRIGGER FUNCTION: updated_at automático
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Função: calculate_word_count()

```sql
-- ============================================
-- TRIGGER FUNCTION: word_count automático
-- ============================================
CREATE OR REPLACE FUNCTION calculate_word_count()
RETURNS TRIGGER AS $$
BEGIN
  NEW.word_count = array_length(
    regexp_split_to_array(TRIM(NEW.content), '\s+'), 
    1
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Função: calculate_estimated_duration()

```sql
-- ============================================
-- TRIGGER FUNCTION: estimated_duration automático
-- ============================================
CREATE OR REPLACE FUNCTION calculate_estimated_duration()
RETURNS TRIGGER AS $$
BEGIN
  -- 150 palavras por minuto (média de leitura)
  NEW.estimated_duration = CEIL((NEW.word_count::float / 150) * 60);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## 📝 SCHEMAS SQL

### 1. users (Estendida do Supabase Auth)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  avatar_url TEXT,
  
  -- Preferências (JSONB)
  preferences JSONB DEFAULT '{
    "language": "pt-BR",
    "theme": "light",
    "notifications_enabled": true,
    "voice_enabled": true,
    "auto_post": false,
    "default_networks": ["instagram", "tiktok"]
  }'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Trigger para updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_deleted_at ON users(deleted_at) WHERE deleted_at IS NULL;
```

### 2. business_profiles (Business DNA)

```sql
CREATE TABLE business_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Dados do Business DNA
  niche TEXT NOT NULL, -- "Consultoria de carreira"
  target_audience TEXT NOT NULL, -- "Mulheres 25-40 anos"
  tone_of_voice TEXT NOT NULL, -- "Profissional e empática"
  objectives TEXT[] NOT NULL, -- ["Aumentar engajamento", "Gerar leads"]
  products_services TEXT NOT NULL, -- "Mentoria 1:1, Cursos online"
  
  -- Estilo Visual (JSONB)
  visual_style JSONB DEFAULT '{
    "primary_color": "#6200EE",
    "secondary_color": "#03DAC6",
    "font_family": "Inter",
    "logo_position": "top-right"
  }'::jsonb,
  
  -- Redes Sociais Conectadas
  connected_networks TEXT[] DEFAULT ARRAY[]::TEXT[], -- ["instagram", "tiktok"]
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Trigger para updated_at
CREATE TRIGGER update_business_profiles_updated_at
  BEFORE UPDATE ON business_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX idx_business_profiles_user_id ON business_profiles(user_id);
CREATE UNIQUE INDEX idx_business_profiles_user_id_unique 
  ON business_profiles(user_id) 
  WHERE deleted_at IS NULL;
```

### 3. scripts (Roteiros Gerados)

```sql
CREATE TABLE scripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Conteúdo
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  word_count INTEGER, -- Calculado automaticamente
  estimated_duration INTEGER, -- Segundos (calculado automaticamente)
  
  -- Metadados
  topic TEXT NOT NULL, -- "Como aumentar engajamento no Instagram"
  source TEXT NOT NULL, -- "ai_generated" | "url_analysis" | "manual"
  source_url TEXT, -- URL de origem (se source = "url_analysis")
  
  -- Viral Score (Learning System)
  viral_score FLOAT, -- 0.0 a 1.0 (calculado após publicação)
  embedding vector(1536), -- Embedding OpenAI para RAG
  
  -- Status
  status TEXT DEFAULT 'draft', -- "draft" | "used" | "archived"

> ℹ️ O campo `embedding` (vector 1536) e `viral_score` na tabela `scripts` são os pilares do sistema RAG. Scripts virais são identificados pelo `viral_score` alto — não existe tabela separada `viral_scripts`. O learning system opera inteiramente sobre a tabela `scripts`.
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Triggers
CREATE TRIGGER update_scripts_updated_at
  BEFORE UPDATE ON scripts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER calculate_scripts_word_count
  BEFORE INSERT OR UPDATE OF content ON scripts
  FOR EACH ROW
  EXECUTE FUNCTION calculate_word_count();

CREATE TRIGGER calculate_scripts_duration
  BEFORE INSERT OR UPDATE OF word_count ON scripts
  FOR EACH ROW
  EXECUTE FUNCTION calculate_estimated_duration();

-- Índices
CREATE INDEX idx_scripts_user_id ON scripts(user_id);
CREATE INDEX idx_scripts_status ON scripts(status);
CREATE INDEX idx_scripts_viral_score ON scripts(viral_score DESC) WHERE viral_score IS NOT NULL;
CREATE INDEX idx_scripts_embedding ON scripts USING ivfflat (embedding vector_cosine_ops);
```

### 4. videos (Vídeos Gravados e Editados)

```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  script_id UUID REFERENCES scripts(id) ON DELETE SET NULL,
  
  -- Arquivos
  raw_video_url TEXT NOT NULL, -- Cloudflare R2
  edited_video_url TEXT, -- Cloudflare R2 (após edição)
  thumbnail_url TEXT, -- Cloudflare R2
  
  -- Metadados
  title TEXT NOT NULL,
  duration INTEGER NOT NULL, -- Segundos
  resolution TEXT DEFAULT '1080x1920', -- 9:16 (vertical)
  file_size INTEGER, -- Bytes
  
  -- Edição
  has_subtitles BOOLEAN DEFAULT FALSE,
  has_music BOOLEAN DEFAULT FALSE,
  has_assets BOOLEAN DEFAULT FALSE, -- Logo, intro, outro, watermark
  
  -- Configurações de Edição (JSONB)
  edit_settings JSONB DEFAULT '{
    "subtitle_style": "default",
    "music_volume": 0.3,
    "cut_mode": "moderate"
  }'::jsonb,
  
  -- Status
  status TEXT DEFAULT 'raw', -- "raw" | "editing" | "processed" | "failed"
  processing_error TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Trigger
CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX idx_videos_user_id ON videos(user_id);
CREATE INDEX idx_videos_script_id ON videos(script_id);
CREATE INDEX idx_videos_status ON videos(status);
```

### 5. carousels (Carrosséis Gerados)

```sql
CREATE TABLE carousels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Conteúdo
  title TEXT NOT NULL,
  topic TEXT NOT NULL,
  
  -- Slides (JSONB Array)
  slides JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- Estrutura de cada slide:
  -- {
  --   "title": "Título do Slide",
  --   "content": "Texto do slide",
  --   "image_url": "https://...",
  --   "image_source": "pexels"
  -- }
  
  -- Metadados
  slide_count INTEGER NOT NULL DEFAULT 0,
  source TEXT NOT NULL, -- "ai_generated" | "manual"
  
  -- Status
  status TEXT DEFAULT 'draft', -- "draft" | "published" | "archived"
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Trigger
CREATE TRIGGER update_carousels_updated_at
  BEFORE UPDATE ON carousels
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX idx_carousels_user_id ON carousels(user_id);
CREATE INDEX idx_carousels_status ON carousels(status);
```

### 6. posts (Posts Agendados/Publicados)

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  video_id UUID REFERENCES videos(id) ON DELETE SET NULL,
  carousel_id UUID REFERENCES carousels(id) ON DELETE SET NULL,
  
  -- Conteúdo
  caption TEXT NOT NULL,
  hashtags TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Redes Sociais
  networks TEXT[] NOT NULL, -- ["instagram", "tiktok", "facebook"]
  
  -- Agendamento
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  
  -- Status
  status TEXT DEFAULT 'draft', -- "draft" | "scheduled" | "publishing" | "published" | "failed"
  
  -- IDs externos (Mixpost)
  mixpost_post_id TEXT,
  external_post_ids JSONB DEFAULT '{}'::jsonb,
  -- Estrutura:
  -- {
  --   "instagram": "post_id_123",
  --   "tiktok": "video_id_456"
  -- }
  
  -- Métricas (atualizadas periodicamente)
  metrics JSONB DEFAULT '{
    "views": 0,
    "likes": 0,
    "comments": 0,
    "shares": 0,
    "saves": 0
  }'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Trigger
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_video_id ON posts(video_id);
CREATE INDEX idx_posts_carousel_id ON posts(carousel_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_scheduled_at ON posts(scheduled_at) WHERE status = 'scheduled';
CREATE INDEX idx_posts_published_at ON posts(published_at DESC) WHERE published_at IS NOT NULL;
```

### 7. assets (Assets de Marca)

```sql
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Tipo de Asset
  asset_type TEXT NOT NULL, -- "logo" | "intro" | "outro" | "watermark"
  
  -- Arquivo
  file_url TEXT NOT NULL, -- Cloudflare R2
  file_name TEXT NOT NULL,
  file_size INTEGER, -- Bytes
  mime_type TEXT NOT NULL, -- "image/png" | "video/mp4"
  
  -- Configurações de Aplicação (JSONB)
  settings JSONB DEFAULT '{
    "position": "top-right",
    "opacity": 1.0,
    "duration": 3
  }'::jsonb,
  
  -- Auto-aplicação
  auto_apply BOOLEAN DEFAULT FALSE,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Trigger
CREATE TRIGGER update_assets_updated_at
  BEFORE UPDATE ON assets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX idx_assets_user_id ON assets(user_id);
CREATE INDEX idx_assets_type ON assets(asset_type);
CREATE INDEX idx_assets_active ON assets(is_active) WHERE is_active = TRUE;
```

### 8. assistant_conversations (Conversas com Assistente IA)

```sql
CREATE TABLE assistant_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Título da Conversa
  title TEXT, -- Gerado automaticamente a partir da primeira mensagem
  
  -- Mensagens (JSONB Array)
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- Estrutura de cada mensagem:
  -- {
  --   "role": "user" | "assistant",
  --   "content": "Texto da mensagem",
  --   "mode": "voice" | "text",
  --   "timestamp": "2026-03-07T10:30:00Z"
  -- }
  
  -- Contexto (para continuidade)
  context JSONB DEFAULT '{}'::jsonb,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Trigger
CREATE TRIGGER update_assistant_conversations_updated_at
  BEFORE UPDATE ON assistant_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX idx_assistant_conversations_user_id ON assistant_conversations(user_id);
CREATE INDEX idx_assistant_conversations_active ON assistant_conversations(is_active) WHERE is_active = TRUE;
```

### 9. social_accounts (Contas de Redes Sociais)

```sql
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Rede Social
  platform TEXT NOT NULL, -- "instagram" | "tiktok" | "facebook" | "youtube" | "linkedin"
  
  -- Dados da Conta
  account_id TEXT NOT NULL, -- ID externo da conta
  username TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  
  -- OAuth (Mixpost)
  access_token TEXT NOT NULL, -- Encrypted
  refresh_token TEXT, -- Encrypted
  token_expires_at TIMESTAMPTZ,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  last_sync_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Trigger
CREATE TRIGGER update_social_accounts_updated_at
  BEFORE UPDATE ON social_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX idx_social_accounts_user_id ON social_accounts(user_id);
CREATE INDEX idx_social_accounts_platform ON social_accounts(platform);
CREATE UNIQUE INDEX idx_social_accounts_unique 
  ON social_accounts(user_id, platform, account_id) 
  WHERE deleted_at IS NULL;
```

### 10. analytics_cache (Cache de Métricas)

```sql
CREATE TABLE analytics_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  
  -- Métricas Detalhadas (JSONB)
  metrics JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- Estrutura:
  -- {
  --   "instagram": {
  --     "views": 1500,
  --     "likes": 120,
  --     "comments": 15,
  --     "shares": 8,
  --     "saves": 25,
  --     "reach": 1200,
  --     "impressions": 1800
  --   },
  --   "tiktok": { ... }
  -- }
  
  -- Viral Score Calculado
  viral_score FLOAT, -- 0.0 a 1.0
  
  -- Timestamp do Cache
  cached_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger
CREATE TRIGGER update_analytics_cache_updated_at
  BEFORE UPDATE ON analytics_cache
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX idx_analytics_cache_user_id ON analytics_cache(user_id);
CREATE INDEX idx_analytics_cache_post_id ON analytics_cache(post_id);
CREATE INDEX idx_analytics_cache_viral_score ON analytics_cache(viral_score DESC) WHERE viral_score IS NOT NULL;
CREATE INDEX idx_analytics_cache_cached_at ON analytics_cache(cached_at DESC);
```

### 11. api_usage (Tracking de Uso de APIs)

```sql
CREATE TABLE api_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- API Utilizada
  api_name TEXT NOT NULL, -- "openrouter" | "whisper" | "mixpost" | "pexels" | etc.
  endpoint TEXT NOT NULL, -- "/v1/chat/completions"
  
  -- Custos
  tokens_used INTEGER, -- Para APIs baseadas em tokens
  cost_usd DECIMAL(10, 6), -- Custo em USD
  
  -- Metadados
  request_data JSONB, -- Dados da requisição (sem dados sensíveis)
  response_status INTEGER, -- HTTP status code
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_api_usage_user_id ON api_usage(user_id);
CREATE INDEX idx_api_usage_api_name ON api_usage(api_name);
CREATE INDEX idx_api_usage_created_at ON api_usage(created_at DESC);
```

### 12. notifications (Notificações Push)

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Conteúdo
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  
  -- Tipo
  notification_type TEXT NOT NULL, -- "post_published" | "video_processed" | "script_generated"
  
  -- Dados Relacionados (JSONB)
  data JSONB DEFAULT '{}'::jsonb,
  -- Estrutura:
  -- {
  --   "post_id": "uuid",
  --   "action": "view_post"
  -- }
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger
CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON notifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

---

## 🔒 ROW-LEVEL SECURITY (RLS)

### Habilitação Global

```sql
-- Habilitar RLS em todas as tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousels ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE assistant_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
```

### Policies Padrão (Exemplo: scripts)

```sql
-- ============================================
-- RLS POLICIES: scripts
-- ============================================

-- SELECT: Usuário só vê seus próprios scripts
CREATE POLICY "Users can view own scripts"
  ON scripts FOR SELECT
  USING (auth.uid() = user_id AND deleted_at IS NULL);

-- INSERT: Usuário só cria scripts para si mesmo
CREATE POLICY "Users can create own scripts"
  ON scripts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: Usuário só atualiza seus próprios scripts
CREATE POLICY "Users can update own scripts"
  ON scripts FOR UPDATE
  USING (auth.uid() = user_id AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Soft delete (atualiza deleted_at)
CREATE POLICY "Users can delete own scripts"
  ON scripts FOR UPDATE
  USING (auth.uid() = user_id AND deleted_at IS NULL)
  WITH CHECK (auth.uid() = user_id);
```

### Policies para Todas as Tabelas

**Aplicar o mesmo padrão de RLS para:**
- business_profiles
- videos
- carousels
- posts
- assets
- assistant_conversations
- social_accounts
- analytics_cache
- api_usage
- notifications

---

## 📈 ÍNDICES E PERFORMANCE

### Índices de Performance

```sql
-- Full-text search em scripts
CREATE INDEX idx_scripts_content_fts 
  ON scripts USING gin(to_tsvector('portuguese', content));

-- Full-text search em posts
CREATE INDEX idx_posts_caption_fts 
  ON posts USING gin(to_tsvector('portuguese', caption));

-- Busca por hashtags
CREATE INDEX idx_posts_hashtags 
  ON posts USING gin(hashtags);

-- Busca por redes sociais
CREATE INDEX idx_posts_networks 
  ON posts USING gin(networks);

-- Busca por objetivos do Business DNA
CREATE INDEX idx_business_profiles_objectives 
  ON business_profiles USING gin(objectives);
```

### Índices Compostos

```sql
-- Posts agendados por usuário e data
CREATE INDEX idx_posts_user_scheduled 
  ON posts(user_id, scheduled_at) 
  WHERE status = 'scheduled';

-- Vídeos processados por usuário
CREATE INDEX idx_videos_user_processed 
  ON videos(user_id, created_at DESC) 
  WHERE status = 'processed';

-- Scripts virais por usuário
CREATE INDEX idx_scripts_user_viral 
  ON scripts(user_id, viral_score DESC) 
  WHERE viral_score > 0.7;
```

---

## 🔌 EXTENSÕES POSTGRESQL

### Instalação de Extensões

```sql
-- UUID v4
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Vetores para RAG (Learning System)
CREATE EXTENSION IF NOT EXISTS vector;

-- Full-text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Funções de criptografia
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

### Configuração do pgvector

```sql
-- Criar índice IVFFlat para busca de similaridade
-- (usado no Learning System para encontrar scripts virais similares)
CREATE INDEX idx_scripts_embedding 
  ON scripts 
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
```

---

## 🔐 CRIPTOGRAFIA DE DADOS SENSÍVEIS

### API Keys (Fernet Encryption)

```python
# Backend: Criptografia de API keys
from cryptography.fernet import Fernet
import os

# Chave de criptografia (variável de ambiente)
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")
cipher = Fernet(ENCRYPTION_KEY.encode())

def encrypt_api_key(api_key: str) -> str:
    """Criptografa uma API key"""
    return cipher.encrypt(api_key.encode()).decode()

def decrypt_api_key(encrypted_key: str) -> str:
    """Descriptografa uma API key"""
    return cipher.decrypt(encrypted_key.encode()).decode()
```

### Campos Criptografados

- `social_accounts.access_token`
- `social_accounts.refresh_token`

---

## 📊 DIAGRAMA ER (Relacionamentos)

```
users (1) ──────────── (1) business_profiles
  │
  ├── (1:N) scripts
  │     └── (1:1) embedding (vector)
  │
  ├── (1:N) videos
  │     └── (N:1) scripts (opcional)
  │
  ├── (1:N) carousels
  │
  ├── (1:N) posts
  │     ├── (N:1) videos (opcional)
  │     └── (N:1) carousels (opcional)
  │
  ├── (1:N) assets
  │
  ├── (1:N) assistant_conversations
  │
  ├── (1:N) social_accounts
  │
  ├── (1:N) analytics_cache
  │     └── (N:1) posts
  │
  ├── (1:N) api_usage
  │
  └── (1:N) notifications
```

---

## 🚀 MIGRATIONS

### Ordem de Criação

1. Extensões
2. Funções e Triggers
3. Tabela `users`
4. Tabelas principais (business_profiles, scripts, videos, etc.)
5. Tabelas de sistema (api_usage, notifications)
6. Índices
7. RLS Policies

### Script de Migration Completo

```sql
-- ============================================
-- MIGRATION: Influency v2 - Schema Completo
-- ============================================

-- 1. Extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Funções e Triggers
-- (ver seção "Funções e Triggers" acima)

-- 3. Tabelas
-- (ver seção "Schemas SQL" acima)

-- 4. Índices
-- (ver seção "Índices e Performance" acima)

-- 5. RLS Policies
-- (ver seção "Row-Level Security" acima)
```

---

## 📚 REFERÊNCIAS

- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL 15 Docs](https://www.postgresql.org/docs/15/)
- [pgvector Extension](https://github.com/pgvector/pgvector)
- [Row-Level Security](https://www.postgresql.org/docs/15/ddl-rowsecurity.html)

---

**Última Atualização:** 07/03/2026  
**Versão:** 2.0.0  
**Status:** ✅ COMPLETO
