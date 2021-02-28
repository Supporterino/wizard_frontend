import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'start',
    loadChildren: () =>
      import('./start/start.module').then((m) => m.StartPageModule),
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./game/game.module').then((m) => m.GamePageModule),
  },
  {
    path: 'creation',
    loadChildren: () =>
      import('./creation-modal/creation-modal.module').then(
        (m) => m.CreationModalPageModule
      ),
  },
  {
    path: 'hand',
    loadChildren: () =>
      import('./hand-modal/hand-modal.module').then(
        (m) => m.HandModalPageModule
      ),
  },
  {
    path: 'scoreboard-modal',
    loadChildren: () => import('./scoreboard-modal/scoreboard-modal.module').then( m => m.ScoreboardModalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
