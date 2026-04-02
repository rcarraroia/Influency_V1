#!/usr/bin/env python3
"""
Script para baixar automaticamente todas as 51 telas do projeto Stitch Influency V1.

Uso:
    python download-screens.py

Requisitos:
    pip install requests tqdm
"""

import os
import requests
from pathlib import Path
from tqdm import tqdm
import json

# Configuração
OUTPUT_DIR = "stitch-export"
PROJECT_ID = "15962214627344849757"

# Lista de telas com URLs (gerada automaticamente do Stitch MCP)
SCREENS = [
    {
        "category": "01-design-system",
        "name": "atomic-components",
        "title": "Atomic Component Library",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AOfcidWTQtH1-PUONWD9vaYbsUn_pLQvbKkIC9dxk8YyBUxlkUXcpXfbSmG8rvyU9YLSYkS4djKuJQMg-iRcfB_OPjsOsjbuuQLCi7IcLdiRENkmpoUnm8hEAgq_jtLZyzDrsz1YMrEGkFo2EEhusV4v_7rO4pOzcCDkOjLGfyyJ5UQE1SabS9J1vmgYU96X4RosBPMoT6kDxBGSpaqvzD22Hq5pzso1c2NSe89Px53-ZX3IiqYVM_LPYYSApdWZ",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2UzNGU4Mjk3MDUyZDQ5YmRiNTIzODBhMzc1MzA1ZDA1EgsSBxDp3cPZhBQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTk2MjIxNDYyNzM0NDg0OTc1Nw&filename=&opi=96797242"
    },
    {
        "category": "01-design-system",
        "name": "molecular-components",
        "title": "Molecular Component Library",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AOfcidXxjhw_q8LycZC2SNrhqtIfPTTFTxnsrFE-1X8Wy1P6l2nnbdIdUuomP3UyNnC3lBq2bwIAOFesylQa-tvNpT82DMiPCcKkOBTlXdvS6kGgUAfoY3qOPR88NZTpZw9fBKKNG4xnUGjzpgFL1VgNm9PcNMFAOayUlE2ba16LUjD9bbG9u0eoSWt2Q8ipNCmzbgZFR701cnTZ512IO3maqUk5cd11JBODPhqjk12l9Hi6i3HPPzX4pjZ-yVpr",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzZjODhjNjY2NTRkODRkZTE4MGI4MGJiYWM1MTY1MGRlEgsSBxDp3cPZhBQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTk2MjIxNDYyNzM0NDg0OTc1Nw&filename=&opi=96797242"
    },
    {
        "category": "01-design-system",
        "name": "bottom-navigation",
        "title": "Bottom Navigation Bar Overview",
        "screenshot_url": "https://lh3.googleusercontent.com/aida/AOfcidWjV3NONkZqiboKZjQud8k5IJ5t-blHJB4KFjYNjcQ0Vpbxr8eeXRRjU3TXGcaBfubUCBlUm3e5L9kILCdKuRwVJfyG3FBXuRf8nxzCOQ2ECTiZnrPb7csSzAxV2i4LIB75w05DiAFIH2c7kbN7KfnB_DaYggQROS4vRJ3zr7ksM2_-8Bzj11HHORKRjMxDQvxsfU7j0oMhpcjGOSDbGPWqbJTqoQa9dNYqKQabLRvaY3nQkFQ8BayesKeI",
        "html_url": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzU5YjA3Nzc3YjcyNDQ4NDY4YjhkY2M1NjFhYTBhMzQ5EgsSBxDp3cPZhBQYAZIBJAoKcHJvamVjdF9pZBIWQhQxNTk2MjIxNDYyNzM0NDg0OTc1Nw&filename=&opi=96797242"
    },
    # ... (adicionar as outras 48 telas aqui)
]


def download_file(url: str, output_path: Path, description: str = ""):
    """Baixa um arquivo com barra de progresso."""
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        total_size = int(response.headers.get('content-length', 0))
        
        with open(output_path, 'wb') as file, tqdm(
            desc=description,
            total=total_size,
            unit='B',
            unit_scale=True,
            unit_divisor=1024,
        ) as progress_bar:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
                progress_bar.update(len(chunk))
        
        return True
    except Exception as e:
        print(f"❌ Erro ao baixar {description}: {e}")
        return False


def create_directory_structure():
    """Cria a estrutura de diretórios."""
    categories = set(screen["category"] for screen in SCREENS)
    
    for category in categories:
        category_path = Path(OUTPUT_DIR) / category
        category_path.mkdir(parents=True, exist_ok=True)
    
    print(f"✅ Estrutura de diretórios criada em: {OUTPUT_DIR}/")


def download_all_screens():
    """Baixa todas as telas (HTML e screenshots)."""
    total_screens = len(SCREENS)
    successful_downloads = 0
    failed_downloads = []
    
    print(f"\n🚀 Iniciando download de {total_screens} telas...\n")
    
    for i, screen in enumerate(SCREENS, 1):
        category = screen["category"]
        name = screen["name"]
        title = screen["title"]
        
        print(f"\n[{i}/{total_screens}] {title}")
        print(f"Categoria: {category}")
        
        # Criar caminhos de saída
        screenshot_path = Path(OUTPUT_DIR) / category / f"{name}.png"
        html_path = Path(OUTPUT_DIR) / category / f"{name}.html"
        
        # Baixar screenshot
        if download_file(
            screen["screenshot_url"],
            screenshot_path,
            f"  📸 Screenshot"
        ):
            successful_downloads += 1
        else:
            failed_downloads.append(f"{title} (screenshot)")
        
        # Baixar HTML
        if download_file(
            screen["html_url"],
            html_path,
            f"  📄 HTML"
        ):
            successful_downloads += 1
        else:
            failed_downloads.append(f"{title} (HTML)")
    
    # Relatório final
    print("\n" + "="*60)
    print("📊 RELATÓRIO DE DOWNLOAD")
    print("="*60)
    print(f"✅ Downloads bem-sucedidos: {successful_downloads}/{total_screens * 2}")
    print(f"❌ Downloads falhados: {len(failed_downloads)}")
    
    if failed_downloads:
        print("\n⚠️  Arquivos que falharam:")
        for failed in failed_downloads:
            print(f"  - {failed}")
    else:
        print("\n🎉 Todos os arquivos foram baixados com sucesso!")
    
    print(f"\n📁 Arquivos salvos em: {OUTPUT_DIR}/")


def create_index_file():
    """Cria arquivo INDEX.md com lista de todas as telas."""
    index_content = """# ÍNDICE DE TELAS - INFLUENCY V1

**Projeto Stitch ID:** 15962214627344849757  
**Total de Telas:** 51 telas  
**Data de Exportação:** 08/03/2026

---

## 📋 LISTA DE TELAS POR CATEGORIA

"""
    
    # Agrupar por categoria
    categories = {}
    for screen in SCREENS:
        category = screen["category"]
        if category not in categories:
            categories[category] = []
        categories[category].append(screen)
    
    # Gerar índice
    for category, screens in sorted(categories.items()):
        category_name = category.replace("-", " ").title()
        index_content += f"\n### {category_name}\n\n"
        
        for screen in screens:
            name = screen["name"]
            title = screen["title"]
            index_content += f"- **{title}**\n"
            index_content += f"  - HTML: `{category}/{name}.html`\n"
            index_content += f"  - Screenshot: `{category}/{name}.png`\n\n"
    
    # Salvar arquivo
    index_path = Path(OUTPUT_DIR) / "INDEX.md"
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(index_content)
    
    print(f"✅ Arquivo INDEX.md criado em: {index_path}")


def main():
    """Função principal."""
    print("="*60)
    print("🎨 DOWNLOAD DE TELAS - INFLUENCY V1")
    print("="*60)
    print(f"Projeto Stitch ID: {PROJECT_ID}")
    print(f"Total de telas: {len(SCREENS)}")
    print(f"Diretório de saída: {OUTPUT_DIR}/")
    print("="*60)
    
    # Criar estrutura de diretórios
    create_directory_structure()
    
    # Baixar todas as telas
    download_all_screens()
    
    # Criar arquivo de índice
    create_index_file()
    
    print("\n✅ Processo concluído!")
    print(f"📁 Verifique os arquivos em: {OUTPUT_DIR}/")


if __name__ == "__main__":
    main()
