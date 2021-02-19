import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreationModalPageRoutingModule } from './creation-modal-routing.module';

import { CreationModalPage } from './creation-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreationModalPageRoutingModule
  ],
  declarations: [CreationModalPage]
})
export class CreationModalPageModule {}
