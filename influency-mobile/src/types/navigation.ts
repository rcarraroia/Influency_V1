/**
 * Tipos de Navegação - Influency Mobile
 * 
 * Define todos os tipos de parâmetros de navegação para o app.
 * Usado com Expo Router para type-safety na navegação.
 */

// ============================================================================
// ROOT STACK
// ============================================================================

export type RootStackParamList = {
  '(auth)': undefined;
  '(onboarding)': undefined;
  '(tabs)': undefined;
  'analytics': undefined;
  'analytics/post-details': { postId: string };
  'analytics/url-analysis': { url?: string };
  'modals/script-generation': undefined;
  'modals/edit-script': { scriptId: string };
};

// ============================================================================
// AUTH STACK
// ============================================================================

export type AuthStackParamList = {
  splash: undefined;
  login: undefined;
  register: undefined;
  'forgot-password': undefined;
};

// ============================================================================
// ONBOARDING STACK
// ============================================================================

export type OnboardingStackParamList = {
  welcome: undefined;
  'business-dna': { step?: number };
  'connect-social': undefined;
  complete: undefined;
};

// ============================================================================
// MAIN TABS
// ============================================================================

export type MainTabsParamList = {
  'assistant': undefined;
  'library': undefined;
  'settings': undefined;
};

// ============================================================================
// ASSISTANT STACK
// ============================================================================

export type TeleprompterSettings = {
  scrollMode: 'auto' | 'manual' | 'voice';
  scrollSpeed: number; // pixels por segundo
  fontSize: number;
};

export type VideoSettings = {
  subtitles: boolean;
  music: boolean;
  assets: boolean;
  autoCuts: boolean;
  subtitleStyle?: string;
  cutMode?: string;
  musicVolume?: number;
};

export type AssistantStackParamList = {
  index: undefined;
  history: undefined;
  'assistant-settings': undefined;
  'generating-script': { topic: string; duration: number };
  'script-generated': { scriptId: string };
  'choose-script': undefined;
  'teleprompter-settings': { scriptId: string };
  'recording-active': { 
    scriptId?: string; 
    scriptText?: string;
    settings: TeleprompterSettings;
  };
  'video-preview': { videoId: string; fromEdit?: boolean };
  'video-edit': { videoId: string };
  'processing-video': { videoId: string; settings: VideoSettings };
  'video-final-preview': { videoId: string };
  'carousel-generation': undefined;
  'generating-carousel': { topic: string; slideCount: number };
  'carousel-preview': { carouselId: string };
  'subtitles-customization': { videoId: string };
  'select-networks': { contentId: string; contentType: 'video' | 'carousel' };
  'caption-hashtags': { contentId: string; contentType: 'video' | 'carousel'; networks: string[] };
  'schedule-post': { 
    contentId: string; 
    contentType: 'video' | 'carousel';
    networks: string[];
    caption: string;
    hashtags: string[];
  };
  'post-confirmation': { postId: string };
};

// ============================================================================
// LIBRARY STACK
// ============================================================================

export type LibraryStackParamList = {
  index: undefined;
  scripts: undefined;
  videos: undefined;
  carousels: undefined;
};

// ============================================================================
// SETTINGS STACK
// ============================================================================

export type AssetSettings = {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  opacity?: number; // 0-100
  duration?: number; // segundos (para intro/outro)
  autoApply?: boolean;
};

export type SettingsStackParamList = {
  index: undefined;
  profile: undefined;
  'business-dna-settings': undefined;
  'social-accounts': undefined;
  'brand-assets': undefined;
  'upload-asset': { assetType: 'logo' | 'intro' | 'outro' | 'watermark' };
  'configure-asset': { assetId: string; assetType: 'logo' | 'intro' | 'outro' | 'watermark' };
  'notifications-settings': undefined;
  integrations: undefined;
};

// ============================================================================
// ANALYTICS STACK
// ============================================================================

export type AnalyticsStackParamList = {
  index: undefined;
  'post-details': { postId: string };
  'url-analysis': { url?: string };
};

// ============================================================================
// HELPER TYPES
// ============================================================================

/**
 * Tipo helper para extrair parâmetros de uma rota
 */
export type RouteParams<T extends keyof RootStackParamList> = RootStackParamList[T];

/**
 * Tipo helper para navegação type-safe
 */
export type NavigationRoute = keyof RootStackParamList;
