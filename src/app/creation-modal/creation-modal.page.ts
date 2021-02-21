import { Component, Input, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Player } from '../classes/player';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-creation-modal',
  templateUrl: './creation-modal.page.html',
  styleUrls: ['./creation-modal.page.scss'],
})
export class CreationModalPage implements OnInit {
  @Input() gameID: string;
  players: Array<Player>;

  constructor(private status: StatusService) {
    const time = timer(0, 10000)
    time.subscribe(() => {
      this.status.getAllPlayers(this.gameID).subscribe(data => {this.players = data})
    })
  }

  ngOnInit() {
    
  }

}
