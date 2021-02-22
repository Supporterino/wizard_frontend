import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Subject } from 'rxjs';
import { timer } from 'rxjs';
import { CreationModalPage } from '../creation-modal/creation-modal.page';
import { GameState } from '../services/datatypes.model';
import { LocalItemService } from '../services/local-item.service';
import { StatusService } from '../services/status.service';
import { StartService } from './start.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  name: string;
  id: string;
  private ender = new Subject<void>();

  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    private startService: StartService,
    private statusService: StatusService,
    private local: LocalItemService,
    private router: Router,
    private toastController: ToastController
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

      let time = timer(0, 10000);
      time.pipe(takeUntil(this.ender)).subscribe(() => {
        this.statusService.getState(this.id).subscribe((data) => {
          console.log(data);
          if (data == GameState.Predicting) {
            this.local.playerID = this.name;
            this.local.gameID = this.id;
            loading.dismiss();
            this.ender.next();
            this.ender.complete();
            this.router.navigate(['/game']);
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
          this.startService.startGame(this.id, this.name).subscribe((data) => {
            this.presentToast(data.msg);
            this.router.navigate(['game']);
          });
        });
      });
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
