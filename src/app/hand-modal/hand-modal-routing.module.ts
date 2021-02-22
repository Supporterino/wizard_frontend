import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HandModalPage } from './hand-modal.page';

const routes: Routes = [
  {
    path: '',
    component: HandModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HandModalPageRoutingModule {}
