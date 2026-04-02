# 👤 FLUXOS DE USUÁRIO - INFLUENCY v2

**Versão:** 2.0.0  
**Data:** 07/03/2026  
**Total de Fluxos:** 9 fluxos principais  
**Status:** ✅ ESPECIFICAÇÃO COMPLETA

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Fluxo 1: Onboarding (Business DNA)](#fluxo-1-onboarding-business-dna)
3. [Fluxo 2: Gerar Roteiro com IA](#fluxo-2-gerar-roteiro-com-ia)
4. [Fluxo 3: Gravar Vídeo com Teleprompter](#fluxo-3-gravar-vídeo-com-teleprompter)
5. [Fluxo 4: Editar Vídeo](#fluxo-4-editar-vídeo)
6. [Fluxo 5: Criar Carrossel](#fluxo-5-criar-carrossel)
7. [Fluxo 6: Analisar URL e Gerar Roteiro Autoral](#fluxo-6-analisar-url-e-gerar-roteiro-autoral)
8. [Fluxo 7: Agendar e Publicar Post](#fluxo-7-agendar-e-publicar-post)
9. [Fluxo 8: Assistente IA (Voz + Texto)](#fluxo-8-assistente-ia-voz--texto)
10. [Fluxo 9: Gerenciar Assets de Marca](#fluxo-9-gerenciar-assets-de-marca)

---

## 🎯 VISÃO GERAL

### Princípios dos Fluxos

1. **Conversacional:** Assistente IA guia o usuário em todos os fluxos
2. **Multimodal:** Voz e texto coexistem (usuário escolhe a qualquer momento)
3. **Progressivo:** Funcionalidades reveladas gradualmente
4. **Tolerante a Erros:** Sempre permite voltar/desfazer
5. **Feedback Imediato:** Usuário sempre sabe o que está acontecendo

### Navegação Principal

```
Bottom Tabs (3 tabs):
├── Assistente (tela principal)
├── Biblioteca (scripts, vídeos, carrosséis)
└── Configurações (perfil, Business DNA, integrações)
```

---

## 🧬 FLUXO 1: ONBOARDING (BUSINESS DNA)

### Objetivo
Capturar Business DNA do usuário através de conversa guiada (voz ou texto).

### Passo a Passo

#### 1. Tela de Boas-Vindas
- **Tela:** `WelcomeScreen`
- **Conteúdo:** "Bem-vinda ao Influency! Vou te ajudar a criar conteúdo viral."
- **Ação:** Botão "Começar"

#### 2. Pergunta 1: Nicho/Negócio
- **Tela:** `OnboardingScreen` (conversa)
- **Assistente (voz):** "Qual é o seu nicho ou negócio?"
- **Usuário:** Pode falar OU digitar
  - Voz: "Sou consultora de carreira"
  - Texto: "Consultoria de carreira"
- **Backend:** `POST /business-dna` (parcial)

#### 3. Pergunta 2: Público-Alvo
- **Assistente:** "Quem é o seu público-alvo?"
- **Usuário:** "Mulheres de 25 a 40 anos que querem mudar de carreira"
- **Backend:** `PUT /business-dna` (atualiza)

#### 4. Pergunta 3: Tom de Voz
- **Assistente:** "Qual tom de voz você prefere? Profissional, empático, descontraído ou inspirador?"
- **Usuário:** "Empático"
- **Backend:** `PUT /business-dna`

#### 5. Pergunta 4: Objetivos
- **Assistente:** "Quais são seus objetivos? Pode escolher vários."
- **Opções:** Chips clicáveis
  - Aumentar engajamento
  - Gerar leads
  - Vender produtos
  - Educar audiência
  - Construir autoridade
- **Usuário:** Seleciona 2-3 opções
- **Backend:** `PUT /business-dna`

#### 6. Pergunta 5: Produtos/Serviços
- **Assistente:** "O que você oferece? Produtos, serviços, mentorias?"
- **Usuário:** "Mentoria 1:1 e cursos online sobre transição de carreira"
- **Backend:** `PUT /business-dna`

#### 7. Conectar Redes Sociais
- **Tela:** `ConnectSocialNetworksScreen`
- **Assistente:** "Agora vamos conectar suas redes sociais."
- **Ação:** Botões OAuth para Instagram, TikTok, Facebook
- **Backend:** `POST /social-accounts/connect` (Mixpost OAuth)

#### 8. Análise de Website (Opcional)
- **Assistente:** "Quer que eu analise seu site para entender melhor seu negócio?"
- **Usuário:** Fornece URL ou pula
- **Backend:** `POST /business-dna/analyze-website`

#### 9. Conclusão
- **Tela:** `OnboardingCompleteScreen`
- **Assistente:** "Pronto! Seu Business DNA está configurado. Vamos criar seu primeiro roteiro?"
- **Ação:** Navega para `AssistantScreen`

### Tempo Estimado
3-5 minutos (voz) ou 5-7 minutos (texto)

---

## 📝 FLUXO 2: GERAR ROTEIRO COM IA

### Objetivo
Gerar roteiro viral personalizado com IA (Tavily + Claude).

### Passo a Passo

#### 1. Iniciar no Assistente
- **Tela:** `AssistantScreen`
- **Usuário (voz ou texto):** "Quero criar um roteiro sobre como fazer transição de carreira"
- **Assistente:** "Ótimo! Vou buscar as tendências atuais e criar um roteiro viral para você."

#### 2. Processamento (Loading)
- **Tela:** `GeneratingScriptScreen` (loading animado)
- **Backend:**
  1. `POST /scripts/generate` com topic
  2. Tavily busca tendências
  3. Claude Sonnet 4 gera roteiro
  4. Salva no banco
- **Tempo:** 10-15 segundos

#### 3. Roteiro Gerado
- **Tela:** `ScriptGeneratedScreen`
- **Conteúdo:**
  - Título: "5 Sinais de que Você Precisa Mudar de Carreira AGORA"
  - Roteiro completo (150 palavras)
  - Word count: 150 palavras
  - Duração estimada: 60 segundos
- **Ações:**
  - Botão "Editar Roteiro"
  - Botão "Usar para Gravar"
  - Botão "Salvar para Depois"

#### 4. Editar Roteiro (Opcional)
- **Tela:** `EditScriptScreen`
- **Usuário:** Edita texto manualmente
- **Backend:** `PUT /scripts/{script_id}`
- **Ação:** Salva e volta para tela anterior

#### 5. Próximo Passo
- **Opção A:** "Usar para Gravar" → Fluxo 3
- **Opção B:** "Salvar para Depois" → Volta para Assistente

### Tempo Estimado
1-2 minutos

---

## 🎥 FLUXO 3: GRAVAR VÍDEO COM TELEPROMPTER

### Objetivo
Gravar vídeo usando teleprompter com sincronização por voz.

### Passo a Passo

#### 1. Escolher Roteiro
- **Tela:** `ChooseScriptScreen`
- **Conteúdo:** Lista de roteiros salvos
- **Ação:** Seleciona roteiro e clica "Continuar"

#### 2. Configurar Teleprompter
- **Tela:** `TeleprompterSettingsScreen`
- **Opções:**
  - Modo de scroll: Manual / Automático / Sincronizado por voz
  - Velocidade (se automático): 30-100 palavras/min
  - Tamanho da fonte: 16-32px
- **Ação:** "Testar Scroll"

#### 3. Testar Scroll (Opcional)
- **Tela:** `TestScrollScreen`
- **Conteúdo:** Roteiro rolando na velocidade escolhida
- **Ação:** "Ajustar" ou "Começar Gravação"

#### 4. Gravação Ativa
- **Tela:** `RecordingActiveScreen`
- **Componentes:**
  - Camera preview (fullscreen)
  - Teleprompter overlay (transparente)
  - Botão REC (vermelho pulsando)
  - Timer (00:00)
- **Funcionalidades:**
  - Se modo "Sincronizado por voz": VAD detecta fala e rola automaticamente
  - Botão pausar/retomar
  - Botão parar
- **Backend:** Vídeo gravado localmente (expo-camera)

#### 5. Preview do Vídeo
- **Tela:** `VideoPreviewScreen`
- **Conteúdo:**
  - Player de vídeo
  - Duração: 62 segundos
- **Ações:**
  - "Regravar" → Volta para passo 4
  - "Salvar e Editar" → Fluxo 4
  - "Salvar sem Editar" → Upload direto

#### 6. Upload do Vídeo
- **Backend:** `POST /videos/upload`
- **Cloudflare R2:** Upload do arquivo
- **Tempo:** 5-10 segundos (depende do tamanho)

### Tempo Estimado
2-5 minutos (incluindo gravação)

---

## ✂️ FLUXO 4: EDITAR VÍDEO

### Objetivo
Aplicar legendas, música, assets e cortes automáticos.

### Passo a Passo

#### 1. Configurar Edição
- **Tela:** `VideoEditScreen`
- **Opções:**
  - ✅ Adicionar legendas (estilo: default/bold/minimal)
  - ✅ Adicionar música (volume: 30%)
  - ✅ Aplicar assets (logo, intro, outro, watermark)
  - ✅ Cortes automáticos (modo: conservador/moderado/agressivo)
- **Ação:** "Processar Vídeo"

#### 2. Processamento (Celery Job)
- **Tela:** `ProcessingVideoScreen` (loading com progresso)
- **Backend:**
  1. `POST /videos/{video_id}/edit`
  2. Celery job inicia
  3. Whisper transcreve áudio → legendas SRT
  4. FFmpeg aplica legendas + música + assets + cortes
  5. Upload do vídeo editado para R2
- **Progresso:**
  - Transcrevendo áudio... 25%
  - Aplicando legendas... 50%
  - Adicionando música... 75%
  - Finalizando... 100%
- **Tempo:** 30-60 segundos

#### 3. Vídeo Processado
- **Tela:** `VideoFinalPreviewScreen`
- **Conteúdo:**
  - Player com vídeo editado
  - Comparação antes/depois (toggle)
- **Ações:**
  - "Baixar Vídeo"
  - "Publicar Agora" → Fluxo 7
  - "Salvar na Biblioteca"

### Tempo Estimado
1-2 minutos (incluindo processamento)

---

## 🎨 FLUXO 5: CRIAR CARROSSEL

### Objetivo
Gerar carrossel de imagens com IA (Claude + Pexels).

### Passo a Passo

#### 1. Iniciar no Assistente
- **Usuário:** "Quero criar um carrossel sobre os 5 erros mais comuns em entrevistas de emprego"
- **Assistente:** "Perfeito! Quantos slides você quer? Recomendo 5-7."
- **Usuário:** "5 slides"

#### 2. Processamento
- **Tela:** `GeneratingCarouselScreen` (loading)
- **Backend:**
  1. `POST /carousels/generate`
  2. Claude gera 5 tópicos + textos
  3. Pexels busca imagens para cada slide
  4. Pillow monta layout com cores do Business DNA
- **Tempo:** 15-20 segundos

#### 3. Preview do Carrossel
- **Tela:** `CarouselPreviewScreen`
- **Conteúdo:** Swiper com 5 slides
  - Slide 1: "Erro #1: Não pesquisar sobre a empresa"
  - Slide 2: "Erro #2: Chegar atrasado"
  - ...
- **Ações:**
  - Swipe para navegar
  - "Editar Slide" (individual)
  - "Trocar Imagem"
  - "Publicar"

#### 4. Editar Slide (Opcional)
- **Tela:** `EditSlideScreen`
- **Usuário:** Edita título e texto
- **Backend:** `PUT /carousels/{carousel_id}`

#### 5. Trocar Imagem (Opcional)
- **Tela:** `ChangeImageScreen`
- **Conteúdo:** Grid com 10 imagens alternativas (Pexels)
- **Ação:** Seleciona nova imagem

#### 6. Publicar
- **Ação:** "Publicar" → Fluxo 7

### Tempo Estimado
2-3 minutos

---

## 🔗 FLUXO 6: ANALISAR URL E GERAR ROTEIRO AUTORAL

### Objetivo
Analisar vídeo de URL pública e gerar roteiro autoral (não cópia).

### Passo a Passo

#### 1. Iniciar no Assistente
- **Usuário:** "Quero criar um roteiro baseado neste vídeo: [URL do YouTube]"
- **Assistente:** "Vou analisar o vídeo e criar um roteiro autoral para você."

#### 2. Download e Transcrição
- **Tela:** `AnalyzingVideoScreen` (loading)
- **Backend:**
  1. `POST /scripts/from-url`
  2. yt-dlp baixa vídeo
  3. Whisper transcreve áudio
  4. Claude analisa transcrição + Business DNA
  5. Gera roteiro AUTORAL (não cópia)
- **Tempo:** 30-45 segundos

#### 3. Roteiro Autoral Gerado
- **Tela:** `ScriptGeneratedScreen`
- **Conteúdo:**
  - Título: "Minha Visão Sobre [Tema do Vídeo Original]"
  - Roteiro autoral (inspirado, não copiado)
  - Nota: "Baseado em análise de [URL]"
- **Ações:**
  - "Editar"
  - "Usar para Gravar"
  - "Salvar"

### Tempo Estimado
1-2 minutos

---

## 📤 FLUXO 7: AGENDAR E PUBLICAR POST

### Objetivo
Publicar vídeo ou carrossel em múltiplas redes sociais.

### Passo a Passo

#### 1. Selecionar Redes
- **Tela:** `SelectNetworksScreen`
- **Conteúdo:** Checkboxes
  - ✅ Instagram
  - ✅ TikTok
  - ⬜ Facebook
  - ⬜ YouTube
- **Ação:** "Continuar"

#### 2. Gerar Legenda com IA
- **Tela:** `CaptionHashtagsScreen`
- **Assistente:** "Vou gerar uma legenda viral para você."
- **Backend:** `POST /posts/generate-caption`
- **Conteúdo gerado:**
  - Legenda: "Você comete esses erros em entrevistas? 😱 Salva esse post! 👇"
  - Hashtags: #carreira #entrevista #dicas #emprego
- **Ação:** Usuário pode editar

#### 3. Agendar ou Publicar
- **Tela:** `SchedulePostScreen`
- **Opções:**
  - "Publicar Agora"
  - "Agendar para..." (date picker)
- **Ação:** Confirma

#### 4. Publicação
- **Backend:** `POST /posts`
- **Mixpost:** Publica em Instagram e TikTok
- **Tempo:** 5-10 segundos

#### 5. Confirmação
- **Tela:** `PostConfirmationScreen`
- **Conteúdo:**
  - ✅ Publicado no Instagram
  - ✅ Publicado no TikTok
  - Links para os posts
- **Ação:** "Ver Métricas" ou "Criar Novo Conteúdo"

### Tempo Estimado
2-3 minutos

---

## 🤖 FLUXO 8: ASSISTENTE IA (VOZ + TEXTO)

### Objetivo
Interagir com assistente IA de forma híbrida (voz e texto coexistem).

### Passo a Passo

#### 1. Tela Principal
- **Tela:** `AssistantScreen`
- **Componentes:**
  - Histórico de mensagens (chat)
  - Botão de voz (microfone)
  - Input de texto
- **Comportamento:** Usuário pode falar OU digitar a qualquer momento

#### 2. Interação por Voz
- **Usuário:** Pressiona botão de microfone
- **Frontend:** `@react-native-voice/voice` inicia reconhecimento
- **Usuário:** Fala "Quero criar um roteiro sobre produtividade"
- **Frontend:** Transcreve e envia para backend
- **Backend:** `POST /assistant/send` (mode: "voice")
- **Assistente:** Responde em texto E áudio (expo-speech)

#### 3. Interação por Texto
- **Usuário:** Digita "Quero criar um roteiro sobre produtividade"
- **Backend:** `POST /assistant/send` (mode: "text")
- **Assistente:** Responde apenas em texto (sem áudio)

#### 4. Sugestões Proativas
- **Assistente:** "Notei que você não posta há 3 dias. Quer que eu sugira alguns tópicos?"
- **Chips clicáveis:**
  - "Sim, me sugira"
  - "Não, obrigada"
  - "Mostrar meus posts agendados"

#### 5. Navegação Contextual
- **Assistente:** "Criei um roteiro sobre produtividade. Quer gravar agora?"
- **Ação:** Navega automaticamente para `RecordingScreen`

### Tempo Estimado
Contínuo (sempre disponível)

---

## 🖼️ FLUXO 9: GERENCIAR ASSETS DE MARCA

### Objetivo
Configurar logo, intro, outro e watermark para aplicação automática.

### Passo a Passo

#### 1. Acessar Assets
- **Navegação:** Configurações → Assets de Marca
- **Tela:** `BrandAssetsScreen`
- **Conteúdo:** Lista de assets
  - Logo: ✅ Configurado
  - Intro: ⬜ Não configurado
  - Outro: ⬜ Não configurado
  - Watermark: ✅ Configurado

#### 2. Upload de Asset
- **Ação:** "Adicionar Logo"
- **Tela:** `UploadAssetScreen`
- **Usuário:** Seleciona imagem da galeria
- **Backend:** `POST /assets/upload`
- **Cloudflare R2:** Upload do arquivo

#### 3. Configurar Posição
- **Tela:** `ConfigureAssetScreen`
- **Opções:**
  - Posição: Top-right / Top-left / Bottom-right / Bottom-left
  - Opacidade: 50-100%
  - Duração (intro/outro): 2-5 segundos
- **Ação:** "Salvar"

#### 4. Ativar Auto-Aplicação
- **Toggle:** "Aplicar automaticamente em todos os vídeos"
- **Backend:** `PUT /assets/{asset_id}` (auto_apply: true)

#### 5. Preview
- **Tela:** `AssetPreviewScreen`
- **Conteúdo:** Vídeo de exemplo com asset aplicado
- **Ação:** "Confirmar" ou "Ajustar"

### Tempo Estimado
3-5 minutos (primeira configuração)

---

## 📊 MÉTRICAS DE SUCESSO DOS FLUXOS

### Onboarding
- **Taxa de conclusão:** > 80%
- **Tempo médio:** < 5 minutos

### Geração de Roteiro
- **Taxa de uso:** > 70% dos usuários
- **Tempo médio:** < 2 minutos

### Gravação de Vídeo
- **Taxa de conclusão:** > 60%
- **Regravações:** < 2 por vídeo

### Edição de Vídeo
- **Taxa de uso:** > 80% dos vídeos
- **Tempo de processamento:** < 60 segundos

### Publicação
- **Taxa de publicação:** > 50% dos vídeos editados
- **Redes por post:** 2-3 redes

---

## 🎯 PRÓXIMOS PASSOS

Após dominar os fluxos básicos, usuários avançados podem:
1. Criar templates de roteiros
2. Agendar posts em lote
3. Analisar métricas de performance
4. Usar Learning System (RAG) para roteiros virais

---

**Última Atualização:** 07/03/2026  
**Versão:** 2.0.0  
**Status:** ✅ COMPLETO
