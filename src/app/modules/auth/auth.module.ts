import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule
} from '@nebular/theme';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { CaptchaService } from './services/captcha.service';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbIconModule,
    NbAuthModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    CaptchaComponent,
    ResetPasswordComponent
  ],
  providers: [
    CaptchaService,
    AuthService
  ],
})
export class AuthModule {
}
