import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoreboardModalPage } from './scoreboard-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ScoreboardModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoreboardModalPageRoutingModule {}
