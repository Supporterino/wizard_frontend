import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreationModalPage } from './creation-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreationModalPageRoutingModule {}
