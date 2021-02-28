import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoreboardModalPageRoutingModule } from './scoreboard-modal-routing.module';

import { ScoreboardModalPage } from './scoreboard-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreboardModalPageRoutingModule
  ],
  declarations: [ScoreboardModalPage]
})
export class ScoreboardModalPageModule {}
