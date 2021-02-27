import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreationResponse, ResponseMessage } from '../services/datatypes.model';
import { URLProviderService } from '../services/urlprovider.service';

@Injectable({
  providedIn: 'root',
})
export class StartService {
  constructor(private provider: URLProviderService, private http: HttpClient) {}

  createGame() {
    return this.http.get<CreationResponse>(this.provider.createGame);
  }
}
