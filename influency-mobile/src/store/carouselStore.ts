import { create } from 'zustand';
import { Carousel } from '../services/carousels';

interface CarouselState {
  // State
  carousels: Carousel[];
  currentCarousel: Carousel | null;
  
  // Actions
  setCurrentCarousel: (carousel: Carousel | null) => void;
  addCarousel: (carousel: Carousel) => void;
  updateCarousel: (id: string, data: Partial<Carousel>) => void;
  deleteCarousel: (id: string) => void;
  clearCarousels: () => void;
}

export const useCarouselStore = create<CarouselState>((set) => ({
  // Initial state
  carousels: [],
  currentCarousel: null,
  
  // Actions
  setCurrentCarousel: (carousel) => set({ currentCarousel: carousel }),
  
  addCarousel: (carousel) =>
    set((state) => ({
      carousels: [carousel, ...state.carousels],
    })),
  
  updateCarousel: (id, data) =>
    set((state) => ({
      carousels: state.carousels.map((carousel) =>
        carousel.id === id ? { ...carousel, ...data, updatedAt: new Date() } : carousel
      ),
      currentCarousel:
        state.currentCarousel?.id === id
          ? { ...state.currentCarousel, ...data, updatedAt: new Date() }
          : state.currentCarousel,
    })),
  
  deleteCarousel: (id) =>
    set((state) => ({
      carousels: state.carousels.filter((carousel) => carousel.id !== id),
      currentCarousel: state.currentCarousel?.id === id ? null : state.currentCarousel,
    })),
  
  clearCarousels: () =>
    set({
      carousels: [],
      currentCarousel: null,
    }),
}));
