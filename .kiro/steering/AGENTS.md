---
inclusion: always
---

# 🎯 AGENTS.MD - PROJETO INFLUENCY

## ⚠️ IDIOMA OBRIGATÓRIO

**TODAS as respostas em Português-BR.**  
Inglês apenas dentro de código (variáveis, funções, comentários técnicos inline).

---

## 🔒 INÍCIO DE SESSÃO OBRIGATÓRIO

**Ao iniciar qualquer sessão:**

1. ✅ **Leia `.kiro/docs/napkin.md`** (lições aprendidas)
2. ✅ **Leia `.kiro/docs/status.md`** (tarefas pendentes)
3. ✅ Só então execute o que foi solicitado

**NUNCA pule a leitura do napkin!**

---

## 🏗️ ARQUITETURA DO SISTEMA

### **Stack Principal:**

- **Mobile:** React Native 0.73+ + Expo 50+ → EAS Build
- **Web Dashboard:** React 18+ + Vite 5+ → Vercel
- **Backend:** FastAPI 0.109+ (Python 3.11+) → Railway
- **Banco:** PostgreSQL 15 (Supabase)

### **Estrutura Backend (Monolito Modular):**

```
app/modules/[nome_modulo]/
├── router.py    # Endpoints FastAPI
├── service.py   # Lógica de negócio
├── models.py    # Pydantic models
└── tasks.py     # Celery jobs (opcional)
```

**Detalhes:** Consulte `.kiro/docs/napkin.md` (seção Arquitetura & Backend)

---

## 🎯 PRINCÍPIOS FUNDAMENTAIS

1. **Funcionalidade > Testes**  
   Sistema funcionando 100% tem prioridade absoluta sobre testes passando.

2. **Análise antes de código**  
   Ler arquivos relacionados, identificar padrões existentes, planejar estrutura.

3. **Banco: sempre o real**  
   Validar estrutura real do Supabase antes de qualquer modificação.

4. **Integridade é inegociável**  
   Nunca mentir sobre status. Reportar problemas com honestidade.

5. **Isolamento de dados por usuário**  
   Todo recurso DEVE ter `user_id` e filtros de isolamento.

---

## 🎨 DESIGN SYSTEM

### **Mobile (React Native):**
- **UI:** React Native Paper 5.x
- **Ícones:** Lucide React Native
- **Animações:** React Native Reanimated 3.x
- **Design:** Material Design 3
- **Paleta:** Primary #6200EE (roxo), Secondary #03DAC6 (teal)

### **Web Dashboard (React):**
- **UI:** shadcn/ui + Tailwind CSS 3.x
- **Ícones:** Lucide React
- **Design:** Material Design 3
- **Paleta:** Mesma do mobile (consistência)

**Detalhes:** Consulte `.kiro/docs/napkin.md` (seção UI/UX & Design)

---

## 🛠️ KIRO SKILLS DISPONÍVEIS

**Total:** 70 skills/agents (60 globais + 6 locais + 4 agents)

### **Skills Críticas Mobile:**
- **react-native-architecture** ⭐⭐⭐ - Arquitetura React Native + Expo
- **mobile-developer** ⭐⭐⭐ - Desenvolvimento cross-platform
- **mobile-design** ⭐⭐⭐ - Design mobile-first
- **react-best-practices** ⭐⭐⭐ - Otimização React/Next.js
- **expo-deployment** ⭐⭐ - Deploy App Store/Google Play

### **Skills Críticas Backend:**
- **architecture** - Padrões arquiteturais / Monolito modular
- **api-patterns** - Design de APIs RESTful / FastAPI
- **database-design** - Schema PostgreSQL / RLS
- **database-verification** - Validação de schema Supabase

### **Skills Críticas Qualidade:**
- **code-review** - Revisão de código (Regras RENUM)
- **commit-message** - Conventional Commits PT-BR
- **validacao-renum** - Validação de tarefas (Regras RENUM)
- **lint-and-validate** - Linting e validação automática

**Listagem Completa:** Consulte `.kiro/docs/skills-instaladas.md`

**Como Ativar:**
```bash
# Skills globais
cat ~/.kiro/skills/[nome-da-skill]/SKILL.md

# Skills locais
cat stitch-skills/skills/[nome-da-skill]/SKILL.md
```

---

## 📚 DOCUMENTAÇÃO DE REFERÊNCIA

Consulte SOB DEMANDA:

- **Lições aprendidas:** `.kiro/docs/napkin.md` (LER NO INÍCIO!)
- **Status do projeto:** `.kiro/docs/status.md` (LER NO INÍCIO!)
- **Skills instaladas:** `.kiro/docs/skills-instaladas.md`
- **Specs de features:** `.kiro/specs/[nome-da-spec]/`

---

## ✅ CRITÉRIOS DE CONCLUSÃO

| O que foi feito | Evidência exigida |
|----------------|-------------------|
| Código implementado | Arquivos criados/modificados |
| Build | Output sem erros |
| Testes | Testes passando (se aplicável) |
| Banco/migrations | Confirmação de aplicação no ambiente real |
| Aprovação | Confirmação explícita do usuário |

**Criar um arquivo `.md` descrevendo o que foi feito NÃO é evidência. É documentação.**

---

## 🎯 COMPROMISSO

**EU, KIRO AI, ME COMPROMETO A:**

1. ✅ SEMPRE ler napkin.md e status.md no início de toda sessão
2. ✅ SEMPRE fazer análise preventiva antes de implementar
3. ✅ SEMPRE atualizar napkin.md com lições aprendidas importantes
4. ✅ SEMPRE atualizar status.md com progresso de tarefas
5. ✅ NUNCA mentir sobre status de tarefas
6. ✅ NUNCA comentar código para fazer build passar
7. ✅ NUNCA usar estimativas de tempo (usar fases/etapas)
8. ✅ SEMPRE responder em Português-BR

---

## 📋 CHECKLIST RÁPIDO PARA QUALQUER TAREFA

- [ ] Li napkin.md e status.md no início?
- [ ] Entendi a arquitetura Monolito Modular?
- [ ] Identifiquei a skill Kiro correta para a tarefa?
- [ ] Fiz análise preventiva antes de implementar?
- [ ] Verifiquei isolamento de usuário (user_id)?
- [ ] Respostas estão em Português-BR?

---

**Data de Criação:** 12/03/2026  
**Versão:** 2.0 (Otimizada)  
**Status:** ✅ ATIVO E OBRIGATÓRIO  
**Projeto:** INFLUENCY V1 by RENUM  
**Economia de Contexto:** 78% de redução (45.92 KB → 10 KB)
