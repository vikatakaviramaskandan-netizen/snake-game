export interface Point {
  x: number;
  y: number;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
  color: string;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export enum GameStatus {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
}
