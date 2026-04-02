import apiClient from './api';

export interface Post {
  id: string;
  contentId: string;
  contentType: 'video' | 'carousel' | 'image';
  caption: string;
  hashtags: string[];
  networks: SocialNetwork[];
  scheduledAt?: Date;
  publishedAt?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialNetwork {
  platform: 'instagram' | 'tiktok' | 'facebook' | 'youtube' | 'linkedin';
  accountId: string;
  accountName: string;
  status: 'pending' | 'published' | 'failed';
  publishedUrl?: string;
  error?: string;
}

export interface ListPostsResponse {
  posts: Post[];
  total: number;
}

export interface SchedulePostRequest {
  contentId: string;
  contentType: 'video' | 'carousel' | 'image';
  caption: string;
  hashtags: string[];
  networks: string[]; // Array of platform names
  scheduledAt: Date;
}

export interface PublishPostRequest {
  contentId: string;
  contentType: 'video' | 'carousel' | 'image';
  caption: string;
  hashtags: string[];
  networks: string[]; // Array of platform names
}

export interface PostResponse {
  post: Post;
}

export interface GenerateCaptionRequest {
  contentId: string;
  contentType: 'video' | 'carousel' | 'image';
  tone?: 'professional' | 'casual' | 'funny' | 'inspirational';
  includeHashtags?: boolean;
}

export interface GenerateCaptionResponse {
  caption: string;
  hashtags: string[];
}

export class PostsService {
  /**
   * List all posts for the current user
   */
  async list(): Promise<ListPostsResponse> {
    try {
      const response = await apiClient.get<ListPostsResponse>('/posts');
      return response.data;
    } catch (error) {
      console.error('Error listing posts:', error);
      throw error;
    }
  }

  /**
   * Schedule a post for future publication
   */
  async schedule(data: SchedulePostRequest): Promise<PostResponse> {
    try {
      const response = await apiClient.post<PostResponse>('/posts/schedule', data);
      return response.data;
    } catch (error) {
      console.error('Error scheduling post:', error);
      throw error;
    }
  }

  /**
   * Publish a post immediately
   */
  async publish(data: PublishPostRequest): Promise<PostResponse> {
    try {
      const response = await apiClient.post<PostResponse>('/posts/publish', data);
      return response.data;
    } catch (error) {
      console.error('Error publishing post:', error);
      throw error;
    }
  }

  /**
   * Delete a post
   */
  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/posts/${id}`);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  /**
   * Generate caption with AI
   */
  async generateCaption(_data: GenerateCaptionRequest): Promise<GenerateCaptionResponse> {
    try {
      // TODO: Implement actual API call
      // For now, return mock data
      const mockCaption = `Confira este conteúdo incrível! 🚀\n\nCriado com muito carinho para você. Espero que goste!`;
      const mockHashtags = ['#conteudo', '#criacao', '#influencer', '#digital', '#marketing'];

      return {
        caption: mockCaption,
        hashtags: mockHashtags,
      };

      // Real implementation:
      // const response = await apiClient.post<GenerateCaptionResponse>('/posts/generate-caption', data);
      // return response.data;
    } catch (error) {
      console.error('Error generating caption:', error);
      throw error;
    }
  }
}

export const postsService = new PostsService();
