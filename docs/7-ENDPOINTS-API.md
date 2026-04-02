# 🔌 ENDPOINTS API - INFLUENCY v2

**Versão:** 2.0.0  
**Data:** 07/03/2026  
**Base URL:** `/api/v1`  
**Total de Endpoints:** ~70 endpoints REST  
**Status:** ✅ ESPECIFICAÇÃO COMPLETA

---

## 📋 ÍNDICE

1. [O que são Pydantic Models](#o-que-são-pydantic-models)
2. [Auth](#auth-6-endpoints)
3. [Business DNA](#business-dna-5-endpoints)
4. [Scripts](#scripts-8-endpoints)
5. [Videos](#videos-9-endpoints)
6. [Carousels](#carousels-7-endpoints)
7. [Posts](#posts-9-endpoints)
8. [Assets](#assets-6-endpoints)
9. [Assistant](#assistant-4-endpoints)
10. [Social Accounts](#social-accounts-6-endpoints)
11. [Analytics](#analytics-5-endpoints)
12. [Notifications](#notifications-5-endpoints)

---

## 🎨 O QUE SÃO PYDANTIC MODELS?

**IMPORTANTE:** Pydantic Models NÃO TEM NADA A VER com OpenRouter/Claude/GPT.

**Pydantic Models = Classes Python para validação de dados HTTP**

### Exemplo Completo

```python
# models/scripts.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

# INPUT (o que o app mobile envia)
class ScriptCreateRequest(BaseModel):
    topic: str = Field(..., min_length=3, max_length=200)
    tone: str = Field(..., pattern="^(formal|informal|empático)$")
    duration: int = Field(default=60, ge=30, le=300)  # segundos
    
# OUTPUT (o que o backend retorna)
class ScriptResponse(BaseModel):
    id: str
    title: str
    content: str
    word_count: int
    estimated_duration: int
    created_at: datetime
```

### Por que usar Pydantic?

1. **Validação automática:** FastAPI valida os dados antes de chegar no código
2. **Documentação automática:** Swagger UI gerado automaticamente
3. **Type safety:** TypeScript do frontend + Pydantic do backend = zero erros de tipo
4. **Serialização:** Converte objetos Python para JSON automaticamente

---

## 🔐 AUTH (6 endpoints)

### Pydantic Models

```python
# models/auth.py
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    name: str = Field(..., min_length=2, max_length=100)

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: int  # segundos
    user: dict

class RefreshTokenRequest(BaseModel):
    refresh_token: str
```

### Endpoints

#### POST /auth/register
**Descrição:** Criar nova conta  
**Input:** `RegisterRequest`  
**Output:** `TokenResponse`

```python
@router.post("/register", response_model=TokenResponse)
async def register(data: RegisterRequest):
    # Cria usuário no Supabase Auth
    # Retorna tokens JWT
    pass
```

#### POST /auth/login
**Descrição:** Login com email/senha  
**Input:** `LoginRequest`  
**Output:** `TokenResponse`

#### POST /auth/refresh
**Descrição:** Renovar access token  
**Input:** `RefreshTokenRequest`  
**Output:** `TokenResponse`

#### POST /auth/logout
**Descrição:** Logout (invalida refresh token)  
**Output:** `{"message": "Logged out"}`

#### GET /auth/me
**Descrição:** Dados do usuário autenticado  
**Output:** `UserResponse`

#### POST /auth/forgot-password
**Descrição:** Solicitar reset de senha  
**Input:** `{"email": "user@example.com"}`  
**Output:** `{"message": "Email enviado"}`

---

## 🧬 BUSINESS DNA (5 endpoints)

### Pydantic Models

```python
# models/business_dna.py
from pydantic import BaseModel, Field
from typing import List, Optional

class BusinessDNACreateRequest(BaseModel):
    niche: str = Field(..., min_length=3, max_length=200)
    target_audience: str = Field(..., min_length=3, max_length=500)
    tone_of_voice: str = Field(..., pattern="^(profissional|empático|descontraído|inspirador)$")
    objectives: List[str] = Field(..., min_items=1, max_items=5)
    products_services: str = Field(..., min_length=3, max_length=500)
    visual_style: Optional[dict] = None

class BusinessDNAResponse(BaseModel):
    id: str
    user_id: str
    niche: str
    target_audience: str
    tone_of_voice: str
    objectives: List[str]
    products_services: str
    visual_style: dict
    connected_networks: List[str]
    created_at: datetime
    updated_at: datetime

class BusinessDNAUpdateRequest(BaseModel):
    niche: Optional[str] = None
    target_audience: Optional[str] = None
    tone_of_voice: Optional[str] = None
    objectives: Optional[List[str]] = None
    products_services: Optional[str] = None
    visual_style: Optional[dict] = None
```

### Endpoints

#### POST /business-dna
**Descrição:** Criar Business DNA (onboarding)  
**Input:** `BusinessDNACreateRequest`  
**Output:** `BusinessDNAResponse`

#### GET /business-dna
**Descrição:** Obter Business DNA do usuário  
**Output:** `BusinessDNAResponse`

#### PUT /business-dna
**Descrição:** Atualizar Business DNA  
**Input:** `BusinessDNAUpdateRequest`  
**Output:** `BusinessDNAResponse`

#### DELETE /business-dna
**Descrição:** Deletar Business DNA (soft delete)  
**Output:** `{"message": "Deleted"}`

#### POST /business-dna/analyze-website
**Descrição:** Analisar website para extrair Business DNA  
**Input:** `{"url": "https://example.com"}`  
**Output:** `BusinessDNAResponse` (sugestões preenchidas)

---

## 📝 SCRIPTS (8 endpoints)

### Pydantic Models

```python
# models/scripts.py
from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, List
from datetime import datetime

class ScriptGenerateRequest(BaseModel):
    topic: str = Field(..., min_length=3, max_length=200)
    duration: int = Field(default=60, ge=30, le=300)  # segundos
    tone: Optional[str] = None  # Usa Business DNA se None

class ScriptFromURLRequest(BaseModel):
    url: HttpUrl
    duration: int = Field(default=60, ge=30, le=300)

class ScriptResponse(BaseModel):
    id: str
    user_id: str
    title: str
    content: str
    word_count: int
    estimated_duration: int
    topic: str
    source: str  # "ai_generated" | "url_analysis" | "manual"
    source_url: Optional[str]
    viral_score: Optional[float]
    status: str
    created_at: datetime
    updated_at: datetime

class ScriptListResponse(BaseModel):
    scripts: List[ScriptResponse]
    total: int
    page: int
    per_page: int

class ScriptUpdateRequest(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    status: Optional[str] = Field(None, pattern="^(draft|used|archived)$")
```

### Endpoints

#### POST /scripts/generate
**Descrição:** Gerar roteiro com IA (Tavily + Claude)  
**Input:** `ScriptGenerateRequest`  
**Output:** `ScriptResponse`

```python
@router.post("/generate", response_model=ScriptResponse)
async def generate_script(data: ScriptGenerateRequest, user_id: str = Depends(get_current_user)):
    # 1. Busca tendências com Tavily
    # 2. Busca Business DNA do usuário
    # 3. Gera roteiro com Claude Sonnet 4
    # 4. Salva no banco
    pass
```

#### POST /scripts/from-url
**Descrição:** Gerar roteiro a partir de URL (yt-dlp + Whisper + Claude)  
**Input:** `ScriptFromURLRequest`  
**Output:** `ScriptResponse`

#### GET /scripts
**Descrição:** Listar roteiros do usuário  
**Query Params:** `?page=1&per_page=20&status=draft`  
**Output:** `ScriptListResponse`

#### GET /scripts/{script_id}
**Descrição:** Obter roteiro específico  
**Output:** `ScriptResponse`

#### PUT /scripts/{script_id}
**Descrição:** Atualizar roteiro  
**Input:** `ScriptUpdateRequest`  
**Output:** `ScriptResponse`

#### DELETE /scripts/{script_id}
**Descrição:** Deletar roteiro (soft delete)  
**Output:** `{"message": "Deleted"}`

#### GET /scripts/viral
**Descrição:** Listar roteiros virais (viral_score > 0.7)  
**Output:** `ScriptListResponse`

#### POST /scripts/{script_id}/duplicate
**Descrição:** Duplicar roteiro  
**Output:** `ScriptResponse`

---

## 🎥 VIDEOS (9 endpoints)

### Pydantic Models

```python
# models/videos.py
from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, List
from datetime import datetime

class VideoUploadRequest(BaseModel):
    script_id: Optional[str] = None
    title: str = Field(..., min_length=3, max_length=200)
    duration: int  # segundos

class VideoResponse(BaseModel):
    id: str
    user_id: str
    script_id: Optional[str]
    raw_video_url: str
    edited_video_url: Optional[str]
    thumbnail_url: Optional[str]
    title: str
    duration: int
    resolution: str
    file_size: Optional[int]
    has_subtitles: bool
    has_music: bool
    has_assets: bool
    edit_settings: dict
    status: str  # "raw" | "editing" | "processed" | "failed"
    processing_error: Optional[str]
    created_at: datetime
    updated_at: datetime

class VideoEditRequest(BaseModel):
    add_subtitles: bool = True
    subtitle_style: str = Field(default="default", pattern="^(default|bold|minimal)$")
    add_music: bool = False
    music_volume: float = Field(default=0.3, ge=0.0, le=1.0)
    add_assets: bool = True
    cut_mode: str = Field(default="moderate", pattern="^(conservative|moderate|aggressive)$")

class VideoListResponse(BaseModel):
    videos: List[VideoResponse]
    total: int
    page: int
    per_page: int
```

### Endpoints

#### POST /videos/upload
**Descrição:** Upload de vídeo bruto (Cloudflare R2)  
**Input:** Multipart form-data + `VideoUploadRequest`  
**Output:** `VideoResponse`

#### POST /videos/{video_id}/edit
**Descrição:** Processar edição de vídeo (Celery job)  
**Input:** `VideoEditRequest`  
**Output:** `{"job_id": "uuid", "status": "processing"}`

#### GET /videos/{video_id}/edit-status
**Descrição:** Status do job de edição  
**Output:** `{"status": "processing", "progress": 45}`

#### GET /videos
**Descrição:** Listar vídeos do usuário  
**Query Params:** `?page=1&per_page=20&status=processed`  
**Output:** `VideoListResponse`

#### GET /videos/{video_id}
**Descrição:** Obter vídeo específico  
**Output:** `VideoResponse`

#### PUT /videos/{video_id}
**Descrição:** Atualizar metadados do vídeo  
**Input:** `{"title": "Novo título"}`  
**Output:** `VideoResponse`

#### DELETE /videos/{video_id}
**Descrição:** Deletar vídeo (soft delete + remove do R2)  
**Output:** `{"message": "Deleted"}`

#### POST /videos/{video_id}/thumbnail
**Descrição:** Gerar thumbnail do vídeo  
**Output:** `{"thumbnail_url": "https://..."}`

#### POST /videos/{video_id}/duplicate
**Descrição:** Duplicar vídeo  
**Output:** `VideoResponse`

---

## 🎨 CAROUSELS (7 endpoints)

### Pydantic Models

```python
# models/carousels.py
from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, List
from datetime import datetime

class CarouselSlide(BaseModel):
    title: str = Field(..., max_length=100)
    content: str = Field(..., max_length=500)
    image_url: str
    image_source: str  # "pexels" | "unsplash" | "pixabay"

class CarouselGenerateRequest(BaseModel):
    topic: str = Field(..., min_length=3, max_length=200)
    slide_count: int = Field(default=5, ge=3, le=10)

class CarouselFromURLRequest(BaseModel):
    url: HttpUrl
    slide_count: int = Field(default=5, ge=3, le=10)

class CarouselResponse(BaseModel):
    id: str
    user_id: str
    title: str
    topic: str
    slides: List[CarouselSlide]
    slide_count: int
    source: str  # "ai_generated" | "manual"
    status: str
    created_at: datetime
    updated_at: datetime

class CarouselListResponse(BaseModel):
    carousels: List[CarouselResponse]
    total: int
    page: int
    per_page: int

class CarouselUpdateRequest(BaseModel):
    title: Optional[str] = None
    slides: Optional[List[CarouselSlide]] = None
    status: Optional[str] = Field(None, pattern="^(draft|published|archived)$")
```

### Endpoints

#### POST /carousels/generate
**Descrição:** Gerar carrossel com IA (Claude + Pexels)  
**Input:** `CarouselGenerateRequest`  
**Output:** `CarouselResponse`

#### POST /carousels/from-url
**Descrição:** Gerar carrossel a partir de URL  
**Input:** `CarouselFromURLRequest`  
**Output:** `CarouselResponse`

#### GET /carousels
**Descrição:** Listar carrosséis do usuário  
**Query Params:** `?page=1&per_page=20&status=draft`  
**Output:** `CarouselListResponse`

#### GET /carousels/{carousel_id}
**Descrição:** Obter carrossel específico  
**Output:** `CarouselResponse`

#### PUT /carousels/{carousel_id}
**Descrição:** Atualizar carrossel  
**Input:** `CarouselUpdateRequest`  
**Output:** `CarouselResponse`

#### DELETE /carousels/{carousel_id}
**Descrição:** Deletar carrossel (soft delete)  
**Output:** `{"message": "Deleted"}`

#### POST /carousels/{carousel_id}/duplicate
**Descrição:** Duplicar carrossel  
**Output:** `CarouselResponse`

---

## 📤 POSTS (9 endpoints)

### Pydantic Models

```python
# models/posts.py
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class PostCreateRequest(BaseModel):
    video_id: Optional[str] = None
    carousel_id: Optional[str] = None
    caption: str = Field(..., min_length=1, max_length=2200)
    hashtags: List[str] = Field(default=[], max_items=30)
    networks: List[str] = Field(..., min_items=1)  # ["instagram", "tiktok"]
    scheduled_at: Optional[datetime] = None  # None = publicar agora

class PostResponse(BaseModel):
    id: str
    user_id: str
    video_id: Optional[str]
    carousel_id: Optional[str]
    caption: str
    hashtags: List[str]
    networks: List[str]
    scheduled_at: Optional[datetime]
    published_at: Optional[datetime]
    status: str  # "draft" | "scheduled" | "publishing" | "published" | "failed"
    mixpost_post_id: Optional[str]
    external_post_ids: dict
    metrics: dict
    created_at: datetime
    updated_at: datetime

class PostListResponse(BaseModel):
    posts: List[PostResponse]
    total: int
    page: int
    per_page: int

class PostUpdateRequest(BaseModel):
    caption: Optional[str] = None
    hashtags: Optional[List[str]] = None
    networks: Optional[List[str]] = None
    scheduled_at: Optional[datetime] = None
```

### Endpoints

#### POST /posts
**Descrição:** Criar post (agendar ou publicar)  
**Input:** `PostCreateRequest`  
**Output:** `PostResponse`

#### GET /posts
**Descrição:** Listar posts do usuário  
**Query Params:** `?page=1&per_page=20&status=published`  
**Output:** `PostListResponse`

#### GET /posts/{post_id}
**Descrição:** Obter post específico  
**Output:** `PostResponse`

#### PUT /posts/{post_id}
**Descrição:** Atualizar post (apenas se não publicado)  
**Input:** `PostUpdateRequest`  
**Output:** `PostResponse`

#### DELETE /posts/{post_id}
**Descrição:** Deletar post (soft delete)  
**Output:** `{"message": "Deleted"}`

#### POST /posts/{post_id}/publish
**Descrição:** Publicar post imediatamente  
**Output:** `PostResponse`

#### POST /posts/{post_id}/cancel
**Descrição:** Cancelar post agendado  
**Output:** `PostResponse`

#### GET /posts/{post_id}/metrics
**Descrição:** Obter métricas atualizadas do post  
**Output:** `{"metrics": {...}}`

#### POST /posts/generate-caption
**Descrição:** Gerar legenda com IA  
**Input:** `{"video_id": "uuid", "tone": "empático"}`  
**Output:** `{"caption": "...", "hashtags": [...]}`

---

## 🖼️ ASSETS (6 endpoints)

### Pydantic Models

```python
# models/assets.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AssetUploadRequest(BaseModel):
    asset_type: str = Field(..., pattern="^(logo|intro|outro|watermark)$")
    auto_apply: bool = False
    settings: Optional[dict] = None

class AssetResponse(BaseModel):
    id: str
    user_id: str
    asset_type: str
    file_url: str
    file_name: str
    file_size: int
    mime_type: str
    settings: dict
    auto_apply: bool
    is_active: bool
    created_at: datetime
    updated_at: datetime

class AssetListResponse(BaseModel):
    assets: List[AssetResponse]
    total: int
```

### Endpoints

#### POST /assets/upload
**Descrição:** Upload de asset (logo, intro, outro, watermark)  
**Input:** Multipart form-data + `AssetUploadRequest`  
**Output:** `AssetResponse`

#### GET /assets
**Descrição:** Listar assets do usuário  
**Query Params:** `?asset_type=logo`  
**Output:** `AssetListResponse`

#### GET /assets/{asset_id}
**Descrição:** Obter asset específico  
**Output:** `AssetResponse`

#### PUT /assets/{asset_id}
**Descrição:** Atualizar configurações do asset  
**Input:** `{"auto_apply": true, "settings": {...}}`  
**Output:** `AssetResponse`

#### DELETE /assets/{asset_id}
**Descrição:** Deletar asset (soft delete + remove do R2)  
**Output:** `{"message": "Deleted"}`

#### POST /assets/{asset_id}/activate
**Descrição:** Ativar/desativar asset  
**Input:** `{"is_active": true}`  
**Output:** `AssetResponse`

---

## 🤖 ASSISTANT (4 endpoints)

### Pydantic Models

```python
# models/assistant.py
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class AssistantMessage(BaseModel):
    role: str = Field(..., pattern="^(user|assistant)$")
    content: str = Field(..., min_length=1)
    mode: str = Field(..., pattern="^(voice|text)$")
    timestamp: datetime

class AssistantSendMessageRequest(BaseModel):
    conversation_id: Optional[str] = None  # None = nova conversa
    message: str = Field(..., min_length=1)
    mode: str = Field(..., pattern="^(voice|text)$")

class AssistantConversationResponse(BaseModel):
    id: str
    user_id: str
    title: Optional[str]
    messages: List[AssistantMessage]
    context: dict
    is_active: bool
    created_at: datetime
    updated_at: datetime

class AssistantListResponse(BaseModel):
    conversations: List[AssistantConversationResponse]
    total: int
```

### Endpoints

#### POST /assistant/send
**Descrição:** Enviar mensagem para o assistente (voz ou texto)  
**Input:** `AssistantSendMessageRequest`  
**Output:** `{"conversation_id": "uuid", "response": "...", "audio_url": "..."}`

```python
@router.post("/send")
async def send_message(data: AssistantSendMessageRequest, user_id: str = Depends(get_current_user)):
    # 1. Busca Business DNA do usuário
    # 2. Envia para Claude Haiku com contexto
    # 3. Gera áudio com expo-speech (se mode = voice)
    # 4. Salva conversa no banco
    pass
```

#### GET /assistant/conversations
**Descrição:** Listar conversas do usuário  
**Output:** `AssistantListResponse`

#### GET /assistant/conversations/{conversation_id}
**Descrição:** Obter conversa específica  
**Output:** `AssistantConversationResponse`

#### DELETE /assistant/conversations/{conversation_id}
**Descrição:** Deletar conversa (soft delete)  
**Output:** `{"message": "Deleted"}`

---

## 🔗 SOCIAL ACCOUNTS (6 endpoints)

### Pydantic Models

```python
# models/social_accounts.py
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class SocialAccountConnectRequest(BaseModel):
    platform: str = Field(..., pattern="^(instagram|tiktok|facebook|youtube|linkedin)$")
    code: str  # OAuth code

class SocialAccountResponse(BaseModel):
    id: str
    user_id: str
    platform: str
    account_id: str
    username: str
    display_name: Optional[str]
    avatar_url: Optional[str]
    is_active: bool
    last_sync_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

class SocialAccountListResponse(BaseModel):
    accounts: List[SocialAccountResponse]
    total: int
```

### Endpoints

#### POST /social-accounts/connect
**Descrição:** Conectar conta de rede social (OAuth via Mixpost)  
**Input:** `SocialAccountConnectRequest`  
**Output:** `SocialAccountResponse`

#### GET /social-accounts
**Descrição:** Listar contas conectadas  
**Output:** `SocialAccountListResponse`

#### GET /social-accounts/{account_id}
**Descrição:** Obter conta específica  
**Output:** `SocialAccountResponse`

#### DELETE /social-accounts/{account_id}
**Descrição:** Desconectar conta  
**Output:** `{"message": "Disconnected"}`

#### POST /social-accounts/{account_id}/refresh
**Descrição:** Renovar token OAuth  
**Output:** `SocialAccountResponse`

#### POST /social-accounts/{account_id}/sync
**Descrição:** Sincronizar dados da conta  
**Output:** `{"message": "Syncing", "job_id": "uuid"}`

---

## 📊 ANALYTICS (5 endpoints)

### Pydantic Models

```python
# models/analytics.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class AnalyticsMetrics(BaseModel):
    views: int
    likes: int
    comments: int
    shares: int
    saves: int
    reach: Optional[int]
    impressions: Optional[int]

class PostAnalyticsResponse(BaseModel):
    post_id: str
    metrics: dict  # {"instagram": AnalyticsMetrics, "tiktok": AnalyticsMetrics}
    viral_score: Optional[float]
    cached_at: datetime

class AnalyticsSummaryResponse(BaseModel):
    total_posts: int
    total_views: int
    total_likes: int
    total_comments: int
    avg_viral_score: float
    top_posts: List[PostAnalyticsResponse]
```

### Endpoints

#### GET /analytics/posts/{post_id}
**Descrição:** Obter métricas de um post específico  
**Output:** `PostAnalyticsResponse`

#### GET /analytics/summary
**Descrição:** Resumo de analytics do usuário  
**Query Params:** `?start_date=2026-01-01&end_date=2026-03-07`  
**Output:** `AnalyticsSummaryResponse`

#### GET /analytics/viral-posts
**Descrição:** Listar posts virais (viral_score > 0.7)  
**Output:** `List[PostAnalyticsResponse]`

#### POST /analytics/refresh
**Descrição:** Atualizar métricas de todos os posts  
**Output:** `{"message": "Refreshing", "job_id": "uuid"}`

#### GET /analytics/trends
**Descrição:** Tendências de performance ao longo do tempo  
**Query Params:** `?period=30d`  
**Output:** `{"trends": [...]}`

---

## 🔔 NOTIFICATIONS (5 endpoints)

### Pydantic Models

```python
# models/notifications.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class NotificationResponse(BaseModel):
    id: str
    user_id: str
    title: str
    body: str
    notification_type: str
    data: dict
    is_read: bool
    read_at: Optional[datetime]
    created_at: datetime

class NotificationListResponse(BaseModel):
    notifications: List[NotificationResponse]
    total: int
    unread_count: int
```

### Endpoints

#### GET /notifications
**Descrição:** Listar notificações do usuário  
**Query Params:** `?is_read=false&page=1&per_page=20`  
**Output:** `NotificationListResponse`

#### GET /notifications/{notification_id}
**Descrição:** Obter notificação específica  
**Output:** `NotificationResponse`

#### PUT /notifications/{notification_id}/read
**Descrição:** Marcar notificação como lida  
**Output:** `NotificationResponse`

#### PUT /notifications/read-all
**Descrição:** Marcar todas como lidas  
**Output:** `{"message": "All marked as read"}`

#### DELETE /notifications/{notification_id}
**Descrição:** Deletar notificação  
**Output:** `{"message": "Deleted"}`

---

## 🚦 RATE LIMITING POR PLANO

| Recurso | Básico | Pro | Enterprise |
|---------|--------|-----|------------|
| Script AI | 30/mês | 50/mês | Ilimitado |
| Carrosséis | 20/mês | 50/mês | Ilimitado |
| Análise de URL | 15/mês | 30/mês | Ilimitado |
| Assistente IA | Sem limite | Sem limite | Sem limite |
| Gravação/Edição | Sem limite | Sem limite | Sem limite |

> Implementado via middleware `check_quota` que consulta a tabela `api_usage` no Supabase antes de cada operação de geração. Retorna HTTP 429 com mensagem `"Cota mensal atingida. Faça upgrade do seu plano."` quando o limite é excedido.

---

## 🔒 AUTENTICAÇÃO E AUTORIZAÇÃO

### Middleware de Autenticação

```python
# middleware/auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client
import os

security = HTTPBearer()
supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """
    Valida JWT token e retorna user_id
    """
    try:
        token = credentials.credentials
        user = supabase.auth.get_user(token)
        return user.id
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
```

### Uso nos Endpoints

```python
@router.get("/scripts")
async def list_scripts(user_id: str = Depends(get_current_user)):
    # user_id já está validado e disponível
    scripts = await scripts_service.list_user_scripts(user_id)
    return scripts
```

---

## 📚 REFERÊNCIAS

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Pydantic Docs](https://docs.pydantic.dev/)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [OpenAPI Specification](https://swagger.io/specification/)

---

**Última Atualização:** 07/03/2026  
**Versão:** 2.0.0  
**Status:** ✅ COMPLETO
