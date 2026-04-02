# 📚 DOCUMENTAÇÃO TÉCNICA COMPLETA - INFLUENCY v2

**Versão:** 2.0.0  
**Data:** 07/03/2026  
**Status:** ✅ ESPECIFICAÇÃO FINAL APROVADA  
**Autor:** Kiro AI Assistant

---

## 📋 VISÃO GERAL

Esta é a documentação técnica completa do Influency v2 - um aplicativo mobile que ajuda consultoras, coaches e terapeutas a criar vídeos profissionais para redes sociais usando IA.

**Diferencial Principal:** Assistente IA com interface híbrida (voz + texto) que conduz todo o processo de criação de conteúdo de forma conversacional.

**⚠️ IMPORTANTE:** Este é um projeto **DO ZERO**. Não vamos usar o código existente em `influency-mobile/`. Vamos criar uma nova estrutura limpa, otimizada e sem déficits técnicos.

**Arquitetura Nova:**
- **3 tabs principais:** Assistente (conversacional), Biblioteca, Configurações
- **51 telas totais** (vs 91 telas do projeto antigo)
- **Assistente IA como tela principal** (não periférico)
- **Telas visuais como modals** (quando necessário)
- **Design criado com Stitch MCP** (Fase 0 do roadmap)

---

## 🎯 PÚBLICO-ALVO

- **Consultoras** (nutrição, estética, finanças)
- **Coaches** (vida, carreira, emagrecimento)
- **Terapeutas** (psicologia, terapias alternativas)
- **Profissionais liberais** que usam redes sociais para atrair clientes

**Premissa de Uso:** 8 vídeos/mês (não produtoras profissionais)

---

## 📖 ÍNDICE DA DOCUMENTAÇÃO

### 1. [README.md](./README.md) ⭐ Você está aqui
Índice geral e visão do projeto

### 2. [SUMARIO-EXECUTIVO.md](./SUMARIO-EXECUTIVO.md)
- Proposta de valor
- Diferencial competitivo
- Métricas de sucesso
- ROI esperado
- Custos consolidados

### 3. [PRD.md](./PRD.md) - Product Requirements Document
- Visão do produto
- Funcionalidades principais
- Requisitos funcionais e não-funcionais
- Critérios de sucesso

### 4. [ARQUITETURA-BACKEND.md](./ARQUITETURA-BACKEND.md)
- Stack tecnológico
- Estrutura de módulos
- Padrões de código
- Infraestrutura

### 5. [ARQUITETURA-FRONTEND.md](./ARQUITETURA-FRONTEND.md)
- React Native + Expo
- Navegação (3 tabs)
- Gerenciamento de estado
- Estrutura de pastas

### 6. [MODELO-DE-DADOS.md](./MODELO-DE-DADOS.md)
- Schema PostgreSQL (12 tabelas)
- RLS Policies
- Triggers automáticos
- Arquitetura RAG

### 7. [ENDPOINTS-API.md](./ENDPOINTS-API.md)
- ~80 endpoints REST
- Pydantic models
- Rate limiting por plano
- Autenticação JWT

### 8. [INTEGRACOES.md](./INTEGRACOES.md)
- 9 integrações externas
- Custos operacionais
- API keys e configuração
- Fluxos de integração

### 9. [FLUXOS-USUARIO.md](./FLUXOS-USUARIO.md)
- 18 fluxos principais
- Jornadas de usuário
- Diagramas de fluxo
- Casos de uso

### 10. [ESPECIFICACAO-TELAS.md](./ESPECIFICACAO-TELAS.md)
- 51 telas especificadas
- Componentes por tela
- Exemplos de código TypeScript
- Endpoints API por tela

### 11. [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)
- Material Design 3
- Paleta de cores
- Tipografia (Inter)
- Componentes base

### 12. [GAPS-E-MELHORIAS.md](./GAPS-E-MELHORIAS.md) ⭐ NOVO
- Gaps identificados (4 itens)
- Roadmap de implementação
- Priorização e estimativas
- Checklist de implementação
- Visão do produto
- Personas detalhadas
- Casos de uso
- Funcionalidades principais
- Requisitos não-funcionais
- Métricas de sucesso

### 4. [ARQUITETURA-BACKEND.md](./ARQUITETURA-BACKEND.md)
- Stack tecnológico
- Estrutura de módulos (FastAPI)
- Workers assíncronos (Celery + Redis)
- Integrações externas
- Segurança e autenticação
- Escalabilidade

### 5. [ARQUITETURA-FRONTEND.md](./ARQUITETURA-FRONTEND.md)
- Stack tecnológico (React Native + Expo)
- Estrutura de pastas
- Navegação (React Navigation)
- Gerenciamento de estado
- Componentes reutilizáveis
- Assistente IA híbrido (voz + texto)

### 6. [MODELO-DE-DADOS.md](./MODELO-DE-DADOS.md)
- Schema SQL completo (Supabase/PostgreSQL)
- 15 tabelas com relacionamentos
- RLS Policies (Row Level Security)
- Triggers SQL automáticos
- Índices e otimizações
- Extensão pgvector (RAG)

### 7. [ENDPOINTS-API.md](./ENDPOINTS-API.md)
- ~80 endpoints REST
- Pydantic Models completos
- Request/Response schemas
- Autenticação e autorização
- Rate limiting
- Exemplos de uso

### 8. [INTEGRACOES.md](./INTEGRACOES.md)
- 9 integrações externas
- Self-Service vs RENUM gerenciado
- Custos por integração
- Implementação técnica
- Fallbacks e error handling

### 9. [FLUXOS-USUARIO.md](./FLUXOS-USUARIO.md)
- 9 fluxos principais passo a passo
- Diagramas de sequência
- Interações com assistente IA
- Casos de erro
- Navegação entre telas

### 10. [ESPECIFICACAO-TELAS.md](./ESPECIFICACAO-TELAS.md)
- 45 telas especificadas
- Componentes React Native
- Props e estados
- Navegação
- Integrações com backend

### 11. [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)
- Paleta de cores
- Tipografia
- Espaçamento
- Componentes base
- Padrões de interação
- Acessibilidade

---

## 🏗️ ARQUITETURA GERAL

### Stack Tecnológico

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Mobile)                     │
│                                                          │
│  React Native 0.73+ + Expo 50+                          │
│  TypeScript                                              │
│  React Navigation (Nested Stacks)                       │
│  @react-native-voice/voice (reconhecimento)             │
│  expo-speech (síntese de voz)                           │
│  @siteed/expo-audio-studio (streaming de áudio)         │
│  expo-camera (gravação de vídeo)                        │
│                                                          │
└─────────────────────────────────────────────────────────┘
                            ↕ REST API
┌─────────────────────────────────────────────────────────┐
│                    BACKEND (API)                         │
│                                                          │
│  FastAPI 0.109+ (Python 3.11+)                          │
│  Celery + Redis (workers assíncronos)                   │
│  Pydantic (validação)                                   │
│  JWT (autenticação)                                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│                    DATABASE & STORAGE                    │
│                                                          │
│  Supabase (PostgreSQL 15 + Auth + Storage)              │
│  pgvector (embeddings para RAG)                         │
│  Cloudflare R2 (vídeos)                                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│                    INTEGRAÇÕES EXTERNAS                  │
│                                                          │
│  OpenRouter (Claude Sonnet 4 + Haiku)                   │
│  Whisper API (transcrição)                              │
│  Mixpost Pro/Enterprise (publicação multi-rede)         │
│  Tavily (busca web)                                     │
│  Pexels/Unsplash (imagens)                              │
│  Pixabay (música)                                       │
│  FFmpeg (processamento de vídeo)                        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 MÓDULOS DO PRODUTO

### 1. Assistente IA (Interface Híbrida)
**Descrição:** Interface conversacional com voz + texto integrados  
**Tecnologias:** @react-native-voice/voice + expo-speech + OpenRouter  
**Diferencial:** Usuário pode falar OU digitar a qualquer momento, sem trocar de modo

### 2. Business DNA
**Descrição:** Onboarding conversacional que captura nicho, tom, estilo  
**Tecnologias:** Assistente IA + Mixpost OAuth  
**Output:** Perfil completo do usuário para personalização

### 3. Script AI
**Descrição:** Geração de roteiros personalizados com IA  
**Tecnologias:** Tavily (busca) + Claude Sonnet 4 + Business DNA + RAG  
**Diferencial:** Roteiros melhoram com base em vídeos virais

### 4. Gravação + Teleprompter
**Descrição:** Gravação de vídeo com teleprompter inteligente  
**Tecnologias:** expo-camera + @siteed/expo-audio-studio + VAD  
**Modos:** Scroll manual OU sincronizado por voz

### 5. Edição de Vídeo
**Descrição:** Edição automática com legendas, música e cortes  
**Tecnologias:** Whisper + FFmpeg + Pixabay  
**Features:** Legendas automáticas, cortes de erros (3 níveis), música, assets

### 6. Carrosséis
**Descrição:** Geração de carrosséis de imagens  
**Tecnologias:** OpenRouter + Pexels/Unsplash + Pillow  
**Input:** Tema ou URL → Output: Carrossel pronto

### 7. Análise de URL
**Descrição:** Transcreve vídeo público e gera roteiro autoral  
**Tecnologias:** yt-dlp + Whisper + Claude  
**Uso:** Inspiração em vídeos de outros criadores

### 8. Agendamento e Postagem
**Descrição:** Publicação multi-rede com legendas e hashtags IA  
**Tecnologias:** Mixpost API + Claude  
**Redes:** Instagram, TikTok, Facebook, YouTube, LinkedIn

### 9. Viral Score + RAG
**Descrição:** Aprende com vídeos virais para melhorar roteiros  
**Tecnologias:** Mixpost Analytics + pgvector + OpenAI Embeddings  
**Diferencial:** Sistema de aprendizado contínuo

---

## 💰 CUSTOS OPERACIONAIS

### Premissa Realista
- **1000 usuários ativos**
- **8 vídeos/usuário/mês**
- **Público:** Consultoras, coaches, terapeutas

> 💡 Para custos operacionais detalhados, consulte [SUMARIO-EXECUTIVO.md](./SUMARIO-EXECUTIVO.md) e [INTEGRACOES.md](./INTEGRACOES.md) — fontes de verdade para custos.

---

## 📊 MÉTRICAS DE SUCESSO

### Produto
- **Retenção D30:** >30%
- **Taxa de conclusão:** >70%
- **Posts/semana:** 5-7
- **NPS:** >9/10
- **Tempo de criação:** <10 min/vídeo

### Negócio
- **MRR:** R$ 267.000 (1000 usuários)
- **ARR:** R$ 3.204.000
- **Churn:** <5%
- **LTV:** R$ 3.204 (12 meses × R$ 267)
- **Margem:** 87-96% (varia com volume de produção por usuário)

---

## 🚀 ROADMAP DE IMPLEMENTAÇÃO

**IMPORTANTE:** Este é um projeto DO ZERO. Não vamos usar o código existente em `influency-mobile/`.

### Fase 0: Design & Prototipação ✅ CONCLUÍDA
**Objetivo:** Criar todas as telas do app usando Stitch (MCP)

**Arquitetura:**
- **3 tabs principais:** Assistente, Biblioteca, Configurações
- **51 telas totais** (arquitetura híbrida IA-first)
- **Assistente como tela principal** (conversacional)
- **Telas visuais como modals** (quando necessário)

**Entregas:**
- ✅ Projeto Stitch completo com todas as telas (ID: 15962214627344849757)
- ✅ Design System extraído ([stitch-output/DESIGN.md](../stitch-output/DESIGN.md))
- ✅ Fluxos de navegação definidos ([stitch-output/NAVIGATION.md](../stitch-output/NAVIGATION.md))
- ✅ Componentes React Native documentados ([stitch-output/COMPONENTS.md](../stitch-output/COMPONENTS.md))
- ✅ Guia de conversão completo ([stitch-output/CONVERSION-GUIDE.md](../stitch-output/CONVERSION-GUIDE.md))

**Status:** ✅ CONCLUÍDA em 08/03/2026

---

### Fase 1: Fundação Backend
**Objetivo:** Infraestrutura base e autenticação

**Entregas:**
- Setup FastAPI + Supabase + Redis + Celery
- Auth Module (login, refresh, logout)
- Users Module (profile, preferences)
- Docker + Docker Compose
- Deploy Railway (staging)

**Dependências:** Fase 0 concluída (para entender requisitos)

---

### Fase 2: Frontend Mobile Base
**Objetivo:** Estrutura do app React Native + Expo

**Entregas:**
- Setup Expo + TypeScript
- Navegação (3 tabs + stacks aninhados)
- Componentes base do Design System
- Integração com backend (Auth)
- Telas de autenticação funcionais

**Dependências:** Fase 0 (design) + Fase 1 (backend auth)

---

### Fase 3: IA Core
**Objetivo:** Módulos de IA (assistente e roteiros)

**Backend:**
- Scripts Module (geração com OpenRouter)
- Assistant Module (chat híbrido voz + texto)
- Onboarding Module (Business DNA)

**Frontend:**
- Telas do Assistente IA (voz + texto)
- Telas de geração de roteiros
- Onboarding conversacional

**Dependências:** Fase 1 + Fase 2

---

### Fase 4: Gravação & Edição
**Objetivo:** Módulos de vídeo

**Backend:**
- Videos Module (upload, processamento, legendas)
- Workers Celery (Whisper, FFmpeg)

**Frontend:**
- Telas de gravação + teleprompter
- Telas de edição de vídeo
- Preview e biblioteca de vídeos

**Dependências:** Fase 3

---

### Fase 5: Social & Posting
**Objetivo:** Publicação multi-rede

**Backend:**
- Social Module (OAuth com Mixpost)
- Posts Module (agendamento, publicação)
- Geração de legendas e hashtags (Claude)

**Frontend:**
- Telas de seleção de redes
- Telas de agendamento
- Calendário de posts

**Dependências:** Fase 4

---

### Fase 6: Features Avançadas
**Objetivo:** Carrosséis, análise de URL, RAG

**Backend:**
- Carousels Module (geração com Pexels/Unsplash)
- URL Analysis Module (yt-dlp + Whisper)
- Analytics Module (métricas e insights)
- Viral Score + RAG (pgvector)

**Frontend:**
- Telas de carrosséis
- Telas de análise de URL
- Telas de analytics

**Dependências:** Fase 5

---

### Fase 7: Polimento & Produção
**Objetivo:** Preparar para lançamento

**Entregas:**
- Deploy Railway (produção)
- Monitoring (Sentry + Flower)
- Testes E2E (Detox)
- Documentação completa
- Performance otimizada
- Build iOS + Android (EAS)

**Dependências:** Fase 6

---

**Sequência Real:** Fase 0 → Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5 → Fase 6 → Fase 7


## 🔐 SEGURANÇA E COMPLIANCE

### Autenticação
- JWT tokens (access + refresh)
- Supabase Auth
- OAuth para redes sociais (via Mixpost)

### Autorização
- Row Level Security (RLS) em todas as tabelas
- Isolamento total de dados por usuário
- Zero compartilhamento entre usuários

### Privacidade
- LGPD/GDPR compliant
- Opt-in para learning global
- Dados anônimos e agregados
- Direito ao esquecimento

### Criptografia
- API keys criptografadas (Fernet)
- HTTPS obrigatório
- Tokens com expiração

---

## 📝 CONVENÇÕES DE CÓDIGO

### Backend (Python)
- PEP 8 style guide
- Type hints obrigatórios
- Docstrings em português
- Testes unitários (pytest)

### Frontend (TypeScript)
- ESLint + Prettier
- Componentes funcionais
- Hooks personalizados
- Testes com Jest + React Native Testing Library

### Git
- Conventional Commits
- Branch naming: `feature/`, `fix/`, `refactor/`
- Pull Requests obrigatórios
- Code review antes de merge

---

## 🧪 TESTES

### Backend
- Testes unitários (pytest)
- Testes de integração (pytest + httpx)
- Cobertura mínima: 80%

### Frontend
- Testes unitários (Jest)
- Testes de componentes (React Native Testing Library)
- Testes E2E (Detox)
- Cobertura mínima: 70%

---

## 📞 SUPORTE E CONTATO

**Dúvidas sobre a documentação?**
- Leia os documentos na ordem do índice
- Cada documento tem exemplos práticos
- Código completo e funcional

**Próximos Passos:**
1. Ler SUMARIO-EXECUTIVO.md
2. Ler PRD.md
3. Ler ARQUITETURA-BACKEND.md
4. Ler ARQUITETURA-FRONTEND.md
5. Implementar Sprint 1

---

**Última Atualização:** 07/03/2026  
**Versão:** 2.0.0  
**Status:** ✅ ESPECIFICAÇÃO FINAL APROVADA  
**Próximo Documento:** [SUMARIO-EXECUTIVO.md](./SUMARIO-EXECUTIVO.md)
