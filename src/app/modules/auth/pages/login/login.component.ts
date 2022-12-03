import { Component, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { StoreService } from '../../../../@core/services/store.service';
import { BaseComponent } from '../../../../shared/base/base.component';
import { StoreKeys } from '../../../../shared/statics/StoreKeys';
import { LoginModel } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { CaptchaService } from '../../services/captcha.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent extends BaseComponent {

  captchaImageSrc: string;
  form: FormGroup;
  formModel: LoginModel;
  disableBtn: boolean = true;
  reloadCaptcha = false;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private authService: AuthService,
    private store: StoreService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
  }

  private generateForm() {
    this.formModel = new LoginModel();
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  get f() {
    return this.form.controls;
  }


  OnGetCaptcha($event) {
    this.formModel.key = $event;
  }

  login() {
    this.reloadCaptcha = false;
    this.disableBtn = false;
    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    this.authService.getToken(this.formModel).subscribe(
      result => {
        this.disableBtn = true;
        this.setLoading(false);

        if (result.success) {
          this.store.localSetItem(
            StoreKeys.TOKEN_NAME,
            result.data?.token!
          );
          this.store.localSetItem(
            StoreKeys.TOKEN_EXPIRE,
            result.data?.expireTime!
          );

          this.navigateTo(['/']);
        }
        else {
          this.showErrorMessage(result.message);
          this.reloadCaptcha = true;
        }

      },
      (err) => {
        this.showErrorMessage('ارتباط برقرار نشد')
        this.disableBtn = true;
        this.reloadCaptcha = true;
      }
    )
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.key === 'Enter') {
      this.login();
    }
  }

}
