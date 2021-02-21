import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class URLProviderService {

  constructor() { }

  baseURL: string = `http://10.1.0.52:1337/api/`
  createGame: string = `${this.baseURL}newGame`
  addPlayer: string = `${this.baseURL}addPlayer`
  getPlayers: string = `${this.baseURL}getPlayers`
  getState: string = `${this.baseURL}getState`
}
