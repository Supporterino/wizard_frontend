import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalItemService {
  private _playerID: string;
  public get playerID(): string {
    return this._playerID;
  }
  public set playerID(value: string) {
    this._playerID = value;
  }
  private _gameID: string;
  public get gameID(): string {
    return this._gameID;
  }
  public set gameID(value: string) {
    this._gameID = value;
  }

  constructor() {}
}
