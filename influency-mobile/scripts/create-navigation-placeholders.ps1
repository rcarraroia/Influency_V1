# Script para criar placeholders de navegação

$placeholders = @(
    # Assistant Stack
    @{ Path = "app/(tabs)/assistant/generating-script.tsx"; Title = "Gerando Roteiro"; Content = "[Animação de loading]" },
    @{ Path = "app/(tabs)/assistant/script-generated.tsx"; Title = "Roteiro Gerado"; Content = "[Exibir roteiro, word count, duração]" },
    @{ Path = "app/(tabs)/assistant/teleprompter-settings.tsx"; Title = "Configurações do Teleprompter"; Content = "[Modo de scroll, velocidade, tamanho de fonte]" },
    @{ Path = "app/(tabs)/assistant/recording-active.tsx"; Title = "Gravação Ativa"; Content = "[Camera preview + teleprompter overlay]" },
    @{ Path = "app/(tabs)/assistant/video-preview.tsx"; Title = "Preview do Vídeo"; Content = "[Video player com controles]" },
    @{ Path = "app/(tabs)/assistant/video-edit.tsx"; Title = "Editar Vídeo"; Content = "[Opções de edição: legendas, música, assets]" },
    @{ Path = "app/(tabs)/assistant/processing-video.tsx"; Title = "Processando Vídeo"; Content = "[Progress bar de etapas]" },
    @{ Path = "app/(tabs)/assistant/video-final-preview.tsx"; Title = "Preview Final"; Content = "[Video player do vídeo editado]" },
    @{ Path = "app/(tabs)/assistant/subtitles-customization.tsx"; Title = "Customizar Legendas"; Content = "[Estilo, posição, cor das legendas]" },
    @{ Path = "app/(tabs)/assistant/carousel-generation.tsx"; Title = "Gerar Carrossel"; Content = "[Input de tema, número de slides]" },
    @{ Path = "app/(tabs)/assistant/generating-carousel.tsx"; Title = "Gerando Carrossel"; Content = "[Animação de loading]" },
    @{ Path = "app/(tabs)/assistant/carousel-preview.tsx"; Title = "Preview do Carrossel"; Content = "[Swiper de slides]" },
    @{ Path = "app/(tabs)/assistant/select-networks.tsx"; Title = "Selecionar Redes"; Content = "[Checkboxes de redes sociais]" },
    @{ Path = "app/(tabs)/assistant/caption-hashtags.tsx"; Title = "Legenda e Hashtags"; Content = "[Textarea de legenda, tag input]" },
    @{ Path = "app/(tabs)/assistant/schedule-post.tsx"; Title = "Agendar Publicação"; Content = "[Radio buttons, DateTimePicker]" },
    @{ Path = "app/(tabs)/assistant/post-confirmation.tsx"; Title = "Publicação Confirmada"; Content = "[Ícone de sucesso, lista de redes]" },
    
    # Library Stack
    @{ Path = "app/(tabs)/library/_layout.tsx"; Title = "Library Layout"; Content = "Stack" },
    @{ Path = "app/(tabs)/library/index.tsx"; Title = "Biblioteca"; Content = "[Tabs: Roteiros, Vídeos, Carrosséis]" },
    @{ Path = "app/(tabs)/library/scripts.tsx"; Title = "Roteiros Salvos"; Content = "[Lista de roteiros]" },
    @{ Path = "app/(tabs)/library/videos.tsx"; Title = "Vídeos Salvos"; Content = "[Grid de vídeos]" },
    @{ Path = "app/(tabs)/library/carousels.tsx"; Title = "Carrosséis Salvos"; Content = "[Lista de carrosséis]" },
    
    # Settings Stack
    @{ Path = "app/(tabs)/settings/_layout.tsx"; Title = "Settings Layout"; Content = "Stack" },
    @{ Path = "app/(tabs)/settings/index.tsx"; Title = "Configurações"; Content = "[Menu de opções]" },
    @{ Path = "app/(tabs)/settings/profile.tsx"; Title = "Perfil"; Content = "[Avatar, nome, email]" },
    @{ Path = "app/(tabs)/settings/business-dna-settings.tsx"; Title = "Business DNA"; Content = "[Card do Business DNA atual]" },
    @{ Path = "app/(tabs)/settings/social-accounts.tsx"; Title = "Contas Sociais"; Content = "[Lista de contas conectadas]" },
    @{ Path = "app/(tabs)/settings/brand-assets.tsx"; Title = "Assets de Marca"; Content = "[Logo, Intro, Outro, Watermark]" },
    @{ Path = "app/(tabs)/settings/upload-asset.tsx"; Title = "Upload de Asset"; Content = "[Image picker, preview]" },
    @{ Path = "app/(tabs)/settings/configure-asset.tsx"; Title = "Configurar Asset"; Content = "[Posição, opacidade, duração]" },
    @{ Path = "app/(tabs)/settings/notifications-settings.tsx"; Title = "Notificações"; Content = "[Toggles de preferências]" },
    @{ Path = "app/(tabs)/settings/integrations.tsx"; Title = "Integrações"; Content = "[Cards de integrações externas]" },
    
    # Analytics Stack
    @{ Path = "app/analytics/_layout.tsx"; Title = "Analytics Layout"; Content = "Stack" },
    @{ Path = "app/analytics/index.tsx"; Title = "Analytics"; Content = "[Dashboard de métricas]" },
    @{ Path = "app/analytics/post-details.tsx"; Title = "Detalhes do Post"; Content = "[Métricas detalhadas por rede]" },
    @{ Path = "app/analytics/url-analysis.tsx"; Title = "Análise de URL"; Content = "[Input de URL, análise de vídeo]" },
    
    # Modals
    @{ Path = "app/modals/_layout.tsx"; Title = "Modals Layout"; Content = "Stack" },
    @{ Path = "app/modals/script-generation.tsx"; Title = "Gerar Roteiro"; Content = "[Textarea, slider de duração]" },
    @{ Path = "app/modals/edit-script.tsx"; Title = "Editar Roteiro"; Content = "[Input de título, textarea de conteúdo]" }
)

$template = @'
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { spacing } from '../../../src/theme/spacing';

export default function SCREEN_NAME() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">TITLE</Text>
      <Text variant="bodyMedium" style={styles.placeholder}>CONTENT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, gap: spacing.md },
  placeholder: { fontStyle: 'italic', marginTop: spacing.lg },
});
'@

$layoutTemplate = @'
import { Stack } from 'expo-router';

export default function LAYOUT_NAME() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
'@

foreach ($item in $placeholders) {
    $dir = Split-Path $item.Path -Parent
    $filename = Split-Path $item.Path -Leaf
    $screenName = $filename -replace '\.tsx$', '' -replace '-', '' -replace '_layout', 'Layout'
    $screenName = (Get-Culture).TextInfo.ToTitleCase($screenName) + "Screen"
    
    # Criar diretório se não existir
    if (!(Test-Path "influency-mobile/$dir")) {
        New-Item -ItemType Directory -Path "influency-mobile/$dir" -Force | Out-Null
    }
    
    # Escolher template
    if ($filename -eq "_layout.tsx") {
        $content = $layoutTemplate -replace 'LAYOUT_NAME', ($screenName -replace 'Screen', '')
    } else {
        $content = $template -replace 'SCREEN_NAME', $screenName
        $content = $content -replace 'TITLE', $item.Title
        $content = $content -replace 'CONTENT', $item.Content
    }
    
    # Criar arquivo
    $content | Out-File -FilePath "influency-mobile/$($item.Path)" -Encoding UTF8
    Write-Host "Criado: $($item.Path)"
}

Write-Host "`nTodos os placeholders foram criados com sucesso!"
