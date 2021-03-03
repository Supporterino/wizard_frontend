import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredictionModalPage } from './prediction-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PredictionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredictionModalPageRoutingModule {}
