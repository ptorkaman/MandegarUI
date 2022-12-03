import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../shared/base/base.component';
import { ForgetPasswordModel } from '../../models';
import { AuthService } from '../../services/auth.service';
import { CaptchaService } from '../../services/captcha.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent extends BaseComponent {

  captchaImageSrc: string;
  form: FormGroup;
  formModel: ForgetPasswordModel;
  disableBtn: boolean = true;
  isSuccessRequest = false;
  reloadCaptcha = false;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private authService: AuthService) {
    super(route);
  }
  ngOnInit() {
    this.generateForm();
  }

  private generateForm() {
    this.formModel = new ForgetPasswordModel();
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  get f() {
    return this.form.controls;
  }

  OnGetCaptcha($event) {
    this.formModel.key = $event;
  }

  acceptClick() {
    this.reloadCaptcha = false;
    this.disableBtn = false;
    this.submitForm(this.form);
    if (!this.form.valid) return;


    this.setLoading(true);
    this.authService.forgetPassword(this.formModel).subscribe(
      result => {
        this.disableBtn = true;
        this.setLoading(false);

        if (result.success) {
          this.isSuccessRequest = true;
        }
        else {
          this.showErrorMessage(result.message);
          this.reloadCaptcha = true;
        }

        this.disableBtn = true;
        this.setLoading(false);
      },
      (err) => {
        this.showErrorMessage('ارتباط برقرار نشد')
        this.disableBtn = true;
        this.reloadCaptcha = true;
        this.setLoading(false);
      }
    )
  }
}
