import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject, timer } from 'rxjs';
import { Player } from '../services/datatypes.model';
import { StatusService } from '../services/status.service';
import { takeUntil } from 'rxjs/operators';
import { URLProviderService } from '../services/urlprovider.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-creation-modal',
  templateUrl: './creation-modal.page.html',
  styleUrls: ['./creation-modal.page.scss'],
})
export class CreationModalPage implements OnInit {
  @Input() gameID: string;
  @Input() controller: ModalController;
  players: Array<Player>;
  @Input() socket: Socket;

  constructor(private provider: URLProviderService) {}

  ngOnInit() {
    this.socket.on('user-added', (data: Array<Player>) => {
      console.log('in modal');
      this.players = data;
    });
  }

  close() {
    this.controller.dismiss();
  }
}
