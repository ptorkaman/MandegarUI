import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbDialogModule, NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from '../../@core/auth-guard';
import { PanelComponent } from './panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { BaseInfoRoutingModule } from './base-info/base-info-routing.module';
import { DepartmentRoutingModule } from './department/department-routing.module';

@NgModule({
  declarations:
    [
      PanelComponent,
      HomeComponent,
      ProfileComponent
    ],
  imports: [
    PanelRoutingModule,
    BaseInfoRoutingModule,
    DepartmentRoutingModule,
    CommonModule,
    NbMenuModule,
    NbDialogModule,
    SharedModule,

    ThemeModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    ConfirmationService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class PanelModule { }
