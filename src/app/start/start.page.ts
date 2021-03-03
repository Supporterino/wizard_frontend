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
import { GameState, Player } from '../services/datatypes.model';
import { LocalItemService } from '../services/local-item.service';
import { StatusService } from '../services/status.service';
import { StartService } from './start.service';
import { takeUntil } from 'rxjs/operators';
import { URLProviderService } from '../services/urlprovider.service';
import { io } from 'socket.io-client';
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  name: string;
  id: string;
  private ender = new Subject<void>();
  players: Array<Player>;

  constructor(
    public modalController: ModalController,
    public loadingController: LoadingController,
    private startService: StartService,
    private local: LocalItemService,
    private router: Router,
    private toastController: ToastController,
    private provider: URLProviderService
  ) {}

  ngOnInit() {}

  async joinGame() {
    const socket = io(`${this.provider.url}/${this.id}`);

    socket.emit('user-add', this.name);

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Waiting for host...',
    });

    socket.on('game-started', () => {
      this.local.playerID = this.name;
      this.local.gameID = this.id;
      this.router.navigate(['game']);
      loading.dismiss();
    });

    await loading.present();
  }

  async createGame() {
    console.log(`Creating game. Owner: ${this.name}`);
    this.startService.createGame().subscribe(async (data) => {
      this.id = data.gameID;

      const socket = io(`${this.provider.url}/${this.id}`);

      socket.on('game-started', () => {
        this.router.navigate(['game']);
      });

      socket.emit('user-add', this.name);

      console.log(`Poping up modal`);
      const modal = await this.modalController.create({
        component: CreationModalPage,
        cssClass: 'my-custom-class',
        swipeToClose: true,
        componentProps: {
          gameID: this.id,
          controller: this.modalController,
          socket: socket,
        },
      });
      await modal.present();
      modal.onWillDismiss().then(() => {
        console.log('Starting game.');
        this.local.playerID = this.name;
        this.local.gameID = this.id;
        socket.emit('start-game', this.name);
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
