export interface CreationResponse {
  msg: string;
  gameID: string;
}

export interface Card {
  color: string;
  char: string;
}

export interface Player {
  hand: Array<Card>;
  id: string;
  hit: number;
}

export interface Scoreboard {
  players: Array<Player>;
  board: Array<Array<ScoreEntry>>;
}

export interface ScoreEntry {
  target: number;
  score: number;
}

export enum GameState {
  Joining,
  Predicting,
  Playing,
  End,
}

export interface ResponseMessage {
  msg: string;
}
