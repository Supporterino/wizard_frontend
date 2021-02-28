import { Component, OnInit } from '@angular/core';
import { LocalItemService } from '../services/local-item.service';
import { StatusService } from '../services/status.service';
import { ModalController } from '@ionic/angular';
import { HandModalPage } from '../hand-modal/hand-modal.page';
import { Scoreboard } from '../services/datatypes.model';
import { ScoreboardModalPage } from '../scoreboard-modal/scoreboard-modal.page';

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

  constructor(
    private local: LocalItemService,
    private statusService: StatusService,
    public modalController: ModalController
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
