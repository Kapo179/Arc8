import { FeedResponse, Post } from '@/types/feed';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const feedApi = {
  async getFeed(type: 'forYou' | 'activity', cursor?: string): Promise<FeedResponse> {
    const response = await fetch(
      `${API_BASE_URL}/feed/${type}${cursor ? `?cursor=${cursor}` : ''}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch feed');
    }
    
    return response.json();
  },

  async getPost(id: string): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    
    return response.json();
  },

  async likePost(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}/like`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to like post');
    }
  },

  async repost(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}/repost`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to repost');
    }
  }
}; 