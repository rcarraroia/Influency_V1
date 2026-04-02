# 🏗️ ARQUITETURA BACKEND - INFLUENCY v2

**Versão:** 2.0.0  
**Data:** 07/03/2026  
**Stack:** FastAPI + Celery + Redis + Supabase  
**Status:** ✅ ESPECIFICAÇÃO COMPLETA

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estrutura de Módulos](#estrutura-de-módulos)
4. [Workers Assíncronos](#workers-assíncronos)
5. [Integrações Externas](#integrações-externas)
6. [Segurança e Autenticação](#segurança-e-autenticação)
7. [Escalabilidade](#escalabilidade)

---

## 🎯 VISÃO GERAL

### Arquitetura Monolítica Modular

O backend do Influency v2 segue uma arquitetura monolítica modular, onde:
- **Monolito:** Todos os módulos em um único codebase
- **Modular:** Cada módulo é independente e isolado
- **Escalável:** Pode escalar horizontalmente

### Princípios Arquiteturais

1. **Isolamento de Dados:** RLS garante que usuários só acessam seus dados
2. **Processamento Assíncrono:** Workers Celery para tarefas pesadas
3. **Cache Agressivo:** Redis para reduzir latência
4. **Fail-Safe:** Fallbacks para todas as integrações
5. **Observabilidade:** Logs, métricas e traces completos

---

## 💻 STACK TECNOLÓGICO

### Core
- **FastAPI 0.109+** - Framework web assíncrono
- **Python 3.11+** - Linguagem
- **Pydantic 2.0+** - Validação de dados
- **uvicorn** - ASGI server

### Database
- **Supabase** - PostgreSQL 15 + Auth + Storage
- **pgvector** - Extensão para embeddings (RAG)
- **SQLAlchemy** - ORM (opcional, usamos Supabase client)

### Queue & Cache
- **Celery 5.3+** - Task queue
- **Redis 7.0+** - Message broker + cache
- **Flower** - Monitoring de Celery

### Processamento
- **FFmpeg** - Edição de vídeo
- **Pillow** - Processamento de imagens
- **yt-dlp** - Download de vídeos

### Integrações
- **OpenRouter** - Claude Sonnet 4 + Haiku
- **Whisper API** - Transcrição
- **Mixpost** - Publicação multi-rede
- **Tavily** - Busca web
- **Cloudflare R2** - Storage de vídeos

### Monitoring
- **Sentry** - Error tracking
- **Prometheus** - Métricas
- **Grafana** - Dashboards

---

## 📁 ESTRUTURA DE MÓDULOS

```
app/
├── main.py                 # Entry point FastAPI
├── config.py               # Configurações (env vars)
├── database/
│   └── client.py          # Supabase client
├── shared/
│   ├── auth.py            # JWT middleware
│   ├── utils.py           # Funções utilitárias
│   └── exceptions.py      # Exceções customizadas
├── modules/
│   ├── auth/              # Autenticação
│   │   ├── router.py
│   │   ├── service.py
│   │   └── models.py
│   ├── users/             # Usuários
│   │   ├── router.py
│   │   ├── service.py
│   │   └── models.py
│   ├── scripts/           # Geração de roteiros
│   │   ├── router.py
│   │   ├── service.py
│   │   ├── models.py
│   │   └── tasks.py
│   ├── videos/            # Processamento de vídeos
│   │   ├── router.py
│   │   ├── service.py
│   │   ├── models.py
│   │   └── tasks.py
│   ├── carousels/         # Geração de carrosséis
│   │   ├── router.py
│   │   ├── service.py
│   │   ├── models.py
│   │   └── tasks.py
│   ├── posts/             # Agendamento e publicação
│   │   ├── router.py
│   │   ├── service.py
│   │   ├── models.py
│   │   └── tasks.py
│   ├── assistant/         # Chat com assistente
│   │   ├── router.py
│   │   ├── service.py
│   │   └── models.py
│   ├── analytics/         # Métricas e insights
│   │   ├── router.py
│   │   ├── service.py
│   │   ├── models.py
│   │   └── tasks.py
│   └── onboarding/        # Business DNA
│       ├── router.py
│       ├── service.py
│       └── models.py
├── integrations/
│   ├── openrouter.py      # Claude Sonnet 4 + Haiku
│   ├── whisper.py         # Transcrição
│   ├── mixpost.py         # Publicação
│   ├── tavily.py          # Busca web
│   ├── pexels.py          # Imagens
│   ├── pixabay.py         # Música
│   └── cloudflare_r2.py   # Storage
└── workers/
    ├── celery_app.py      # Configuração Celery
    ├── video_processing.py
    ├── script_generation.py
    ├── carousel_generation.py
    ├── analytics_collection.py
    └── viral_score.py
```


---

## 🔧 MÓDULOS DETALHADOS

### 1. Auth Module

**Responsabilidade:** Autenticação e autorização

**Endpoints:**
- `POST /auth/login` - Login com email/senha
- `POST /auth/refresh` - Refresh token
- `POST /auth/logout` - Logout
- `POST /auth/register` - Registro de novo usuário

**Service Layer:**
```python
# app/modules/auth/service.py
from app.database.client import get_supabase_client
from app.shared.auth import create_access_token, create_refresh_token

class AuthService:
    def __init__(self):
        self.db = get_supabase_client()
    
    async def login(self, email: str, password: str):
        # Autentica com Supabase Auth
        response = self.db.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        # Gera tokens JWT
        access_token = create_access_token(response.user.id)
        refresh_token = create_refresh_token(response.user.id)
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": response.user
        }
```

---

### 2. Scripts Module

**Responsabilidade:** Geração de roteiros com IA

**Endpoints:**
- `POST /scripts/generate` - Gerar roteiro
- `GET /scripts` - Listar roteiros
- `GET /scripts/{id}` - Obter roteiro
- `PUT /scripts/{id}` - Editar roteiro
- `DELETE /scripts/{id}` - Deletar roteiro

**Service Layer:**
```python
# app/modules/scripts/service.py
from app.integrations.openrouter import OpenRouterClient
from app.integrations.tavily import TavilyClient
from app.database.client import get_supabase_client

class ScriptsService:
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.db = get_supabase_client()
        self.openrouter = OpenRouterClient()
        self.tavily = TavilyClient()
    
    async def generate_script(self, topic: str):
        # 1. Buscar Business DNA do usuário
        user = self.db.table("users").select("business_dna").eq("id", self.user_id).single().execute()
        business_dna = user.data["business_dna"]
        
        # 2. Buscar tendências sobre o tema
        trends = await self.tavily.search(topic)
        
        # 3. Buscar roteiros virais similares (RAG)
        similar_scripts = await self._get_similar_viral_scripts(topic)
        
        # 4. Gerar roteiro com Claude Sonnet 4
        prompt = self._build_prompt(topic, business_dna, trends, similar_scripts)
        script = await self.openrouter.generate(prompt, model="anthropic/claude-sonnet-4-20250514")
        
        # 5. Salvar no banco
        result = self.db.table("scripts").insert({
            "user_id": self.user_id,
            "topic": topic,
            "content": script,
            "status": "draft"
        }).execute()
        
        return result.data[0]
```

**Worker Celery:**
```python
# app/workers/script_generation.py
from celery import shared_task
from app.modules.scripts.service import ScriptsService

@shared_task(name="generate_script_async")
def generate_script_async(user_id: str, topic: str):
    service = ScriptsService(user_id)
    return service.generate_script(topic)
```

---

### 3. Videos Module

**Responsabilidade:** Processamento de vídeos

**Endpoints:**
- `POST /videos/upload` - Upload de vídeo
- `POST /videos/{id}/process` - Processar vídeo
- `GET /videos` - Listar vídeos
- `GET /videos/{id}` - Obter vídeo
- `DELETE /videos/{id}` - Deletar vídeo

**Service Layer:**
```python
# app/modules/videos/service.py
from app.integrations.whisper import WhisperClient
from app.integrations.cloudflare_r2 import R2Client
import subprocess

class VideosService:
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.db = get_supabase_client()
        self.whisper = WhisperClient()
        self.r2 = R2Client()
    
    async def process_video(self, video_id: str):
        # 1. Buscar vídeo
        video = self.db.table("videos").select("*").eq("id", video_id).single().execute()
        
        # 2. Download do R2
        video_path = await self.r2.download(video.data["original_url"])
        
        # 3. Gerar legendas com Whisper
        subtitles = await self.whisper.transcribe(video_path)
        
        # 4. Detectar pausas e gaguejos
        cuts = self._detect_errors(subtitles)
        
        # 5. Aplicar cortes com FFmpeg
        edited_path = self._apply_cuts(video_path, cuts)
        
        # 6. Adicionar legendas
        final_path = self._add_subtitles(edited_path, subtitles)
        
        # 7. Upload para R2
        final_url = await self.r2.upload(final_path)
        
        # 8. Atualizar banco
        self.db.table("videos").update({
            "edited_url": final_url,
            "status": "processed"
        }).eq("id", video_id).execute()
        
        return final_url
```

---

### 4. Posts Module

**Responsabilidade:** Agendamento e publicação

**Endpoints:**
- `POST /posts/schedule` - Agendar post
- `POST /posts/publish` - Publicar imediatamente
- `GET /posts` - Listar posts
- `GET /posts/{id}` - Obter post
- `DELETE /posts/{id}` - Cancelar post

**Service Layer:**
```python
# app/modules/posts/service.py
from app.integrations.mixpost import MixpostClient
from app.integrations.openrouter import OpenRouterClient

class PostsService:
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.db = get_supabase_client()
        self.mixpost = MixpostClient()
        self.openrouter = OpenRouterClient()
    
    async def schedule_post(self, video_id: str, networks: list, scheduled_at: str):
        # 1. Buscar vídeo e Business DNA
        video = self.db.table("videos").select("*").eq("id", video_id).single().execute()
        user = self.db.table("users").select("business_dna").eq("id", self.user_id).single().execute()
        
        # 2. Gerar legenda e hashtags com IA
        caption = await self._generate_caption(video.data, user.data["business_dna"])
        hashtags = await self._generate_hashtags(video.data, user.data["business_dna"])
        
        # 3. Agendar no Mixpost
        mixpost_response = await self.mixpost.schedule_post({
            "accounts": networks,
            "content": f"{caption}\n\n{hashtags}",
            "media": [video.data["edited_url"]],
            "scheduled_at": scheduled_at
        })
        
        # 4. Salvar no banco
        result = self.db.table("posts").insert({
            "user_id": self.user_id,
            "video_id": video_id,
            "networks": networks,
            "caption": caption,
            "hashtags": hashtags,
            "scheduled_at": scheduled_at,
            "mixpost_id": mixpost_response["id"],
            "status": "scheduled"
        }).execute()
        
        return result.data[0]
```

---

## ⚙️ WORKERS ASSÍNCRONOS (CELERY)

### Configuração Celery

```python
# app/workers/celery_app.py
from celery import Celery
from app.config import settings

celery_app = Celery(
    "influency",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="America/Sao_Paulo",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=3600,  # 1 hora
    task_soft_time_limit=3000,  # 50 minutos
)

# Celery Beat (tarefas agendadas)
celery_app.conf.beat_schedule = {
    "collect-analytics-daily": {
        "task": "collect_post_analytics",
        "schedule": 86400.0,  # 24 horas
    },
}
```

### Worker 1: Video Processing

```python
# app/workers/video_processing.py
from celery import shared_task
from app.modules.videos.service import VideosService

@shared_task(name="process_video")
def process_video_task(user_id: str, video_id: str):
    """
    Processa vídeo: legendas, cortes, música, assets
    Tempo estimado: 3-5 minutos
    """
    service = VideosService(user_id)
    return service.process_video(video_id)

@shared_task(name="generate_subtitles")
def generate_subtitles_task(video_id: str):
    """
    Gera legendas com Whisper
    Tempo estimado: 30-60 segundos
    """
    service = VideosService(user_id)
    return service.generate_subtitles(video_id)
```

### Worker 2: Script Generation

```python
# app/workers/script_generation.py
from celery import shared_task
from app.modules.scripts.service import ScriptsService

@shared_task(name="generate_script")
def generate_script_task(user_id: str, topic: str):
    """
    Gera roteiro com IA
    Tempo estimado: 20-30 segundos
    """
    service = ScriptsService(user_id)
    return service.generate_script(topic)
```

### Worker 3: Carousel Generation

```python
# app/workers/carousel_generation.py
from celery import shared_task
from app.modules.carousels.service import CarouselsService

@shared_task(name="generate_carousel")
def generate_carousel_task(user_id: str, topic: str, num_slides: int):
    """
    Gera carrossel de imagens
    Tempo estimado: 1-2 minutos
    """
    service = CarouselsService(user_id)
    return service.generate_carousel(topic, num_slides)
```

### Worker 4: Analytics Collection

```python
# app/workers/analytics_collection.py
from celery import shared_task
from app.modules.analytics.service import AnalyticsService

@shared_task(name="collect_post_analytics")
def collect_post_analytics_task():
    """
    Coleta métricas de posts publicados (roda diariamente)
    Tempo estimado: 5-10 minutos
    """
    service = AnalyticsService()
    return service.collect_all_analytics()
```

### Worker 5: Viral Score Calculation

```python
# app/workers/viral_score.py
from celery import shared_task
from app.modules.analytics.service import ViralScoreService

@shared_task(name="calculate_viral_score")
def calculate_viral_score_task(post_id: str):
    """
    Calcula Viral Score e armazena embeddings (RAG)
    Tempo estimado: 10-20 segundos
    """
    service = ViralScoreService()
    return service.calculate_and_store(post_id)
```

---

## 🔌 INTEGRAÇÕES EXTERNAS

### 1. OpenRouter (Claude)

```python
# app/integrations/openrouter.py
import httpx
from app.config import settings

class OpenRouterClient:
    def __init__(self, user_api_key: str = None):
        self.api_key = user_api_key or settings.OPENROUTER_API_KEY
        self.base_url = "https://openrouter.ai/api/v1"
    
    async def generate(self, prompt: str, model: str = "anthropic/claude-sonnet-4-20250514"):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={
                    "model": model,
                    "messages": [{"role": "user", "content": prompt}]
                },
                timeout=60.0
            )
            return response.json()["choices"][0]["message"]["content"]
```

### 2. Whisper API

```python
# app/integrations/whisper.py
import httpx
from app.config import settings

class WhisperClient:
    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY
        self.base_url = "https://api.openai.com/v1"
    
    async def transcribe(self, audio_file: bytes):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/audio/transcriptions",
                headers={"Authorization": f"Bearer {self.api_key}"},
                files={"file": ("audio.mp3", audio_file)},
                data={"model": "whisper-1", "response_format": "verbose_json"},
                timeout=120.0
            )
            return response.json()
```

### 3. Mixpost API

```python
# app/integrations/mixpost.py
import httpx
from app.config import settings

class MixpostClient:
    def __init__(self):
        self.api_url = settings.MIXPOST_API_URL
        self.api_key = settings.MIXPOST_API_KEY
    
    async def schedule_post(self, data: dict):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.api_url}/posts/schedule",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json=data,
                timeout=30.0
            )
            return response.json()
    
    async def get_analytics(self, post_id: str):
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.api_url}/posts/{post_id}/analytics",
                headers={"Authorization": f"Bearer {self.api_key}"},
                timeout=30.0
            )
            return response.json()
```

---

## 🔐 SEGURANÇA E AUTENTICAÇÃO

### JWT Middleware

```python
# app/shared/auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from app.config import settings

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.JWT_SECRET,
            algorithms=["HS256"]
        )
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

### Row Level Security (RLS)

Todas as tabelas do Supabase têm RLS habilitado:

```sql
-- Exemplo: Tabela scripts
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access only their scripts"
    ON scripts FOR ALL
    USING (auth.uid() = user_id);
```

### Criptografia de API Keys

```python
# app/shared/encryption.py
from cryptography.fernet import Fernet
from app.config import settings

cipher = Fernet(settings.ENCRYPTION_KEY.encode())

def encrypt_api_key(api_key: str) -> str:
    return cipher.encrypt(api_key.encode()).decode()

def decrypt_api_key(encrypted_key: str) -> str:
    return cipher.decrypt(encrypted_key.encode()).decode()
```

---

## 📈 ESCALABILIDADE

### Horizontal Scaling

**API (FastAPI):**
- Deploy no Hostinger KVM 2
- Load balancer automático
- Auto-scaling baseado em CPU/memória

**Workers (Celery):**
- Deploy múltiplos workers
- Cada worker processa tarefas em paralelo
- Auto-scaling baseado em fila

**Database (Supabase):**
- Read replicas para queries pesadas
- Connection pooling (pgBouncer)
- Índices otimizados

### Caching Strategy

**Redis Cache:**
```python
# app/shared/cache.py
import redis
from app.config import settings

redis_client = redis.from_url(settings.REDIS_URL)

def cache_get(key: str):
    return redis_client.get(key)

def cache_set(key: str, value: str, ttl: int = 3600):
    redis_client.setex(key, ttl, value)
```

**Cache Layers:**
1. **L1 (In-Memory):** Dados frequentes (Business DNA)
2. **L2 (Redis):** Resultados de IA, analytics
3. **L3 (Database):** Dados persistentes

### Rate Limiting

```python
# app/shared/rate_limit.py
from fastapi import Request, HTTPException
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@limiter.limit("100/minute")
async def rate_limited_endpoint(request: Request):
    # Endpoint logic
    pass
```

---

**Última Atualização:** 07/03/2026  
**Versão:** 2.0.0  
**Status:** ✅ ESPECIFICAÇÃO COMPLETA  
**Próximo Documento:** [ARQUITETURA-FRONTEND.md](./ARQUITETURA-FRONTEND.md)
