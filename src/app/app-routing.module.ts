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
    path: 'creation-modal',
    loadChildren: () =>
      import('./creation-modal/creation-modal.module').then(
        (m) => m.CreationModalPageModule
      ),
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./game/game.module').then((m) => m.GamePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
