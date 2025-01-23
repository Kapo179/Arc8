export interface Session {
  id: string;
  hostId: string;
  title: string;
  startTime: string;
  location: {
    name: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  type: 'ranked' | 'friendly';
  format: '5-a-side' | '8-a-side' | '11-a-side';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  teams: {
    home: Team;
    away: Team;
  };
  rules: string[];
  score?: {
    home: number;
    away: number;
  };
  mvp?: {
    playerId: string;
    votes: number;
  };
  highlights: Highlight[];
  invites: Invite[];
  referee?: string; // userId of nominated ref
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  captain: string; // userId of team captain
}

export interface Player {
  id: string;
  userId: string;
  name: string;
  position?: 'GK' | 'DEF' | 'MID' | 'FWD';
  number?: number;
  stats?: {
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
  };
}

export interface Highlight {
  id: string;
  sessionId: string;
  createdBy: string;
  type: 'goal' | 'save' | 'skill' | 'celebration' | 'other';
  mediaUrl: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

export interface Invite {
  id: string;
  sessionId: string;
  playerId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'left';
  role: 'player' | 'referee';
  team?: 'home' | 'away';
  timestamp: string;
} 