import { create } from 'zustand';
import { Post, FeedResponse } from '@/types/feed';
import { feedApi } from '@/services/api';

interface FeedState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  cursor?: string;
  hasMore: boolean;
  
  // Actions
  fetchFeed: (type: 'forYou' | 'activity') => Promise<void>;
  fetchMore: () => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  repost: (postId: string) => Promise<void>;
}

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  
  fetchFeed: async (type) => {
    set({ loading: true, error: null });
    try {
      const response = await feedApi.getFeed(type);
      set({ 
        posts: response.posts,
        cursor: response.nextCursor,
        hasMore: !!response.nextCursor,
        loading: false 
      });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      set({ error, loading: false });
    }
  },

  fetchMore: async () => {
    const { loading, hasMore, cursor, posts } = get();
    if (loading || !hasMore) return;

    set({ loading: true });
    try {
      const response = await feedApi.getFeed('forYou', cursor);
      set({ 
        posts: [...posts, ...response.posts],
        cursor: response.nextCursor,
        hasMore: !!response.nextCursor,
        loading: false 
      });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred';
      set({ error, loading: false });
    }
  },

  likePost: async (postId) => {
    try {
      await feedApi.likePost(postId);
      // Optimistically update the UI
      set(state => ({
        posts: state.posts.map(post => 
          post.id === postId 
            ? { ...post, metadata: { ...post.metadata, likes: post.metadata.likes + 1 }} 
            : post
        )
      }));
    } catch (error) {
      // Revert on error
      console.error('Failed to like post:', error);
    }
  },

  repost: async (postId) => {
    try {
      await feedApi.repost(postId);
      set(state => ({
        posts: state.posts.map(post => 
          post.id === postId 
            ? { ...post, metadata: { ...post.metadata, reposts: post.metadata.reposts + 1 }} 
            : post
        )
      }));
    } catch (error) {
      console.error('Failed to repost:', error);
    }
  }
})); 