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

export enum GameState {
  Joining,
  Predicting,
  Playing,
  End,
}

export interface ResponseMessage {
  msg: string;
}
