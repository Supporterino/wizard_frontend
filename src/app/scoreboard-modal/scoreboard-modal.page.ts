import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Scoreboard, ScoreEntry } from '../services/datatypes.model';

@Component({
  selector: 'app-scoreboard-modal',
  templateUrl: './scoreboard-modal.page.html',
  styleUrls: ['./scoreboard-modal.page.scss'],
})
export class ScoreboardModalPage implements OnInit {
  @Input() scoreboard: Scoreboard;
  @Input() controller: ModalController;

  constructor() {}

  ngOnInit() {
    console.log(this.scoreboard);
  }

  getEntry(val: ScoreEntry) {
    if (val.hasOwnProperty('target')) {
      return `${val.target} | ${val.score}`;
    } else {
      return `- | ${val.score}`;
    }
  }

  dismissModal() {
    this.controller.dismiss();
  }
}
