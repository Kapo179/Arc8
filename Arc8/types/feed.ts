export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  verified?: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: {
    text: string;
    media?: {
      type: 'image' | 'video' | 'map';
      url: string;
      aspectRatio?: number;
    }[];
  };
  metadata: {
    createdAt: string;
    likes: number;
    reposts: number;
    replies: number;
  };
  replyTo?: string;  // ID of parent post if this is a reply
  liked?: boolean;    // Add these interaction states
  reposted?: boolean; // to track user interactions
}

export interface FeedResponse {
  posts: Post[];
  nextCursor?: string;  // For pagination
} 