# Script para organizar telas do Stitch em categorias
# Projeto: Influency V1 Screens

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ORGANIZADOR DE TELAS - INFLUENCY V1  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Mapeamento de telas para categorias
$screenMapping = @{
    # Design System & Componentes (3 telas)
    "atomic_component_library" = @{ category = "01-design-system"; name = "atomic-components" }
    "molecular_component_library" = @{ category = "01-design-system"; name = "molecular-components" }
    "bottom_navigation_bar_overview" = @{ category = "01-design-system"; name = "bottom-navigation" }
    
    # Auth Stack (4 telas)
    "influency_splash_screen" = @{ category = "02-auth-stack"; name = "splash-screen" }
    "influency_login_screen" = @{ category = "02-auth-stack"; name = "login-screen" }
    "influency_forgot_password_screen" = @{ category = "02-auth-stack"; name = "forgot-password-screen" }
    "influency_registration_screen" = @{ category = "02-auth-stack"; name = "register-screen" }
    
    # Onboarding (4 telas)
    "influency_welcome_screen" = @{ category = "03-onboarding"; name = "welcome-screen" }
    "onboarding_question_1_nicho" = @{ category = "03-onboarding"; name = "onboarding-screen" }
    "connect_social_networks" = @{ category = "03-onboarding"; name = "connect-social-networks" }
    "onboarding_complete_tudo_pronto" = @{ category = "03-onboarding"; name = "onboarding-complete" }
    
    # Assistant Stack (16 telas)
    "influency_ai_assistant_chat" = @{ category = "04-assistant-stack"; name = "assistant-screen" }
    "conversation_history_screen" = @{ category = "04-assistant-stack"; name = "conversation-history" }
    "assistant_settings_screen" = @{ category = "04-assistant-stack"; name = "assistant-settings" }
    "script_generation_modal" = @{ category = "04-assistant-stack"; name = "script-generation-modal" }
    "generating_script_loading_screen" = @{ category = "04-assistant-stack"; name = "generating-script-loading" }
    "script_results_screen_1" = @{ category = "04-assistant-stack"; name = "script-results-screen" }
    "script_results_screen_2" = @{ category = "04-assistant-stack"; name = "edit-script-modal" }
    "script_results_screen_3" = @{ category = "04-assistant-stack"; name = "saved-scripts-screen" }
    "script_results_screen_4" = @{ category = "04-assistant-stack"; name = "choose-script-screen" }
    "script_results_screen_5" = @{ category = "04-assistant-stack"; name = "teleprompter-settings" }
    "script_results_screen_6" = @{ category = "04-assistant-stack"; name = "recording-active-screen" }
    "video_preview_screen" = @{ category = "04-assistant-stack"; name = "video-preview-screen" }
    "video_editing_settings" = @{ category = "04-assistant-stack"; name = "video-edit-screen" }
    "processing_video_loading" = @{ category = "04-assistant-stack"; name = "processing-video-loading" }
    "final_video_preview_publish" = @{ category = "04-assistant-stack"; name = "video-final-preview" }
    "subtitle_customization_modal" = @{ category = "04-assistant-stack"; name = "subtitles-customization-modal" }
    
    # Carrosséis (4 telas)
    "carousel_generation_screen" = @{ category = "05-carousels"; name = "carousel-generation-screen" }
    "generating_carousel_loading" = @{ category = "05-carousels"; name = "generating-carousel-loading" }
    "carousel_preview_screen" = @{ category = "05-carousels"; name = "carousel-preview-screen" }
    "edit_slide_modal" = @{ category = "05-carousels"; name = "edit-slide-modal" }
    
    # Publicação (5 telas)
    "select_networks_screen" = @{ category = "06-publication"; name = "select-networks-screen" }
    "caption_hashtags_screen" = @{ category = "06-publication"; name = "caption-hashtags-screen" }
    "schedule_post_screen" = @{ category = "06-publication"; name = "schedule-post-screen" }
    "post_confirmation_screen" = @{ category = "06-publication"; name = "post-confirmation-screen" }
    "scheduled_posts_screen" = @{ category = "06-publication"; name = "scheduled-posts-screen" }
    
    # Biblioteca (3 telas)
    "main_library_screen" = @{ category = "07-library"; name = "library-screen" }
    "saved_videos_grid" = @{ category = "07-library"; name = "saved-videos-screen" }
    "saved_carousels_list" = @{ category = "07-library"; name = "saved-carousels-screen" }
    
    # Assets (3 telas)
    "brand_assets_management" = @{ category = "08-assets"; name = "brand-assets-screen" }
    "upload_asset_modal" = @{ category = "08-assets"; name = "upload-asset-modal" }
    "configure_asset_modal" = @{ category = "08-assets"; name = "configure-asset-modal" }
    
    # Configurações (6 telas)
    "main_settings_menu" = @{ category = "09-settings"; name = "settings-screen" }
    "user_profile_screen" = @{ category = "09-settings"; name = "profile-screen" }
    "business_dna_settings" = @{ category = "09-settings"; name = "business-dna-settings" }
    "social_accounts_management" = @{ category = "09-settings"; name = "social-accounts-screen" }
    "notification_settings_screen" = @{ category = "09-settings"; name = "notifications-settings" }
    "integrations_management_screen" = @{ category = "09-settings"; name = "integrations-screen" }
    
    # Analytics (3 telas)
    "main_analytics_dashboard" = @{ category = "10-analytics"; name = "analytics-screen" }
    "post_performance_details" = @{ category = "10-analytics"; name = "post-details-screen" }
    "url_analysis_modal" = @{ category = "10-analytics"; name = "url-analysis-modal" }
}

# Criar estrutura de pastas
Write-Host "Criando estrutura de pastas..." -ForegroundColor Yellow
$categories = @(
    "01-design-system",
    "02-auth-stack",
    "03-onboarding",
    "04-assistant-stack",
    "05-carousels",
    "06-publication",
    "07-library",
    "08-assets",
    "09-settings",
    "10-analytics"
)

foreach ($category in $categories) {
    $categoryPath = "stitch-export/organized/$category"
    if (-not (Test-Path $categoryPath)) {
        New-Item -ItemType Directory -Path $categoryPath -Force | Out-Null
    }
}

Write-Host "✓ Estrutura de pastas criada" -ForegroundColor Green
Write-Host ""

# Copiar e renomear arquivos
Write-Host "Organizando telas..." -ForegroundColor Yellow
$sourcePath = "stitch-export/raw/extracted/stitch_influency_v1_screens"
$totalScreens = $screenMapping.Count
$currentScreen = 0

foreach ($screen in $screenMapping.GetEnumerator()) {
    $currentScreen++
    $sourceFolder = $screen.Key
    $category = $screen.Value.category
    $newName = $screen.Value.name
    
    $sourceHtml = "$sourcePath/$sourceFolder/code.html"
    $sourcePng = "$sourcePath/$sourceFolder/screen.png"
    
    $destHtml = "stitch-export/organized/$category/$newName.html"
    $destPng = "stitch-export/organized/$category/$newName.png"
    
    if (Test-Path $sourceHtml) {
        Copy-Item -Path $sourceHtml -Destination $destHtml -Force
        Write-Host "  [$currentScreen/$totalScreens] $category/$newName.html" -ForegroundColor Gray
    }
    
    if (Test-Path $sourcePng) {
        Copy-Item -Path $sourcePng -Destination $destPng -Force
        Write-Host "  [$currentScreen/$totalScreens] $category/$newName.png" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "✓ Todas as telas foram organizadas!" -ForegroundColor Green
Write-Host ""

# Estatísticas
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ESTATÍSTICAS                         " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

foreach ($category in $categories) {
    $categoryPath = "stitch-export/organized/$category"
    $fileCount = (Get-ChildItem -Path $categoryPath -File).Count / 2  # Dividir por 2 (HTML + PNG)
    $categoryName = $category -replace '^\d+-', '' -replace '-', ' '
    $categoryName = (Get-Culture).TextInfo.ToTitleCase($categoryName)
    Write-Host "  $categoryName`: $fileCount telas" -ForegroundColor White
}

Write-Host ""
Write-Host "Total: $totalScreens telas organizadas" -ForegroundColor Green
Write-Host ""
Write-Host "Arquivos salvos em: stitch-export/organized/" -ForegroundColor Cyan
Write-Host ""
