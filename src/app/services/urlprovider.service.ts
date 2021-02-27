import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class URLProviderService {
  constructor() {}

  url: string = `http://10.1.0.52:1337`;
  baseURL: string = `${this.url}/api/`;
  createGame: string = `${this.baseURL}newGame`;
  addPlayer: string = `${this.baseURL}addPlayer`;
  getPlayers: string = `${this.baseURL}getPlayers`;
  getState: string = `${this.baseURL}getState`;
  start: string = `${this.baseURL}startGame`;
  rounds: string = `${this.baseURL}getRoundCounter`;
  hand: string = `${this.baseURL}getHand`;
  aplayer: string = `${this.baseURL}getActivePlayer`;
}
