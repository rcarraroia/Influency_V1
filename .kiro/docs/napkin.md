# 🧠 Napkin Runbook — INFLUENCY V1

> Runbook curado continuamente. Lido no início de TODA sessão.
> Mantém apenas regras recorrentes de alto valor.
> Máximo 10 itens por categoria, priorizados por importância.

---

## 🔧 Regras de Curadoria

- Re-priorizar a cada leitura
- Manter apenas orientações recorrentes e de alto valor
- Máximo 10 itens por categoria
- Cada item inclui data + "Do instead"
- Remover itens obsoletos ou de baixo sinal

---

## 🎯 Execução & Validação (Prioridade Máxima)

1. **[2026-03-12] SEMPRE ler napkin.md e status.md no início de toda sessão**
   Do instead: Primeira ação obrigatória ao iniciar qualquer sessão é ler `.kiro/docs/napkin.md` e `.kiro/docs/status.md`.

2. **[2026-03-12] NUNCA comentar código para fazer build passar**
   Do instead: Corrigir o problema real (criar arquivo faltante, instalar dependência, corrigir import).

3. **[2026-03-12] NUNCA usar estimativas de tempo (dias/semanas/meses)**
   Do instead: Usar organização por fases, etapas, ciclos, sprints. Descrever complexidade relativa.

4. **[2026-03-12] SEMPRE fazer análise preventiva antes de implementar**
   Do instead: Ler arquivos relacionados, identificar padrões existentes, planejar estrutura antes de escrever código.

5. **[2026-03-12] SEMPRE atualizar status.md ao concluir tarefas**
   Do instead: Documentar progresso, evidências e próximos passos em `.kiro/docs/status.md`.

---

## 🏗️ Arquitetura & Backend (FastAPI)

1. **[2026-03-12] Módulos SEMPRE em app/modules/ seguindo estrutura padrão**
   Do instead: Criar `router.py`, `service.py`, `models.py`, `tasks.py` (opcional) dentro de `app/modules/[nome_modulo]/`.

2. **[2026-03-12] NUNCA criar arquivos fora da estrutura de módulos**
   Do instead: Não usar `app/api/`, sempre usar `app/modules/[nome_modulo]/router.py`.

3. **[2026-03-12] Service layer SEMPRE isola lógica de negócio**
   Do instead: Router chama Service, Service contém toda lógica, Models definem contratos.

4. **[2026-03-12] SEMPRE usar middleware de isolamento de usuário**
   Do instead: Todo endpoint deve filtrar por `user_id` usando `get_user_from_request(request)`.

---

## 📱 Mobile & React Native

1. **[2026-03-12] Usar React Native Paper 5.x para componentes UI**
   Do instead: Importar de 'react-native-paper', não criar componentes do zero.

2. **[2026-03-12] Ícones: Lucide React Native**
   Do instead: Importar de 'lucide-react-native', não usar outras bibliotecas de ícones.

3. **[2026-03-12] Navegação: Expo Router (file-based routing)**
   Do instead: Estrutura de pastas em `app/` define rotas automaticamente.

4. **[2026-03-12] SEMPRE seguir HTMLs do Stitch como fonte de verdade**
   Do instead: Ao corrigir telas, usar HTML exportado do Stitch como referência absoluta para cores, espaçamentos, estrutura.

---

## 🎨 UI/UX & Design

1. **[2026-03-12] Paleta: Primary #6200EE (roxo), Secondary #03DAC6 (teal)**
   Do instead: Usar cores do design system, não inventar novas cores.

2. **[2026-03-12] Design: Material Design 3**
   Do instead: Seguir guidelines do Material Design 3 para componentes e interações.

3. **[2026-03-12] Responsividade: 390x844px (mobile)**
   Do instead: Testar em viewport mobile padrão, usar unidades relativas (%, flex).

4. **[2026-03-12] Acessibilidade: WCAG 2.1 AA**
   Do instead: Garantir contraste mínimo, labels em inputs, navegação por teclado.

---

## 🗄️ Banco de Dados (Supabase)

1. **[2026-03-12] SEMPRE validar schema real antes de migrations**
   Do instead: Usar ferramenta de inspeção do Supabase antes de qualquer ALTER TABLE ou CREATE TABLE.

2. **[2026-03-12] SEMPRE implementar Row-Level Security (RLS)**
   Do instead: Toda tabela deve ter políticas RLS filtrando por `user_id`.

3. **[2026-03-12] NUNCA compartilhar dados entre usuários**
   Do instead: Todo recurso DEVE ter `user_id` e filtros de isolamento.

4. **[2026-03-12] Auth: Supabase Auth (JWT)**
   Do instead: Usar tokens JWT do Supabase, não criar sistema de auth próprio.

---

## 🚀 Deploy & Ambiente

1. **[2026-03-12] Mobile: EAS Build (Expo Application Services)**
   Do instead: Usar `eas build` para iOS/Android, não Expo Go para produção.

2. **[2026-03-12] Web: Vercel (deploy automático via Git)**
   Do instead: Push para branch main dispara deploy automático no Vercel.

3. **[2026-03-12] Backend: Railway (Docker automático via Git)**
   Do instead: Push para branch main dispara build Docker e deploy no Railway.

4. **[2026-03-12] Storage: Supabase Storage + Cloudflare R2**
   Do instead: Usar Supabase Storage para uploads, Cloudflare R2 para CDN.

---

## 👤 Diretrizes do Usuário (Renato Carraro)

1. **[2026-03-12] Respostas SEMPRE em Português-BR**
   Do instead: Inglês apenas dentro de código (variáveis, funções, comentários inline).

2. **[2026-03-12] Funcionalidade > Testes**
   Do instead: Sistema funcionando 100% tem prioridade absoluta sobre testes passando.

3. **[2026-03-12] Integridade é inegociável**
   Do instead: NUNCA mentir sobre status, SEMPRE reportar problemas com honestidade.

4. **[2026-03-12] Documentação consolidada**
   Do instead: Criar UM único arquivo por tema, não múltiplos documentos sobre o mesmo assunto.

5. **[2026-03-12] Organização de documentação em specs**
   Do instead: Toda documentação vai em `.kiro/specs/[nome-da-spec]/doc/`, não na raiz.

---

**Última Atualização:** 12/03/2026  
**Total de Lições:** 30 lições (5-7 por categoria)  
**Status:** ✅ ATIVO - Lido no início de toda sessão  
**Projeto:** INFLUENCY V1 by RENUM
