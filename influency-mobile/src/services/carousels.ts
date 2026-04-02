import apiClient from './api';

export interface Carousel {
  id: string;
  title: string;
  topic: string;
  slideCount: number;
  slides: Slide[];
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'ready' | 'published';
}

export interface Slide {
  id: string;
  order: number;
  title: string;
  content: string;
  imageUrl?: string;
  backgroundColor?: string;
}

export interface ListCarouselsResponse {
  carousels: Carousel[];
  total: number;
}

export interface GenerateCarouselRequest {
  topic: string;
  slideCount: number;
}

export interface GenerateCarouselResponse {
  carousel: Carousel;
}

export interface UpdateCarouselRequest {
  title?: string;
  slides?: Slide[];
}

export class CarouselsService {
  /**
   * List all carousels for the current user
   */
  async list(): Promise<ListCarouselsResponse> {
    try {
      const response = await apiClient.get<ListCarouselsResponse>('/carousels');
      return response.data;
    } catch (error) {
      console.error('Error listing carousels:', error);
      throw error;
    }
  }

  /**
   * Generate a new carousel with AI
   */
  async generate(data: GenerateCarouselRequest): Promise<GenerateCarouselResponse> {
    try {
      // TODO: Implement actual API call
      // For now, return mock data
      const mockSlides: Slide[] = Array.from({ length: data.slideCount }, (_, i) => ({
        id: `slide-${i + 1}`,
        order: i + 1,
        title: `Slide ${i + 1}`,
        content: `Conteúdo do slide ${i + 1} sobre ${data.topic}`,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      }));

      const mockCarousel: Carousel = {
        id: Date.now().toString(),
        title: data.topic,
        topic: data.topic,
        slideCount: data.slideCount,
        slides: mockSlides,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft',
      };

      return {
        carousel: mockCarousel,
      };

      // Real implementation:
      // const response = await apiClient.post<GenerateCarouselResponse>('/carousels/generate', data);
      // return response.data;
    } catch (error) {
      console.error('Error generating carousel:', error);
      throw error;
    }
  }

  /**
   * Update carousel metadata or slides
   */
  async update(id: string, data: UpdateCarouselRequest): Promise<Carousel> {
    try {
      const response = await apiClient.patch<Carousel>(`/carousels/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating carousel:', error);
      throw error;
    }
  }

  /**
   * Delete a carousel
   */
  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`/carousels/${id}`);
    } catch (error) {
      console.error('Error deleting carousel:', error);
      throw error;
    }
  }
}

export const carouselsService = new CarouselsService();
