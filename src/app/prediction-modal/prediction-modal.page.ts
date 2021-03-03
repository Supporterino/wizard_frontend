import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-prediction-modal',
  templateUrl: './prediction-modal.page.html',
  styleUrls: ['./prediction-modal.page.scss'],
})
export class PredictionModalPage implements OnInit {
  turnWins: number;
  @Input() controller: ModalController;

  constructor() {}

  ngOnInit() {}

  predict() {
    this.controller.dismiss(this.turnWins);
  }
}
