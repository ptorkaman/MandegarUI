import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../@core/auth-guard';
import { PanelComponent } from './panel.component';
import { AuthService } from '../auth/services/auth.service';
import { PageLinks } from '../../../app/shared/statics/page-links';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: `/${PageLinks.Panel}/${PageLinks.Home}`, pathMatch: 'full' },
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: PageLinks.Profile,
        canActivate: [AuthGuard],
        component: ProfileComponent
      },
      {
        path: PageLinks.Home,
        canActivate: [AuthGuard],
        component: HomeComponent
      },
      {
        path: PageLinks.Account,
        loadChildren: () => import('./account/account.module').then(x => x.AccountModule),
        canActivate: [AuthGuard]
      },
      {
        path: PageLinks.BaseInfo,
        loadChildren: () => import('./base-info/base-info.module').then(x => x.BaseInfoModule),
        canActivate: [AuthGuard]
      },
      {
        path: PageLinks.Staff,
        loadChildren: () => import('./staff/staff.module').then(x => x.StaffModule),
        canActivate: [AuthGuard]
      },
      {
        path: PageLinks.Department,
        loadChildren: () => import('./department/department.module').then(x => x.DepartmentModule),
        canActivate: [AuthGuard]
      },
      { path: '', redirectTo: `${PageLinks.Home}`, pathMatch: 'full' },
      { path: '**', redirectTo: `${PageLinks.Home}` },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService],
})
export class PanelRoutingModule {
}
