import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { RolesService } from './services/roles.service';
import { UsersService } from './services/users.service';
import { RoleAddComponent } from './pages/role/role-add/role-add.component';
import { RoleEditComponent } from './pages/role/role-edit/role-edit.component';
import { RoleIndexComponent } from './pages/role/role-index/role-index.component';
import { UserAddComponent } from './pages/user/user-add/user-add.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { UserIndexComponent } from './pages/user/user-index/user-index.component';
import { RoleOutletComponent } from './pages/role/role-outlet/role-outlet.component';
import { UserOutletComponent } from './pages/user/user-outlet/user-outlet.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ],
  declarations: [
    UserOutletComponent,
    UserIndexComponent,
    UserAddComponent,
    UserEditComponent,

    RoleOutletComponent,
    RoleIndexComponent,
    RoleAddComponent,
    RoleEditComponent,
  ],
  providers: [
    RolesService,
    UsersService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AccountModule { }
