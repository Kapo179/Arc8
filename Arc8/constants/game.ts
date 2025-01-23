export type PlayersPerSide = '5' | '6' | '7' | '8' | '9' | '11';
export type GameType = 'league' | 'friendly' | 'cup' | 'casual';

export const PLAYERS_OPTIONS = [
  { value: '5', label: '5-a-side' },
  { value: '6', label: '6-a-side' },
  { value: '7', label: '7-a-side' },
  { value: '8', label: '8-a-side' },
  { value: '9', label: '9-a-side' },
  { value: '11', label: '11-a-side' },
] as const;

export const GAME_TYPES = [
  { value: 'league', label: 'League Match' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'cup', label: 'Cup Game' },
  { value: 'casual', label: 'Casual' },
] as const; 