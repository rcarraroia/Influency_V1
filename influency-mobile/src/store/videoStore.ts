import { create } from 'zustand';

export interface Video {
  id: string;
  uri: string;
  thumbnailUri?: string;
  title?: string;
  duration: number; // seconds
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'processing' | 'ready' | 'published';
  settings?: VideoSettings;
}

export interface VideoSettings {
  // Subtitles
  hasSubtitles: boolean;
  subtitleStyle?: 'default' | 'bold' | 'outline' | 'background';
  
  // Music
  hasMusic: boolean;
  musicVolume?: number; // 0-100
  
  // Assets
  hasAssets: boolean;
  logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  
  // Auto cuts
  hasAutoCuts: boolean;
  cutMode?: 'dynamic' | 'static';
}

export interface ProcessingProgress {
  videoId: string;
  stage: 'transcribing' | 'subtitles' | 'music' | 'finalizing';
  progress: number; // 0-100
}

interface VideoState {
  // State
  videos: Video[];
  currentVideo: Video | null;
  processingProgress: ProcessingProgress | null;
  
  // Actions
  setCurrentVideo: (video: Video | null) => void;
  addVideo: (video: Video) => void;
  updateVideo: (id: string, data: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  setProcessingProgress: (progress: ProcessingProgress | null) => void;
  clearVideos: () => void;
}

export const useVideoStore = create<VideoState>((set) => ({
  // Initial state
  videos: [],
  currentVideo: null,
  processingProgress: null,
  
  // Actions
  setCurrentVideo: (video) => set({ currentVideo: video }),
  
  addVideo: (video) =>
    set((state) => ({
      videos: [video, ...state.videos],
    })),
  
  updateVideo: (id, data) =>
    set((state) => ({
      videos: state.videos.map((video) =>
        video.id === id ? { ...video, ...data, updatedAt: new Date() } : video
      ),
      currentVideo:
        state.currentVideo?.id === id
          ? { ...state.currentVideo, ...data, updatedAt: new Date() }
          : state.currentVideo,
    })),
  
  deleteVideo: (id) =>
    set((state) => ({
      videos: state.videos.filter((video) => video.id !== id),
      currentVideo: state.currentVideo?.id === id ? null : state.currentVideo,
    })),
  
  setProcessingProgress: (progress) =>
    set({ processingProgress: progress }),
  
  clearVideos: () =>
    set({
      videos: [],
      currentVideo: null,
      processingProgress: null,
    }),
}));
