import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'panel',
    loadChildren: () => import('../modules/panel/panel.module')
      .then(m => m.PanelModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../modules/auth/auth.module').then(m => m.AuthModule),
  },
  { path: '', redirectTo: 'panel', pathMatch: 'full' },
  { path: '**', redirectTo: 'panel' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
