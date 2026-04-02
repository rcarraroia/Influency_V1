import apiClient from './api';
import { Video, VideoSettings } from '../store/videoStore';

export interface ListVideosResponse {
  videos: Video[];
  total: number;
}

export interface UploadVideoRequest {
  uri: string;
  title?: string;
}

export interface UploadVideoResponse {
  video: Video;
  uploadUrl: string;
}

export interface UpdateVideoRequest {
  title?: string;
  settings?: VideoSettings;
}

export interface ProcessVideoRequest {
  settings: VideoSettings;
}

export interface ProcessVideoResponse {
  jobId: string;
  estimatedTime: number; // seconds
}

export class VideosService {
  /**
   * List all videos for the current user
   */
  async list(): Promise<ListVideosResponse> {
    try {
      const response = await apiClient.get<ListVideosResponse>('/videos');
      return response.data;
    } catch (error) {
      console.error('Error listing videos:', error);
      throw error;
    }
  }

  /**
   * Upload a new video
   */
  async upload(data: UploadVideoRequest): Promise<UploadVideoResponse> {
    try {
      // TODO: Implement actual file upload
      // For now, return mock data
      const mockVideo: Video = {
        id: Date.now().toString(),
        uri: data.uri,
        title: data.title || 'Novo Vídeo',
        duration: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft',
      };

      return {
        video: mockVideo,
        uploadUrl: 'mock-upload-url',
      };

      // Real implementation:
      // const response = await apiClient.post<UploadVideoResponse>('/videos', data);
      // return response.data;
    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  }

  /**
   * Update video metadata
   */
  async update(id: string, data: UpdateVideoRequest): Promise<Video> {
    try {
      const response = await apiClient.patch<Video>(`/videos/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating video:', error);
      throw error;
    }
  }

  /**
   * Delete a video
   */
  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/videos/${id}`);
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  }

  /**
   * Process video with AI (subtitles, music, cuts, etc.)
   */
  async process(id: string, data: ProcessVideoRequest): Promise<ProcessVideoResponse> {
    try {
      const response = await apiClient.post<ProcessVideoResponse>(
        `/videos/${id}/process`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error processing video:', error);
      throw error;
    }
  }

  /**
   * Get processing status
   */
  async getProcessingStatus(jobId: string): Promise<{
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    stage: string;
    videoUri?: string;
  }> {
    try {
      const response = await apiClient.get(`/videos/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting processing status:', error);
      throw error;
    }
  }
}

export const videosService = new VideosService();
