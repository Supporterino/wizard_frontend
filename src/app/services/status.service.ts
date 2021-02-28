import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card, GameState, Player, Scoreboard } from './datatypes.model';
import { URLProviderService } from './urlprovider.service';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient, private provider: URLProviderService) {}

  getAllPlayers(id: string): Observable<Array<Player>> {
    return this.http.get<Array<Player>>(`${this.provider.getPlayers}/${id}`);
  }

  getState(id: string) {
    return this.http.get<GameState>(`${this.provider.getState}/${id}`);
  }

  getRounds(id: string) {
    return this.http.get<number>(`${this.provider.rounds}/${id}`);
  }

  getActivePlayer(id: string) {
    return this.http.get<string>(`${this.provider.aplayer}/${id}`);
  }

  getHand(id: string, name: string) {
    return this.http.post<Array<Card>>(this.provider.hand, {
      gameID: id,
      playerID: name,
    });
  }

  getScoreboard(id: string) {
    return this.http.get<Scoreboard>(`${this.provider.score}/${id}`);
  }
}
