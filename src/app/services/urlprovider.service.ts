import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class URLProviderService {
  constructor() {}

  url: string = `https://wizard-online.com`;
  baseURL: string = `${this.url}/api/`;
  createGame: string = `${this.baseURL}newGame`;
  addPlayer: string = `${this.baseURL}addPlayer`;
  getPlayers: string = `${this.baseURL}getPlayers`;
  getState: string = `${this.baseURL}getState`;
  start: string = `${this.baseURL}startGame`;
  rounds: string = `${this.baseURL}getRoundCounter`;
  hand: string = `${this.baseURL}getHand`;
  aplayer: string = `${this.baseURL}getActivePlayer`;
  score: string = `${this.baseURL}getScoreboard`;
  dominant: string = `${this.baseURL}getDomColor`;
}
