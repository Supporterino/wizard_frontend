import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreationModalPage } from '../creation-modal/creation-modal.page';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  name: string;
  id: string;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  joinGame() {
    console.log(`${this.name}, ${this.id}`);
  }

  async createGame() {
    console.log(`Creating game. Owner: ${this.name}`)
    const modal = await this.modalController.create({
      component: CreationModalPage,
      cssClass: 'my-custom-class',
      swipeToClose: true
    });
    await modal.present();
    modal.onWillDismiss().then(() => {
      console.log('Starting game.')
    })
  }
}
