import { Component, OnInit } from '@angular/core';
import { LocalItemService } from '../services/local-item.service';
import { StatusService } from '../services/status.service';
import { ModalController } from '@ionic/angular';
import { HandModalPage } from '../hand-modal/hand-modal.page';
import { GameState, Scoreboard } from '../services/datatypes.model';
import { ScoreboardModalPage } from '../scoreboard-modal/scoreboard-modal.page';
import { PredictionModalPage } from '../prediction-modal/prediction-modal.page';
import { URLProviderService } from '../services/urlprovider.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  gameID: string;
  playerID: string;
  playerCount: number;
  roundCounter: number;
  activePlayer: string;
  scoreboard: Scoreboard;
  gameState: GameState;
  StateEnum = GameState;
  socket: Socket;

  constructor(
    private local: LocalItemService,
    private statusService: StatusService,
    public modalController: ModalController,
    private provider: URLProviderService
  ) {
    this.gameID = local.gameID;
    this.playerID = local.playerID;
    statusService.getAllPlayers(this.gameID).subscribe((data) => {
      this.playerCount = data.length;
    });
  }

  ngOnInit() {
    this.statusService.getRounds(this.gameID).subscribe((data) => {
      this.roundCounter = data;
    });
    this.statusService.getActivePlayer(this.gameID).subscribe((data) => {
      this.activePlayer = data;
    });
    this.statusService.getScoreboard(this.gameID).subscribe((data) => {
      this.scoreboard = data;
    });
    this.statusService.getState(this.gameID).subscribe((data) => {
      this.gameState = data;
    });

    this.socket = io(`${this.provider.url}/${this.gameID}`);

    this.socket.on('new-active-player', (data: string) => {
      this.activePlayer = data;
    });

    this.socket.on('scoreboard-update', (data: Scoreboard) => {
      this.scoreboard = data;
    });

    this.socket.on('state-update', (data: GameState) => {
      this.gameState = data;
    });

    this.socket.on('rc-update', (data: number) => {
      this.roundCounter = data;
    });
  }

  async predict() {
    console.log('Predicting');
    const modal = await this.modalController.create({
      component: PredictionModalPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        controller: this.modalController,
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();

    this.socket.emit('prediction', { id: this.playerID, val: data });
  }

  showHand() {
    this.statusService
      .getHand(this.gameID, this.playerID)
      .subscribe(async (cards) => {
        console.log(cards);
        const modal = await this.modalController.create({
          component: HandModalPage,
          cssClass: 'my-custom-class',
          swipeToClose: true,
          componentProps: {
            cards: cards,
            controller: this.modalController,
          },
        });
        await modal.present();

        const { data } = await modal.onWillDismiss();

        this.socket.emit('play-card', { id: this.playerID, card: data });
      });
  }

  async showScoreboard() {
    const modal = await this.modalController.create({
      component: ScoreboardModalPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        scoreboard: this.scoreboard,
        controller: this.modalController,
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
  }
}
