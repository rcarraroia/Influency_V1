# 🔌 INTEGRAÇÕES EXTERNAS - INFLUENCY v2

**Versão:** 2.0.0  
**Data:** 07/03/2026  
**Total de Integrações:** 9 APIs externas  
**Status:** ✅ ESPECIFICAÇÃO COMPLETA

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [OpenRouter (Claude)](#openrouter-claude)
3. [Whisper (Transcrição)](#whisper-transcrição)
4. [Mixpost (Redes Sociais)](#mixpost-redes-sociais)
5. [Tavily (Busca de Tendências)](#tavily-busca-de-tendências)
6. [Pexels, Unsplash, Pixabay (Imagens)](#pexels-unsplash-pixabay-imagens)
7. [Cloudflare R2 (Storage)](#cloudflare-r2-storage)
8. [yt-dlp (Download de Vídeos)](#yt-dlp-download-de-vídeos)
9. [Custos Consolidados](#custos-consolidados)

---

## 🎯 VISÃO GERAL

### Modelo de API Keys

O Influency v2 usa um modelo centralizado de API keys gerenciadas pelo RENUM:

#### RENUM Gerencia (Centralizado)
- **OpenRouter (Claude):** RENUM fornece API key
- **Whisper:** RENUM fornece API key
- **Mixpost:** RENUM fornece licença
- **Tavily:** RENUM fornece API key
- **Pexels, Unsplash, Pixabay:** RENUM fornece API keys
- **Cloudflare R2:** RENUM gerencia bucket

**Motivo:** Custos previsíveis, melhor UX (usuário não precisa criar contas externas), controle de qualidade

**Nota:** HeyGen foi removido do escopo (Avatar não faz parte do MVP)

### Segurança de API Keys

```python
# Criptografia de API keys com Fernet
from cryptography.fernet import Fernet
import os

ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY")
cipher = Fernet(ENCRYPTION_KEY.encode())

def encrypt_api_key(api_key: str) -> str:
    return cipher.encrypt(api_key.encode()).decode()

def decrypt_api_key(encrypted_key: str) -> str:
    return cipher.decrypt(encrypted_key.encode()).decode()
```

---

## 🤖 OPENROUTER (CLAUDE)

### Descrição
OpenRouter é um gateway unificado para múltiplos modelos de IA. Usamos para acessar Claude Sonnet 4 (scripts) e Claude Haiku (assistente).

### Modelos Utilizados

#### Claude Sonnet 4 (Scripts)
- **Uso:** Geração de roteiros virais
- **Custo:** $3.00 / 1M tokens input, $15.00 / 1M tokens output
- **Contexto:** 200k tokens
- **Estimativa:** ~2000 tokens por roteiro

#### Claude Haiku (Assistente)
- **Uso:** Assistente IA conversacional
- **Custo:** $0.25 / 1M tokens input, $1.25 / 1M tokens output
- **Contexto:** 200k tokens
- **Estimativa:** ~500 tokens por interação

### Implementação

```python
# services/openrouter.py
import httpx
import os

class OpenRouterService:
    def __init__(self):
        # API key gerenciada pelo RENUM (centralizada)
        self.api_key = os.getenv("OPENROUTER_API_KEY")
        self.base_url = "https://openrouter.ai/api/v1"
    
    async def generate_script(
        self,
        topic: str,
        business_dna: dict,
        trends: list,
        duration: int = 60
    ) -> dict:
        """
        Gera roteiro viral com Claude Sonnet 4
        """
        prompt = f"""
        Você é um especialista em criação de conteúdo viral para redes sociais.
        
        BUSINESS DNA:
        - Nicho: {business_dna['niche']}
        - Público: {business_dna['target_audience']}
        - Tom: {business_dna['tone_of_voice']}
        
        TENDÊNCIAS ATUAIS:
        {self._format_trends(trends)}
        
        TAREFA:
        Crie um roteiro de {duration} segundos sobre "{topic}" que:
        1. Seja viral (gancho nos primeiros 3 segundos)
        2. Siga o tom de voz do Business DNA
        3. Incorpore tendências relevantes
        4. Tenha CTA claro no final
        
        FORMATO:
        Retorne JSON com:
        {{
          "title": "Título chamativo",
          "content": "Roteiro completo (150 palavras/min)",
          "hook": "Gancho dos primeiros 3 segundos",
          "cta": "Call-to-action final"
        }}
        """
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "HTTP-Referer": "https://influency.renum.com.br",
                    "X-Title": "Influency"
                },
                json={
                    "model": "anthropic/claude-sonnet-4-20250514",
                    "messages": [
                        {"role": "user", "content": prompt}
                    ],
                    "response_format": {"type": "json_object"}
                }
            )
            return response.json()
    
    async def chat_assistant(
        self,
        message: str,
        business_dna: dict,
        conversation_history: list
    ) -> str:
        """
        Assistente IA conversacional com Claude Haiku
        """
        system_prompt = f"""
        Você é o assistente IA do Influency, especializado em criação de conteúdo.
        
        BUSINESS DNA DO USUÁRIO:
        - Nicho: {business_dna['niche']}
        - Público: {business_dna['target_audience']}
        - Tom: {business_dna['tone_of_voice']}
        
        COMPORTAMENTO:
        - Seja proativo e sugira ideias de conteúdo
        - Use o tom de voz do Business DNA
        - Seja conciso (máx. 100 palavras por resposta)
        - Sempre ofereça próximos passos
        """
        
        messages = [
            {"role": "system", "content": system_prompt},
            *conversation_history,
            {"role": "user", "content": message}
        ]
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "HTTP-Referer": "https://influency.renum.com.br",
                    "X-Title": "Influency"
                },
                json={
                    "model": "anthropic/claude-haiku-4-5-20251001",
                    "messages": messages
                }
            )
            return response.json()["choices"][0]["message"]["content"]
```

### Custos Estimados

**Premissa:** 8 vídeos/usuário/mês, 1000 usuários

- **Scripts (Sonnet 4):** 8000 scripts/mês × 2000 tokens × $0.015/1k = $240/mês
- **Assistente (Haiku):** 1000 usuários × 30 interações × 500 tokens × $0.001/1k = $15/mês
- **Total:** $255/mês

---

## 🎙️ WHISPER (TRANSCRIÇÃO)

### Descrição
Whisper da OpenAI para transcrição de áudio em legendas e análise de URL.

### Implementação

```python
# services/whisper.py
import httpx
import os

class WhisperService:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.base_url = "https://api.openai.com/v1"
    
    async def transcribe_video(self, video_path: str) -> dict:
        """
        Transcreve vídeo para gerar legendas
        """
        async with httpx.AsyncClient() as client:
            with open(video_path, "rb") as audio_file:
                response = await client.post(
                    f"{self.base_url}/audio/transcriptions",
                    headers={"Authorization": f"Bearer {self.api_key}"},
                    files={"file": audio_file},
                    data={
                        "model": "whisper-1",
                        "language": "pt",
                        "response_format": "verbose_json",
                        "timestamp_granularities": ["word"]
                    }
                )
        
        return response.json()
    
    def format_subtitles(self, transcription: dict) -> str:
        """
        Converte transcrição em formato SRT
        """
        srt_content = ""
        for i, segment in enumerate(transcription["segments"], 1):
            start = self._format_timestamp(segment["start"])
            end = self._format_timestamp(segment["end"])
            text = segment["text"].strip()
            
            srt_content += f"{i}\n{start} --> {end}\n{text}\n\n"
        
        return srt_content
    
    def _format_timestamp(self, seconds: float) -> str:
        """Converte segundos para formato SRT (00:00:00,000)"""
        hours = int(seconds // 3600)
        minutes = int((seconds % 3600) // 60)
        secs = int(seconds % 60)
        millis = int((seconds % 1) * 1000)
        return f"{hours:02d}:{minutes:02d}:{secs:02d},{millis:03d}"
```

### Custos Estimados

**Premissa:** 8 vídeos/usuário/mês, 1000 usuários, 60 segundos/vídeo

- **Transcrições:** 8000 vídeos × 1 minuto × $0.006/min = $48/mês

---

## 📱 MIXPOST (REDES SOCIAIS)

### Descrição
Mixpost Pro/Enterprise para publicação multi-rede (Instagram, TikTok, Facebook, YouTube, LinkedIn).

### Planos

- **Pro:** $99/mês (3 workspaces, 30 contas)
- **Enterprise:** $299/mês (10 workspaces, 100 contas)

**Escolha:** Enterprise ($299/mês) para suportar 1000 usuários

### Implementação

```python
# services/mixpost.py
import httpx
import os

class MixpostService:
    def __init__(self):
        self.api_key = os.getenv("MIXPOST_API_KEY")
        self.base_url = os.getenv("MIXPOST_URL")  # Self-hosted
    
    async def connect_account(
        self,
        user_id: str,
        platform: str,
        oauth_code: str
    ) -> dict:
        """
        Conecta conta de rede social via OAuth
        """
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/api/v1/accounts",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={
                    "user_id": user_id,
                    "platform": platform,
                    "code": oauth_code
                }
            )
            return response.json()
    
    async def schedule_post(
        self,
        user_id: str,
        accounts: list,
        content: dict,
        scheduled_at: str = None
    ) -> dict:
        """
        Agenda ou publica post em múltiplas redes
        """
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/api/v1/posts",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={
                    "user_id": user_id,
                    "accounts": accounts,  # ["instagram_123", "tiktok_456"]
                    "content": {
                        "text": content["caption"],
                        "media": content.get("media_urls", [])
                    },
                    "scheduled_at": scheduled_at  # None = publicar agora
                }
            )
            return response.json()
    
    async def get_post_metrics(self, post_id: str) -> dict:
        """
        Obtém métricas de um post publicado
        """
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/api/v1/posts/{post_id}/metrics",
                headers={"Authorization": f"Bearer {self.api_key}"}
            )
            return response.json()
```

### Custos

- **Licença Enterprise:** $299/mês

---

## 🔍 TAVILY (BUSCA DE TENDÊNCIAS)

### Descrição
Tavily Search API para buscar tendências e conteúdo relevante ao gerar roteiros.

### Implementação

```python
# services/tavily.py
import httpx
import os

class TavilyService:
    def __init__(self):
        self.api_key = os.getenv("TAVILY_API_KEY")
        self.base_url = "https://api.tavily.com"
    
    async def search_trends(self, topic: str, niche: str) -> list:
        """
        Busca tendências relacionadas ao tópico
        """
        query = f"{topic} {niche} tendências 2026"
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/search",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={
                    "query": query,
                    "search_depth": "advanced",
                    "max_results": 5,
                    "include_domains": [
                        "instagram.com",
                        "tiktok.com",
                        "youtube.com"
                    ]
                }
            )
        
        results = response.json()["results"]
        return [
            {
                "title": r["title"],
                "snippet": r["content"],
                "url": r["url"]
            }
            for r in results
        ]
```

### Custos Estimados

**Premissa:** 8 scripts/usuário/mês, 1000 usuários

- **Buscas:** 8000 buscas × $0.001/busca = $8/mês

---

## 🖼️ PEXELS, UNSPLASH, PIXABAY (IMAGENS)

### Descrição
APIs gratuitas de imagens para carrosséis.

### Implementação

```python
# services/images.py
import httpx
import os
from typing import List

class ImageService:
    def __init__(self):
        self.pexels_key = os.getenv("PEXELS_API_KEY")
        self.unsplash_key = os.getenv("UNSPLASH_API_KEY")
    
    async def search_images(self, query: str, count: int = 5) -> List[dict]:
        """
        Busca imagens em Pexels, Unsplash e Pixabay
        """
        images = []
        
        # Pexels
        images.extend(await self._search_pexels(query, count))
        
        # Unsplash (se Pexels não retornar suficiente)
        if len(images) < count:
            images.extend(await self._search_unsplash(query, count - len(images)))
        
        return images[:count]
    
    async def _search_pexels(self, query: str, count: int) -> List[dict]:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.pexels.com/v1/search",
                headers={"Authorization": self.pexels_key},
                params={"query": query, "per_page": count, "orientation": "portrait"}
            )
            
            photos = response.json()["photos"]
            return [
                {
                    "url": p["src"]["large"],
                    "source": "pexels",
                    "photographer": p["photographer"]
                }
                for p in photos
            ]
    
    async def _search_unsplash(self, query: str, count: int) -> List[dict]:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.unsplash.com/search/photos",
                headers={"Authorization": f"Client-ID {self.unsplash_key}"},
                params={"query": query, "per_page": count, "orientation": "portrait"}
            )
            
            photos = response.json()["results"]
            return [
                {
                    "url": p["urls"]["regular"],
                    "source": "unsplash",
                    "photographer": p["user"]["name"]
                }
                for p in photos
            ]
```

### Custos

- **Pexels:** Gratuito (sem limite)
- **Unsplash:** Gratuito (50 requisições/hora)
- **Pixabay:** Gratuito (sem limite)

**Total:** $0/mês

---

## ☁️ CLOUDFLARE R2 (STORAGE)

### Descrição
Cloudflare R2 para armazenamento de vídeos, imagens e assets (compatível com S3).

### Implementação

```python
# services/storage.py
import boto3
import os
from botocore.config import Config

class StorageService:
    def __init__(self):
        self.client = boto3.client(
            's3',
            endpoint_url=os.getenv("R2_ENDPOINT"),
            aws_access_key_id=os.getenv("R2_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("R2_SECRET_ACCESS_KEY"),
            config=Config(signature_version='s3v4')
        )
        self.bucket = os.getenv("R2_BUCKET_NAME")
    
    async def upload_video(
        self,
        file_path: str,
        user_id: str,
        video_id: str
    ) -> str:
        """
        Upload de vídeo para R2
        """
        key = f"videos/{user_id}/{video_id}.mp4"
        
        with open(file_path, 'rb') as file:
            self.client.upload_fileobj(
                file,
                self.bucket,
                key,
                ExtraArgs={'ContentType': 'video/mp4'}
            )
        
        # URL pública
        return f"https://{self.bucket}.r2.dev/{key}"
    
    async def upload_asset(
        self,
        file_path: str,
        user_id: str,
        asset_type: str
    ) -> str:
        """
        Upload de asset (logo, intro, outro, watermark)
        """
        extension = file_path.split('.')[-1]
        key = f"assets/{user_id}/{asset_type}.{extension}"
        
        with open(file_path, 'rb') as file:
            self.client.upload_fileobj(
                file,
                self.bucket,
                key
            )
        
        return f"https://{self.bucket}.r2.dev/{key}"
    
    async def delete_file(self, key: str):
        """
        Deleta arquivo do R2
        """
        self.client.delete_object(Bucket=self.bucket, Key=key)
```

### Custos Estimados

**Premissa:** 8 vídeos/usuário/mês, 1000 usuários, 50MB/vídeo

- **Storage:** 8000 vídeos × 50MB = 400GB × $0.015/GB = $6/mês
- **Operações:** Incluídas (10M grátis)
- **Egress:** Incluído (sem cobrança)

**Total:** $6/mês

---

## 📥 YT-DLP (DOWNLOAD DE VÍDEOS)

### Descrição
yt-dlp (fork do youtube-dl) para baixar vídeos públicos e gerar roteiros autorais.

### Implementação

```python
# services/video_downloader.py
import yt_dlp
import os

class VideoDownloaderService:
    async def download_video(self, url: str, output_path: str) -> dict:
        """
        Baixa vídeo de URL pública (YouTube, TikTok, Instagram, etc.)
        """
        ydl_opts = {
            'format': 'best[ext=mp4]',
            'outtmpl': output_path,
            'quiet': True,
            'no_warnings': True
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            
            return {
                "title": info.get("title"),
                "duration": info.get("duration"),
                "file_path": output_path
            }
```

### Custos

- **yt-dlp:** Open-source (gratuito)

**Total:** $0/mês

---

## 💰 CUSTOS CONSOLIDADOS

### Custos Mensais (variável por volume de produção)

| Integração | Tipo | Custo |
|---|---|---|
| OpenRouter (Claude) | RENUM | Variável (~$0,025/roteiro) |
| Whisper (OpenAI) | RENUM | $0,006/min de vídeo |
| Mixpost Pro/Enterprise | RENUM | $99–299/mês (fixo) |
| Tavily Search | RENUM | $0,008/busca (2 buscas/roteiro) |
| Pexels/Unsplash/Pixabay | Gratuito | $0 |
| Cloudflare R2 | RENUM | ~$0,005/vídeo (storage + egress) |
| yt-dlp | Open-source | $0 |
| Supabase | RENUM | $25/mês (fixo) |
| Hostinger KVM 2 | RENUM | R$89,99/mês (fixo) |
| Redis | RENUM | $10/mês (fixo) |
| Sentry | RENUM | $26/mês (fixo) |

### Projeção por cenário (referência)

| Usuários | Produção | Custo total/mês |
|---|---|---|
| 200 | 30 conteúdos/mês | ~R$2.381 |
| 200 | 90 conteúdos/mês | ~R$5.072 |
| 1.000 | 30 conteúdos/mês | ~R$8.913 |
| 1.000 | 90 conteúdos/mês | ~R$22.368 |

> Referência: câmbio R$5,75/USD. Custo médio por conteúdo: ~$0,039.

---

## 🔐 VARIÁVEIS DE AMBIENTE

```bash
# .env
# OpenRouter (RENUM gerenciado)
OPENROUTER_API_KEY=sk-or-v1-...

# OpenAI (Whisper)
OPENAI_API_KEY=sk-...

# Mixpost
MIXPOST_URL=https://mixpost.renum.com.br
MIXPOST_API_KEY=...

# Tavily
TAVILY_API_KEY=tvly-...

# Pexels
PEXELS_API_KEY=...

# Unsplash
UNSPLASH_API_KEY=...

# Cloudflare R2
R2_ENDPOINT=https://...r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=influency-storage

# Criptografia
ENCRYPTION_KEY=...  # Fernet key
```

---

## 📚 REFERÊNCIAS

- [OpenRouter Docs](https://openrouter.ai/docs)
- [Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
- [Mixpost Docs](https://mixpost.app/docs)
- [Tavily API](https://tavily.com/docs)
- [Pexels API](https://www.pexels.com/api/)
- [Unsplash API](https://unsplash.com/developers)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp)

---

**Última Atualização:** 07/03/2026  
**Versão:** 2.0.0  
**Status:** ✅ COMPLETO
