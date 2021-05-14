import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Card } from '../services/datatypes.model';

@Component({
  selector: 'app-hand-modal',
  templateUrl: './hand-modal.page.html',
  styleUrls: ['./hand-modal.page.scss'],
})
export class HandModalPage implements OnInit {
  @Input() cards: Array<Card>;
  @Input() controller: ModalController;
  @Input() playing: boolean;

  constructor() {}

  ngOnInit() {}

  play(card: Card) {
    this.controller.dismiss(card);
  }

  dismissModal() {
    if (!this.playing) this.controller.dismiss();
  }
}
