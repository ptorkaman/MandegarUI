import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLinks } from '../../../../app/shared/statics/page-links';
import { RoleAddComponent } from './pages/role/role-add/role-add.component';
import { RoleEditComponent } from './pages/role/role-edit/role-edit.component';
import { RoleIndexComponent } from './pages/role/role-index/role-index.component';
import { RoleOutletComponent } from './pages/role/role-outlet/role-outlet.component';
import { UserAddComponent } from './pages/user/user-add/user-add.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { UserIndexComponent } from './pages/user/user-index/user-index.component';
import { UserOutletComponent } from './pages/user/user-outlet/user-outlet.component';


const routes: Routes = [
  { path: '', redirectTo: `/${PageLinks.Panel}/${PageLinks.Account}/${PageLinks.User}`, pathMatch: 'full' },
  {
    path: PageLinks.User, component: UserOutletComponent,
    children: [
      { path: '', component: UserIndexComponent },
      { path: PageLinks.AddPage, component: UserAddComponent },
      { path: PageLinks.EditPage, component: UserEditComponent }
    ]
  },
  {
    path: PageLinks.Role, component: RoleOutletComponent,
    children: [
      { path: '', component: RoleIndexComponent },
      { path: PageLinks.AddPage, component: RoleAddComponent },
      { path: PageLinks.EditPage, component: RoleEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
