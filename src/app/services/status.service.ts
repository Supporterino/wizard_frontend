import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../classes/player';
import { URLProviderService } from './urlprovider.service';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient, private provider: URLProviderService) {}

  getAllPlayers(id: string): Observable<Array<Player>> {
    return this.http.get<Array<Player>>(`${this.provider.getPlayers}/${id}`);
  }

  getStartedState(id: string) {
    return this.http.get(`${this.provider.getState}/${id}`);
  }
}
