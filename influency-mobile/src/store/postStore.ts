import { create } from 'zustand';
import { Post } from '../services/posts';

interface PostState {
  // State
  posts: Post[];
  currentPost: Post | null;
  
  // Publication flow state
  selectedNetworks: string[];
  caption: string;
  hashtags: string[];
  scheduledAt: Date | null;
  publishNow: boolean;
  
  // Actions
  setCurrentPost: (post: Post | null) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, data: Partial<Post>) => void;
  deletePost: (id: string) => void;
  clearPosts: () => void;
  
  // Publication flow actions
  setSelectedNetworks: (networks: string[]) => void;
  setCaption: (caption: string) => void;
  setHashtags: (hashtags: string[]) => void;
  setScheduledAt: (date: Date | null) => void;
  setPublishNow: (publishNow: boolean) => void;
  resetPublicationFlow: () => void;
}

export const usePostStore = create<PostState>((set) => ({
  // Initial state
  posts: [],
  currentPost: null,
  selectedNetworks: [],
  caption: '',
  hashtags: [],
  scheduledAt: null,
  publishNow: true,
  
  // Actions
  setCurrentPost: (post) => set({ currentPost: post }),
  
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
  
  updatePost: (id, data) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...data, updatedAt: new Date() } : post
      ),
      currentPost:
        state.currentPost?.id === id
          ? { ...state.currentPost, ...data, updatedAt: new Date() }
          : state.currentPost,
    })),
  
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
      currentPost: state.currentPost?.id === id ? null : state.currentPost,
    })),
  
  clearPosts: () =>
    set({
      posts: [],
      currentPost: null,
    }),
  
  // Publication flow actions
  setSelectedNetworks: (networks) => set({ selectedNetworks: networks }),
  
  setCaption: (caption) => set({ caption }),
  
  setHashtags: (hashtags) => set({ hashtags }),
  
  setScheduledAt: (date) => set({ scheduledAt: date }),
  
  setPublishNow: (publishNow) => set({ publishNow }),
  
  resetPublicationFlow: () =>
    set({
      selectedNetworks: [],
      caption: '',
      hashtags: [],
      scheduledAt: null,
      publishNow: true,
    }),
}));
