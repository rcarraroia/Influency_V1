# 📁 Estrutura da Pasta .kiro

> Documentação da organização de arquivos e otimização de contexto do projeto Influency V1

---

## 🎯 Objetivo

Reduzir contexto permanente em **78%** através de:
- Separação por frequência de uso
- Implementação de memória de longo prazo (Napkin)
- Documentação organizada e consultada sob demanda

---

## 📂 Estrutura

```
.kiro/
├── steering/                          ← Carregado SEMPRE (inclusion: always)
│   └── AGENTS.md                      ← Regras globais + referências (10 KB)
│
├── docs/                              ← Consultado SOB DEMANDA
│   ├── napkin.md                      ← Lições aprendidas (lido no início)
│   ├── status.md                      ← Histórico de tarefas (lido no início)
│   └── skills-instaladas.md           ← Listagem de 70 skills (consultado quando necessário)
│
├── specs/                             ← Specs de features
│   ├── fase-2-conversao-react-native/
│   ├── influency-v1-screens/
│   └── tasks/
│
└── README.md                          ← Este arquivo
```

---

## 🔄 Fluxo de Trabalho

1. **Kiro carrega `AGENTS.md` automaticamente** (10 KB)
2. **AGENTS.md instrui:** "Leia `napkin.md` e `status.md`"
3. **Kiro lê napkin.md** (lições aprendidas acumuladas)
4. **Kiro lê status.md** (tarefas pendentes)
5. **Durante trabalho:** Atualiza napkin.md com novas lições
6. **Final da tarefa:** Atualiza status.md com progresso

---

## 📊 Economia de Contexto

### **Antes da Otimização:**
```
.kiro/steering/ (tudo carregado automaticamente)
├── AGENTS.md (18.48 KB)
├── SKILLS-INSTALADAS.md (21.48 KB)
└── STATUS.md (5.96 KB)

TOTAL: 45.92 KB (~6% de contexto permanente)
```

### **Depois da Otimização:**
```
.kiro/steering/ (carregado automaticamente)
└── AGENTS.md (10 KB)

.kiro/docs/ (consultado sob demanda)
├── napkin.md (5 KB - lido no início)
├── status.md (6 KB - lido no início)
└── skills-instaladas.md (21 KB - consultado quando necessário)

CONTEXTO PERMANENTE: 10 KB (~1.5% de contexto)
CONTEXTO INÍCIO: 21 KB (~3% de contexto)
```

### **Resultado:**
- **Economia:** 78% de redução no contexto permanente
- **Antes:** 45.92 KB → **Depois:** 10 KB
- **Contexto total no início:** 21 KB (napkin + status + AGENTS)

---

## 📝 Descrição dos Arquivos

### **steering/AGENTS.md** (10 KB)
- Regras globais mínimas
- Arquitetura do sistema (resumo)
- Princípios fundamentais
- Design system (resumo)
- Skills críticas (resumo)
- Referências para documentação em `docs/`
- **Carregamento:** Automático (inclusion: always)

### **docs/napkin.md** (5 KB)
- Lições aprendidas curadas
- Máximo 10 itens por categoria
- Formato: `[DATA] Lição` + `Do instead: Ação`
- Categorias: Execução, Arquitetura, Mobile, UI/UX, Banco, Deploy, Diretrizes
- **Carregamento:** Lido no início de toda sessão (instrução no AGENTS.md)

### **docs/status.md** (6 KB)
- Histórico de tarefas do projeto
- Tarefa atual + status
- Tarefas anteriores (últimas 5-10)
- Próximos passos
- **Carregamento:** Lido no início de toda sessão (instrução no AGENTS.md)

### **docs/skills-instaladas.md** (21 KB)
- Listagem completa de 70 skills/agents
- 60 skills globais + 6 locais + 4 agents
- Descrições detalhadas
- Quando usar cada skill
- Estatísticas e comparações
- **Carregamento:** Consultado sob demanda (quando necessário escolher uma skill)

---

## 🧠 Conceito do Napkin (Memória de Longo Prazo)

O `napkin.md` é um "runbook curado" que:
- Acumula lições aprendidas durante o trabalho
- É lido no INÍCIO de toda sessão
- Máximo 10 itens por categoria (curadoria contínua)
- Formato consistente: `[DATA] Lição` + `Do instead: Ação concreta`
- Categorias adaptadas ao projeto Influency

### **Categorias do Napkin:**
1. 🎯 Execução & Validação (Prioridade Máxima)
2. 🏗️ Arquitetura & Backend (FastAPI)
3. 📱 Mobile & React Native
4. 🎨 UI/UX & Design
5. 🗄️ Banco de Dados (Supabase)
6. 🚀 Deploy & Ambiente
7. 👤 Diretrizes do Usuário (Renato Carraro)

---

## 🔧 Manutenção

### **Atualização do Napkin:**
- **Durante o trabalho:** Adicionar lições aprendidas imediatamente
- **Curadoria semanal:** Re-priorizar, remover obsoletos, merge similares
- **Limite:** Máximo 10 itens por categoria

### **Atualização do Status:**
- **Ao final de cada tarefa:** Mover "TAREFA ATUAL" para "TAREFA ANTERIOR"
- **Adicionar nova tarefa:** Descrever objetivo, status, próximos passos
- **Histórico:** Manter últimas 5-10 tarefas

### **Revisão Mensal:**
- [ ] Revisar napkin.md (remover obsoletos)
- [ ] Revisar AGENTS.md (atualizar se necessário)
- [ ] Limpar status.md (mover histórico antigo)
- [ ] Verificar economia de contexto (ainda ~78%?)

---

## 📚 Referências

### **Projeto de Referência:**
- **Nome:** Slim Quality
- **Commit:** `6aae3f0` (reestruturação)
- **Economia:** 85% de redução de contexto

### **Skill Original:**
- **Nome:** Napkin
- **Autor:** Codex
- **Versão:** 6.0.0
- **Repositório:** https://github.com/blader/napkin

### **Guia de Implementação:**
- **Arquivo:** `GUIA_IMPLEMENTACAO_ESTRUTURA_KIRO.md`
- **Versão:** 1.0
- **Data:** 12/03/2026

---

## ✅ Benefícios

1. ✅ **Economia de contexto:** 78% menos contexto permanente
2. ✅ **Respostas mais rápidas:** Menos dados para processar
3. ✅ **Memória entre sessões:** Napkin acumula lições aprendidas
4. ✅ **Aprendizado contínuo:** Kiro melhora a cada sessão
5. ✅ **Documentação organizada:** Fácil encontrar informações
6. ✅ **Escalabilidade:** Adicionar docs não afeta contexto base

---

## 🎯 Stack do Projeto

- **Mobile:** React Native 0.73+ + Expo 50+
- **Web:** React 18+ + Vite 5+ + Tailwind CSS + shadcn/ui
- **Backend:** FastAPI 0.109+ (Python 3.11+)
- **Banco:** PostgreSQL 15 (Supabase)
- **Deploy:** EAS Build (mobile) + Vercel (web) + Railway (backend)

---

**Data de Implementação:** 12/03/2026  
**Versão:** 2.0 (Otimizada)  
**Status:** ✅ ATIVO  
**Projeto:** INFLUENCY V1 by RENUM  
**Economia de Contexto:** 78% (45.92 KB → 10 KB)
