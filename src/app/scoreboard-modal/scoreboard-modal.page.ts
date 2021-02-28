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

  counter(i: number) {
    return new Array(i);
  }

  getEntry(val: ScoreEntry) {
    let pre: string;
    if ('target' in val) {
      pre = `${val.target}`; //return `${val.target} | ${val.score}`;
    } else {
      pre = '-'; //return `- | ${val.score}`;
    }
    return `${pre} | ${val.score}`;
  }
}
