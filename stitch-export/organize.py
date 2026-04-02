#!/usr/bin/env python3
"""
Script para organizar telas do Stitch em categorias
Projeto: Influency V1 Screens
"""

import os
import shutil
from pathlib import Path

# Mapeamento de telas para categorias
SCREEN_MAPPING = {
    # Design System & Componentes (3 telas)
    "atomic_component_library": ("01-design-system", "atomic-components"),
    "molecular_component_library": ("01-design-system", "molecular-components"),
    "bottom_navigation_bar_overview": ("01-design-system", "bottom-navigation"),
    
    # Auth Stack (4 telas)
    "influency_splash_screen": ("02-auth-stack", "splash-screen"),
    "influency_login_screen": ("02-auth-stack", "login-screen"),
    "influency_forgot_password_screen": ("02-auth-stack", "forgot-password-screen"),
    "influency_registration_screen": ("02-auth-stack", "register-screen"),
    
    # Onboarding (4 telas)
    "influency_welcome_screen": ("03-onboarding", "welcome-screen"),
    "onboarding_question_1_nicho": ("03-onboarding", "onboarding-screen"),
    "connect_social_networks": ("03-onboarding", "connect-social-networks"),
    "onboarding_complete_tudo_pronto": ("03-onboarding", "onboarding-complete"),
    
    # Assistant Stack (16 telas)
    "influency_ai_assistant_chat": ("04-assistant-stack", "assistant-screen"),
    "conversation_history_screen": ("04-assistant-stack", "conversation-history"),
    "assistant_settings_screen": ("04-assistant-stack", "assistant-settings"),
    "script_generation_modal": ("04-assistant-stack", "script-generation-modal"),
    "generating_script_loading_screen": ("04-assistant-stack", "generating-script-loading"),
    "script_results_screen_1": ("04-assistant-stack", "script-results-screen"),
    "script_results_screen_2": ("04-assistant-stack", "edit-script-modal"),
    "script_results_screen_3": ("04-assistant-stack", "saved-scripts-screen"),
    "script_results_screen_4": ("04-assistant-stack", "choose-script-screen"),
    "script_results_screen_5": ("04-assistant-stack", "teleprompter-settings"),
    "script_results_screen_6": ("04-assistant-stack", "recording-active-screen"),
    "video_preview_screen": ("04-assistant-stack", "video-preview-screen"),
    "video_editing_settings": ("04-assistant-stack", "video-edit-screen"),
    "processing_video_loading": ("04-assistant-stack", "processing-video-loading"),
    "final_video_preview_publish": ("04-assistant-stack", "video-final-preview"),
    "subtitle_customization_modal": ("04-assistant-stack", "subtitles-customization-modal"),
    
    # Carrosséis (4 telas)
    "carousel_generation_screen": ("05-carousels", "carousel-generation-screen"),
    "generating_carousel_loading": ("05-carousels", "generating-carousel-loading"),
    "carousel_preview_screen": ("05-carousels", "carousel-preview-screen"),
    "edit_slide_modal": ("05-carousels", "edit-slide-modal"),
    
    # Publicação (5 telas)
    "select_networks_screen": ("06-publication", "select-networks-screen"),
    "caption_hashtags_screen": ("06-publication", "caption-hashtags-screen"),
    "schedule_post_screen": ("06-publication", "schedule-post-screen"),
    "post_confirmation_screen": ("06-publication", "post-confirmation-screen"),
    "scheduled_posts_screen": ("06-publication", "scheduled-posts-screen"),
    
    # Biblioteca (3 telas)
    "main_library_screen": ("07-library", "library-screen"),
    "saved_videos_grid": ("07-library", "saved-videos-screen"),
    "saved_carousels_list": ("07-library", "saved-carousels-screen"),
    
    # Assets (3 telas)
    "brand_assets_management": ("08-assets", "brand-assets-screen"),
    "upload_asset_modal": ("08-assets", "upload-asset-modal"),
    "configure_asset_modal": ("08-assets", "configure-asset-modal"),
    
    # Configurações (6 telas)
    "main_settings_menu": ("09-settings", "settings-screen"),
    "user_profile_screen": ("09-settings", "profile-screen"),
    "business_dna_settings": ("09-settings", "business-dna-settings"),
    "social_accounts_management": ("09-settings", "social-accounts-screen"),
    "notification_settings_screen": ("09-settings", "notifications-settings"),
    "integrations_management_screen": ("09-settings", "integrations-screen"),
    
    # Analytics (3 telas)
    "main_analytics_dashboard": ("10-analytics", "analytics-screen"),
    "post_performance_details": ("10-analytics", "post-details-screen"),
    "url_analysis_modal": ("10-analytics", "url-analysis-modal"),
}

def main():
    print("=" * 60)
    print("  ORGANIZADOR DE TELAS - INFLUENCY V1")
    print("=" * 60)
    print()
    
    source_path = Path("stitch-export/raw/extracted/stitch_influency_v1_screens")
    dest_path = Path("stitch-export/organized")
    
    total_screens = len(SCREEN_MAPPING)
    current_screen = 0
    successful = 0
    failed = []
    
    print(f"Organizando {total_screens} telas...")
    print()
    
    for source_folder, (category, new_name) in SCREEN_MAPPING.items():
        current_screen += 1
        
        source_html = source_path / source_folder / "code.html"
        source_png = source_path / source_folder / "screen.png"
        
        dest_html = dest_path / category / f"{new_name}.html"
        dest_png = dest_path / category / f"{new_name}.png"
        
        try:
            if source_html.exists():
                shutil.copy2(source_html, dest_html)
                print(f"  [{current_screen}/{total_screens}] ✓ {category}/{new_name}.html")
                successful += 1
            else:
                print(f"  [{current_screen}/{total_screens}] ✗ {source_folder}/code.html não encontrado")
                failed.append(f"{source_folder}/code.html")
            
            if source_png.exists():
                shutil.copy2(source_png, dest_png)
                print(f"  [{current_screen}/{total_screens}] ✓ {category}/{new_name}.png")
                successful += 1
            else:
                print(f"  [{current_screen}/{total_screens}] ✗ {source_folder}/screen.png não encontrado")
                failed.append(f"{source_folder}/screen.png")
        
        except Exception as e:
            print(f"  [{current_screen}/{total_screens}] ✗ Erro: {e}")
            failed.append(f"{source_folder}: {e}")
    
    print()
    print("=" * 60)
    print("  ESTATÍSTICAS")
    print("=" * 60)
    print()
    print(f"✓ Arquivos copiados com sucesso: {successful}/{total_screens * 2}")
    print(f"✗ Arquivos com erro: {len(failed)}")
    print()
    
    if failed:
        print("Arquivos que falharam:")
        for f in failed:
            print(f"  - {f}")
        print()
    
    # Contar telas por categoria
    categories = {}
    for _, (category, _) in SCREEN_MAPPING.items():
        categories[category] = categories.get(category, 0) + 1
    
    print("Telas por categoria:")
    for category in sorted(categories.keys()):
        count = categories[category]
        category_name = category.replace('-', ' ').title()
        print(f"  {category_name}: {count} telas")
    
    print()
    print(f"Total: {total_screens} telas organizadas")
    print()
    print(f"Arquivos salvos em: {dest_path}/")
    print()

if __name__ == "__main__":
    main()
