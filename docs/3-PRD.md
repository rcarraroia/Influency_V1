# 📋 PRD - PRODUCT REQUIREMENTS DOCUMENT

**Produto:** Influency v2  
**Versão:** 2.0.0  
**Data:** 07/03/2026  
**Autor:** Kiro AI Assistant  
**Status:** ✅ APROVADO

---

## 📖 ÍNDICE

1. [Visão do Produto](#visão-do-produto)
2. [Personas](#personas)
3. [Casos de Uso](#casos-de-uso)
4. [Funcionalidades Principais](#funcionalidades-principais)
5. [Requisitos Não-Funcionais](#requisitos-não-funcionais)
6. [Métricas de Sucesso](#métricas-de-sucesso)
7. [Fora do Escopo](#fora-do-escopo)

---

## 🎯 VISÃO DO PRODUTO

### Declaração de Visão
"Transformar consultoras, coaches e terapeutas em criadoras de conteúdo profissionais, usando IA conversacional para reduzir o tempo de criação de vídeos de 60 minutos para 10 minutos."

### Problema
Profissionais liberais sabem que precisam criar conteúdo para redes sociais, mas:
- Não têm tempo (60+ min por vídeo)
- Não sabem o que falar (bloqueio criativo)
- Não dominam edição de vídeo
- Não sabem quando/onde postar

### Solução
Assistente IA com interface híbrida (voz + texto) que:
- Gera roteiros personalizados
- Grava com teleprompter inteligente
- Edita automaticamente
- Publica em múltiplas redes
- Aprende com vídeos virais

### Diferencial
**Interface híbrida:** Usuário pode falar OU digitar a qualquer momento, sem trocar de modo. Ambos coexistem na mesma interface.

---

## 👥 PERSONAS

### Persona 1: Consultora Digital (Principal)

**Nome:** Ana Paula  
**Idade:** 35 anos  
**Profissão:** Consultora de Nutrição  
**Renda:** R$ 12.000/mês  
**Localização:** São Paulo, SP

**Contexto:**
- Atende 20 clientes/mês presencialmente
- Quer escalar via infoprodutos
- Sabe que precisa de presença digital
- Posta 1-2x/semana (irregular)

**Dores:**
- "Não tenho tempo para criar conteúdo"
- "Não sei o que falar nos vídeos"
- "Edição de vídeo é muito complicada"
- "Não sei se meu conteúdo está bom"

**Objetivos:**
- Postar 5-7x/semana
- Atrair 10 novos clientes/mês via redes sociais
- Criar infoproduto (curso online)
- Ser reconhecida como autoridade

**Comportamento Digital:**
- Instagram: 5.000 seguidores
- TikTok: 2.000 seguidores
- Consome conteúdo de outras nutricionistas
- Grava vídeos no celular (sem edição)

**Como o Influency Ajuda:**
- Gera roteiros sobre nutrição em 2 min
- Grava com teleprompter (sem decorar)
- Edita automaticamente (legendas, cortes)
- Publica em Instagram + TikTok simultaneamente
- Sugere melhores horários

---

### Persona 2: Coach de Carreira

**Nome:** Roberto Silva  
**Idade:** 42 anos  
**Profissão:** Coach de Carreira  
**Renda:** R$ 8.000/mês  
**Localização:** Rio de Janeiro, RJ

**Contexto:**
- Atende 15 clientes/mês online
- Quer aumentar ticket médio
- Presença digital fraca
- Posta <1x/semana

**Dores:**
- "Não sei como me posicionar"
- "Meus vídeos não têm engajamento"
- "Demoro 2 horas para criar 1 vídeo"
- "Não sei analisar métricas"

**Objetivos:**
- Aumentar autoridade
- Atrair clientes corporativos
- Criar programa de mentoria
- Postar consistentemente

**Como o Influency Ajuda:**
- Define tom de voz no Business DNA
- Gera roteiros alinhados com posicionamento
- Analisa vídeos virais de outros coaches
- Mostra métricas de performance
- Sugere temas que funcionam

---

### Persona 3: Terapeuta Holística

**Nome:** Mariana Costa  
**Idade:** 38 anos  
**Profissão:** Terapeuta Holística  
**Renda:** R$ 6.000/mês  
**Localização:** Florianópolis, SC

**Contexto:**
- Atende 25 clientes/mês presencialmente
- Quer expandir para online
- Tímida para gravar vídeos
- Nunca postou vídeo

**Dores:**
- "Tenho vergonha de gravar"
- "Não sei falar para câmera"
- "Meu conteúdo é muito técnico"
- "Não entendo de tecnologia"

**Objetivos:**
- Superar timidez
- Criar conteúdo educativo
- Atrair clientes online
- Vender consultas virtuais

**Como o Influency Ajuda:**
- Teleprompter reduz ansiedade
- Roteiros simplificam linguagem técnica
- Edição automática remove erros
- Interface simples (voz + texto)
- Assistente guia todo o processo

---

## 📱 CASOS DE USO

### Caso de Uso 1: Criar Vídeo Completo (Fluxo Principal)

**Ator:** Consultora (Ana Paula)  
**Objetivo:** Criar e publicar vídeo sobre "Benefícios do Colágeno"  
**Pré-condição:** Usuário logado, Business DNA configurado

**Fluxo Principal:**

1. **Abrir Assistente IA**
   - Usuário: "Quero criar um vídeo sobre colágeno"
   - Assistente: "Ótimo! Vou buscar tendências sobre colágeno..."

2. **Gerar Roteiro**
   - Sistema busca tendências (Tavily)
   - IA gera 3 opções de roteiro
   - Usuário escolhe ou edita

3. **Gravar Vídeo**
   - Usuário abre teleprompter
   - Escolhe modo: manual ou sincronizado
   - Grava vídeo (2-3 min)

4. **Editar Automaticamente**
   - Sistema gera legendas (Whisper)
   - Detecta pausas e gaguejos
   - Usuário aprova cortes
   - Adiciona música e logo

5. **Publicar**
   - Usuário escolhe redes (Instagram + TikTok)
   - IA gera legenda e hashtags
   - Agenda para melhor horário
   - Sistema publica (Mixpost)

**Resultado:** Vídeo publicado em 10 minutos (vs 60 min manual)

---

### Caso de Uso 2: Onboarding (Business DNA)

**Ator:** Novo usuário (Roberto)  
**Objetivo:** Configurar perfil e conectar redes sociais  
**Pré-condição:** Usuário criou conta

**Fluxo Principal:**

1. **Boas-vindas**
   - Assistente: "Olá! Vou te conhecer melhor. Pode falar ou digitar."
   - Usuário: "Sou coach de carreira"

2. **Capturar Nicho**
   - Assistente: "Legal! Qual é seu público-alvo?"
   - Usuário: "Profissionais de 30-40 anos que querem mudar de carreira"

3. **Capturar Tom de Voz**
   - Assistente: "Como você gosta de se comunicar?"
   - Usuário escolhe: Formal / Informal / Inspirador

4. **Capturar Objetivos**
   - Assistente: "O que você quer alcançar?"
   - Usuário: "Atrair clientes corporativos"

5. **Conectar Redes Sociais**
   - Assistente: "Vamos conectar suas redes?"
   - Usuário autoriza via OAuth (Mixpost)
   - Sistema conecta Instagram, TikTok, LinkedIn

6. **Análise Inicial**
   - Sistema analisa posts anteriores
   - Identifica padrões de sucesso
   - Gera Business DNA completo

**Resultado:** Perfil configurado, pronto para criar conteúdo

---

### Caso de Uso 3: Análise de URL (Inspiração)

**Ator:** Terapeuta (Mariana)  
**Objetivo:** Criar roteiro inspirado em vídeo viral  
**Pré-condição:** Usuário logado

**Fluxo Principal:**

1. **Fornecer URL**
   - Usuário: "Quero criar algo parecido com este vídeo"
   - Usuário cola URL do YouTube/Instagram

2. **Baixar e Transcrever**
   - Sistema baixa vídeo (yt-dlp)
   - Transcreve áudio (Whisper)
   - Analisa estrutura

3. **Gerar Roteiro Autoral**
   - IA identifica padrões (hook, estrutura, CTA)
   - Gera roteiro similar mas original
   - Personaliza com Business DNA

4. **Revisar e Ajustar**
   - Usuário revisa roteiro
   - Faz ajustes (voz ou texto)
   - Aprova para gravação

**Resultado:** Roteiro autoral inspirado em vídeo viral

---

### Caso de Uso 4: Criar Carrossel

**Ator:** Consultora (Ana Paula)  
**Objetivo:** Criar carrossel sobre "5 Mitos da Nutrição"  
**Pré-condição:** Usuário logado

**Fluxo Principal:**

1. **Definir Tema**
   - Usuário: "Quero criar um carrossel sobre mitos da nutrição"
   - Assistente: "Quantos slides?"
   - Usuário: "5 slides"

2. **Gerar Tópicos**
   - IA gera 5 mitos comuns
   - Usuário aprova ou edita

3. **Buscar Imagens**
   - Sistema busca imagens (Pexels/Unsplash)
   - Filtra por qualidade e relevância
   - Usuário escolhe ou substitui

4. **Montar Layout**
   - Sistema monta carrossel
   - Aplica cores do Business DNA
   - Adiciona textos e logo

5. **Publicar**
   - Usuário escolhe redes
   - IA gera legenda
   - Sistema publica

**Resultado:** Carrossel publicado em 5 minutos

---

## 🎯 FUNCIONALIDADES PRINCIPAIS

### 1. Assistente IA Híbrido (Voz + Texto)

**Descrição:**
Interface conversacional onde o usuário pode falar OU digitar a qualquer momento, sem necessidade de trocar entre modos.

**Requisitos Funcionais:**
- RF1.1: Sistema deve reconhecer voz em tempo real (@react-native-voice/voice)
- RF1.2: Sistema deve sintetizar respostas em voz (expo-speech)
- RF1.3: Usuário pode digitar a qualquer momento (input sempre visível)
- RF1.4: Usuário pode falar a qualquer momento (botão sempre visível)
- RF1.5: Sistema alterna automaticamente entre voz e texto
- RF1.6: Histórico de conversa mostra ambos os modos
- RF1.7: Sistema mantém contexto entre voz e texto

**Requisitos Não-Funcionais:**
- RNF1.1: Baixa latência de reconhecimento de voz (<500ms)
- RNF1.2: Alta precisão de reconhecimento (>95%)
- RNF1.3: Suporte a português brasileiro
- RNF1.4: Funciona offline (modo degradado)

**Critérios de Aceitação:**
- ✅ Usuário pode iniciar conversa por voz
- ✅ Usuário pode responder por texto
- ✅ Usuário pode voltar a falar
- ✅ Sistema não perde contexto
- ✅ Interface não trava ou congela

---

### 2. Business DNA

**Descrição:**
Onboarding conversacional que captura nicho, tom de voz, estilo e conecta redes sociais.

**Requisitos Funcionais:**
- RF2.1: Capturar nicho/negócio (voz ou texto)
- RF2.2: Capturar público-alvo (voz ou texto)
- RF2.3: Capturar tom de voz (seleção ou voz)
- RF2.4: Capturar objetivos (múltipla escolha ou voz)
- RF2.5: Capturar produtos/serviços (voz ou texto)
- RF2.6: Conectar redes sociais via OAuth (Mixpost)
- RF2.7: Analisar posts anteriores (opcional)
- RF2.8: Gerar perfil completo (Business DNA)
- RF2.9: Permitir edição posterior

**Requisitos Não-Funcionais:**
- RNF2.1: Onboarding rápido e intuitivo (<10 minutos)
- RNF2.2: OAuth seguro (HTTPS, tokens)
- RNF2.3: Dados criptografados em repouso

**Critérios de Aceitação:**
- ✅ Usuário completa onboarding por voz
- ✅ Usuário completa onboarding por texto
- ✅ Usuário conecta Instagram, TikTok, Facebook
- ✅ Sistema gera Business DNA completo
- ✅ Usuário pode editar perfil depois

---

### 3. Script AI

**Descrição:**
Geração de roteiros personalizados usando IA, tendências e Business DNA.

**Requisitos Funcionais:**
- RF3.1: Buscar tendências sobre tema (Tavily)
- RF3.2: Gerar 3 opções de roteiro (Claude Sonnet 4)
- RF3.3: Personalizar com Business DNA
- RF3.4: Usar roteiros virais como referência (RAG)
- RF3.5: Permitir edição de roteiro (voz ou texto)
- RF3.6: Salvar roteiros para uso posterior
- RF3.7: Sugerir temas baseados em analytics
- RF3.8: Gerar variações de roteiro

**Requisitos Não-Funcionais:**
- RNF3.1: Geração rápida de roteiro (<30 segundos)
- RNF3.2: Roteiros com 150-300 palavras
- RNF3.3: Qualidade de escrita profissional

**Critérios de Aceitação:**
- ✅ Usuário solicita roteiro por voz
- ✅ Sistema gera 3 opções em <30s
- ✅ Roteiros são personalizados
- ✅ Usuário pode editar por voz ou texto
- ✅ Roteiros são salvos automaticamente

---

### 4. Gravação + Teleprompter

**Descrição:**
Gravação de vídeo com teleprompter inteligente (manual ou sincronizado por voz).

**Requisitos Funcionais:**
- RF4.1: Gravar vídeo em alta qualidade (expo-camera)
- RF4.2: Teleprompter com scroll manual
- RF4.3: Teleprompter sincronizado por voz (VAD)
- RF4.4: Ajustar velocidade de scroll
- RF4.5: Pausar/retomar gravação
- RF4.6: Visualizar preview antes de salvar
- RF4.7: Regravar se necessário
- RF4.8: Salvar múltiplas takes

**Requisitos Não-Funcionais:**
- RNF4.1: Resolução mínima 1080p
- RNF4.2: Baixa latência de sincronização (<500ms)
- RNF4.3: Consumo eficiente de bateria (<30% por gravação)
- RNF4.4: Funciona em modo retrato e paisagem

**Critérios de Aceitação:**
- ✅ Usuário grava vídeo com teleprompter manual
- ✅ Usuário grava vídeo com teleprompter sincronizado
- ✅ Sincronização é precisa (<500ms)
- ✅ Vídeo é salvo em alta qualidade
- ✅ Usuário pode regravar

---

### 5. Edição Automática

**Descrição:**
Edição profissional automática com legendas, cortes, música e assets.

**Requisitos Funcionais:**
- RF5.1: Gerar legendas automáticas (Whisper)
- RF5.2: Detectar pausas longas (>2s)
- RF5.3: Detectar gaguejos e hesitações
- RF5.4: Sugerir cortes (3 níveis: conservador, moderado, agressivo)
- RF5.5: Permitir revisão de cortes
- RF5.6: Aplicar cortes com FFmpeg
- RF5.7: Adicionar música de fundo (Pixabay)
- RF5.8: Adicionar logo, intro, outro, watermark
- RF5.9: Exportar vídeo final

**Requisitos Não-Funcionais:**
- RNF5.1: Processamento eficiente (<5 minutos para vídeo de 2 min)
- RNF5.2: Qualidade de vídeo mantida
- RNF5.3: Alta precisão de legendas (>95%)

**Critérios de Aceitação:**
- ✅ Sistema gera legendas automaticamente
- ✅ Sistema detecta erros de fala
- ✅ Usuário revisa e aprova cortes
- ✅ Vídeo final é profissional
- ✅ Processamento é rápido (<5 min)

---

### 6. Carrosséis

**Descrição:**
Geração de carrosséis de imagens com IA.

**Requisitos Funcionais:**
- RF6.1: Gerar tópicos baseados em tema (Claude)
- RF6.2: Buscar imagens relevantes (Pexels/Unsplash)
- RF6.3: Montar layout com Pillow
- RF6.4: Aplicar cores do Business DNA
- RF6.5: Adicionar textos e logo
- RF6.6: Permitir edição de slides
- RF6.7: Exportar como imagens ou PDF

**Requisitos Não-Funcionais:**
- RNF6.1: Geração rápida (<2 minutos)
- RNF6.2: Imagens em alta resolução
- RNF6.3: Layout responsivo (Instagram/LinkedIn)

**Critérios de Aceitação:**
- ✅ Usuário solicita carrossel por voz
- ✅ Sistema gera 5-10 slides
- ✅ Imagens são relevantes
- ✅ Layout é profissional
- ✅ Usuário pode editar

---

### 7. Análise de URL

**Descrição:**
Transcreve vídeo público e gera roteiro autoral.

**Requisitos Funcionais:**
- RF7.1: Aceitar URL de YouTube, Instagram, TikTok
- RF7.2: Baixar vídeo (yt-dlp)
- RF7.3: Transcrever áudio (Whisper)
- RF7.4: Analisar estrutura (hook, corpo, CTA)
- RF7.5: Gerar roteiro autoral (Claude)
- RF7.6: Personalizar com Business DNA
- RF7.7: Permitir edição

**Requisitos Não-Funcionais:**
- RNF7.1: Processamento rápido (<3 minutos)
- RNF7.2: Suporte a vídeos até 10 minutos
- RNF7.3: Roteiro 100% original (não plágio)

**Critérios de Aceitação:**
- ✅ Usuário cola URL
- ✅ Sistema baixa e transcreve
- ✅ Roteiro gerado é original
- ✅ Roteiro é personalizado
- ✅ Processamento é rápido

---

### 8. Agendamento Multi-Rede

**Descrição:**
Publicação em múltiplas redes sociais com legendas e hashtags geradas por IA.

**Requisitos Funcionais:**
- RF8.1: Selecionar redes (Instagram, TikTok, Facebook, YouTube, LinkedIn)
- RF8.2: Gerar legenda personalizada por rede (Claude)
- RF8.3: Gerar hashtags relevantes (Claude)
- RF8.4: Sugerir melhor horário (analytics)
- RF8.5: Agendar publicação (Mixpost)
- RF8.6: Publicar imediatamente (opcional)
- RF8.7: Visualizar posts agendados
- RF8.8: Editar/cancelar agendamento

**Requisitos Não-Funcionais:**
- RNF8.1: Publicação rápida (<1 minuto)
- RNF8.2: Alta taxa de sucesso (>99%)
- RNF8.3: Retry automático em caso de falha

**Critérios de Aceitação:**
- ✅ Usuário seleciona múltiplas redes
- ✅ Sistema gera legendas personalizadas
- ✅ Sistema sugere melhor horário
- ✅ Publicação é bem-sucedida
- ✅ Usuário recebe confirmação

---

### 9. Viral Score + RAG

**Descrição:**
Aprende com vídeos virais para melhorar roteiros futuros.

**Requisitos Funcionais:**
- RF9.1: Coletar métricas de posts publicados (Mixpost)
- RF9.2: Calcular Viral Score (0-100)
- RF9.3: Classificar posts (viral, bom, médio, ruim)
- RF9.4: Gerar embeddings de roteiros virais (OpenAI)
- RF9.5: Armazenar no pgvector
- RF9.6: Buscar roteiros similares (RAG)
- RF9.7: Injetar no contexto de geração
- RF9.8: Mostrar insights ao usuário

**Requisitos Não-Funcionais:**
- RNF9.1: Coleta de métricas diária
- RNF9.2: Busca rápida de similaridade (<1s)
- RNF9.3: Privacidade: opt-in para learning global

**Critérios de Aceitação:**
- ✅ Sistema coleta métricas automaticamente
- ✅ Viral Score é calculado corretamente
- ✅ Roteiros virais melhoram geração
- ✅ Usuário vê insights
- ✅ Privacidade é respeitada

---

## 🔧 REQUISITOS NÃO-FUNCIONAIS

### Performance
- **RNF-P1:** App inicia rapidamente (<3 segundos)
- **RNF-P2:** Navegação fluida entre telas (<500ms)
- **RNF-P3:** Geração de roteiro rápida (<30 segundos)
- **RNF-P4:** Processamento de vídeo eficiente (<5 minutos para vídeo de 2 min)
- **RNF-P5:** API responsiva (<200ms p95)

### Escalabilidade
- **RNF-S1:** Suporta 10.000 usuários simultâneos
- **RNF-S2:** Processa 1.000 vídeos/hora
- **RNF-S3:** Armazena 100TB de vídeos
- **RNF-S4:** Banco de dados escala horizontalmente

### Segurança
- **RNF-SE1:** Autenticação JWT com refresh tokens
- **RNF-SE2:** HTTPS obrigatório
- **RNF-SE3:** API keys criptografadas (Fernet)
- **RNF-SE4:** RLS em todas as tabelas
- **RNF-SE5:** Isolamento total de dados por usuário
- **RNF-SE6:** Compliance LGPD/GDPR

### Usabilidade
- **RNF-U1:** Interface intuitiva (NPS >9/10)
- **RNF-U2:** Onboarding rápido (<10 minutos)
- **RNF-U3:** Criação rápida de vídeo (<10 minutos)
- **RNF-U4:** Acessibilidade WCAG 2.1 Level A
- **RNF-U5:** Suporte a português brasileiro

### Confiabilidade
- **RNF-C1:** Alta disponibilidade (uptime >99.9%)
- **RNF-C2:** Backup diário automático
- **RNF-C3:** Recovery rápido (<1 hora)
- **RNF-C4:** Monitoramento 24/7 (Sentry)

### Compatibilidade
- **RNF-CO1:** iOS 13+
- **RNF-CO2:** Android 8+
- **RNF-CO3:** Funciona offline (modo degradado)
- **RNF-CO4:** Sincronização automática

---

## 📊 MÉTRICAS DE SUCESSO

### Métricas de Produto (KPIs)

#### Aquisição
- **Instalações:** >1.000/mês
- **Taxa de conversão (trial → pago):** >20%
- **CAC:** <R$ 150

#### Ativação
- **Onboarding completo:** >80%
- **Primeiro vídeo criado:** >70%
- **Tempo até primeiro vídeo:** Rápido (<30 min)

#### Engajamento
- **DAU/MAU:** >30%
- **Vídeos criados/usuário/mês:** >8
- **Posts publicados/usuário/semana:** >5
- **Tempo no app/sessão:** Alto (>15 min)

#### Retenção
- **Retenção D1:** >60%
- **Retenção D7:** >40%
- **Retenção D30:** >30%
- **Churn mensal:** <5%

#### Receita
- **MRR:** >R$ 267.000 (1000 usuários)
- **ARPU:** R$ 267/mês (mix de planos: 60% Básico R$197 + 30% Pro R$297 + 10% Enterprise R$597)
- **LTV:** R$ 3.204 (12 meses × R$ 267)
- **LTV/CAC:** >21x

#### Satisfação
- **NPS:** >9/10
- **App Store Rating:** >4.5/5
- **Suporte: Tempo de resposta:** Rápido (<2 horas)

### Métricas Técnicas

#### Performance
- **API Latency (p95):** Baixa (<200ms)
- **App Crash Rate:** Mínima (<0.1%)
- **Video Processing Time:** Rápido (<5 min para vídeo de 2 min)

#### Qualidade
- **Reconhecimento de voz:** Alta precisão (>95%)
- **Legendas automáticas:** Alta precisão (>95%)
- **Taxa de sucesso de publicação:** Alta (>99%)

---

## 🚫 FORA DO ESCOPO

### MVP (Não será implementado)

#### 1. Avatar HeyGen
- Geração de vídeos com avatar digital
- **Motivo:** Complexidade alta, custo alto, não essencial

#### 2. Competitor Analysis Agent
- Monitoramento automático de concorrentes
- **Motivo:** Pode ser adicionado na Fase 2

#### 3. Trend Monitoring Agent
- Monitoramento de trending topics
- **Motivo:** Pode ser adicionado na Fase 2

#### 4. Brand Voice Agent
- Fine-tuning de modelo personalizado
- **Motivo:** RAG é suficiente, fine-tuning é caro

#### 5. Engagement Optimization Agent
- Otimização automática de horários
- **Motivo:** Pode ser adicionado na Fase 2

#### 6. Dashboard Web
- Interface web para analytics
- **Motivo:** Mobile-first, web pode vir depois

#### 7. Colaboração em Equipe
- Múltiplos usuários no mesmo workspace
- **Motivo:** Foco em profissionais individuais

#### 8. White-label
- Customização de marca
- **Motivo:** Apenas para plano Enterprise

#### 9. API Pública
- Acesso programático ao Influency
- **Motivo:** Apenas para plano Enterprise

#### 10. Integração com CRM
- Zapier, Make, etc.
- **Motivo:** Pode ser adicionado na Fase 3

---

## 📅 ROADMAP

### MVP
- ✅ Assistente IA híbrido (voz + texto)
- ✅ Business DNA
- ✅ Script AI
- ✅ Gravação + Teleprompter (manual)
- ✅ Teleprompter sincronizado por voz (VAD)
- ✅ Edição automática
- ✅ Carrosséis
- ✅ Análise de URL
- ✅ Agendamento multi-rede
- ✅ Viral Score + RAG

### Fase 2
- ⏳ Analytics avançados
- ⏳ Colaboração em equipe
- ⏳ Templates de roteiro
- ⏳ Biblioteca de assets
- ⏳ Dashboard web

---

**Última Atualização:** 07/03/2026  
**Versão:** 2.0.0  
**Status:** ✅ APROVADO  
**Próximo Documento:** [ARQUITETURA-BACKEND.md](./ARQUITETURA-BACKEND.md)
