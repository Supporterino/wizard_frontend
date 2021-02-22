import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HandModalPageRoutingModule } from './hand-modal-routing.module';

import { HandModalPage } from './hand-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HandModalPageRoutingModule
  ],
  declarations: [HandModalPage]
})
export class HandModalPageModule {}
