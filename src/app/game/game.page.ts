import { Component, OnInit } from '@angular/core';
import { LocalItemService } from '../services/local-item.service';
import { StatusService } from '../services/status.service';
import { Subject } from 'rxjs';
import { timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { HandModalPage } from '../hand-modal/hand-modal.page';

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
  ending = new Subject<void>();
  activePlayer: string;

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
    const refresher = timer(0, 10000);
    refresher.pipe(takeUntil(this.ending)).subscribe(() => {
      this.statusService.getRounds(this.gameID).subscribe((data) => {
        this.roundCounter = data;
      });
      this.statusService.getActivePlayer(this.gameID).subscribe((data) => {
        this.activePlayer = data;
      });
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
}
