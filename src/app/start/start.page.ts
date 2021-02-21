import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { timer } from 'rxjs';
import { CreationModalPage } from '../creation-modal/creation-modal.page';
import { LocalItemService } from '../services/local-item.service';
import { StatusService } from '../services/status.service';
import { StartService } from './start.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  name: string;
  id: string;

  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    private startService: StartService,
    private statusService: StatusService,
    private local: LocalItemService
  ) {}

  ngOnInit() {}

  joinGame() {
    this.startService.addPlayer(this.id, this.name).subscribe(async () => {
      console.log(`Addded ${this.name} to game (${this.id}).`);

      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Waiting for host...',
      });

      await loading.present();

      const time = timer(0, 10000);
      time.subscribe(() => {
        this.statusService.getStartedState(this.id).subscribe((data) => {
          if (data) {
            this.local.playerID = this.name;
            this.local.gameID = this.id;
          }
        });
      });
    });
  }

  createGame() {
    console.log(`Creating game. Owner: ${this.name}`);
    this.startService.createGame().subscribe(async (data) => {
      this.id = data.gameID;

      this.startService.addPlayer(this.id, this.name).subscribe(async () => {
        console.log(`Poping up modal`);
        const modal = await this.modalController.create({
          component: CreationModalPage,
          cssClass: 'my-custom-class',
          swipeToClose: true,
          componentProps: {
            gameID: this.id,
            controller: this.modalController,
          },
        });
        await modal.present();
        modal.onWillDismiss().then(() => {
          console.log('Starting game.');
          this.local.playerID = this.name;
          this.local.gameID = this.id;
        });
      });
    });
  }
}
