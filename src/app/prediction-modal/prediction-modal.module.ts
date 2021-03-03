import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredictionModalPageRoutingModule } from './prediction-modal-routing.module';

import { PredictionModalPage } from './prediction-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredictionModalPageRoutingModule
  ],
  declarations: [PredictionModalPage]
})
export class PredictionModalPageModule {}
