import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject, timer } from 'rxjs';
import { Player } from '../services/datatypes.model';
import { StatusService } from '../services/status.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-creation-modal',
  templateUrl: './creation-modal.page.html',
  styleUrls: ['./creation-modal.page.scss'],
})
export class CreationModalPage implements OnInit {
  @Input() gameID: string;
  @Input() controller: ModalController;
  players: Array<Player>;
  private ender = new Subject<void>();

  constructor(private status: StatusService) {
    const time = timer(0, 10000);
    time.pipe(takeUntil(this.ender)).subscribe(() => {
      this.status.getAllPlayers(this.gameID).subscribe((data) => {
        this.players = data;
      });
    });
  }

  ngOnInit() {}

  close() {
    this.controller.dismiss();
  }

  ngOnDestroy() {
    this.ender.next();
    this.ender.complete();
  }
}
