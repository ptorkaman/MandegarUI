import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../shared/base/base.component';
import { ResetPasswordModel } from '../../models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseComponent {

  captchaImageSrc: string;
  form: FormGroup;
  formModel: ResetPasswordModel;
  disableBtn: boolean = true;
  isLoadedPage: boolean = false;
  isSuccessRequest = false;
  isWrongData = false;
  reloadCaptcha = false;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private authService: AuthService) {
    super(route);
  }
  ngOnInit() {
    this.generateForm();

    this.formModel.requestCode = this.getRouteValue(this.route, 'requestCode');

    this.checkCodeExists();
  }

  private generateForm() {
    this.formModel = new ResetPasswordModel();
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

    this.authService.resetPassword(this.formModel).subscribe(
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

  checkCodeExists() {
    this.setLoading(true);
    this.authService.resetPasswordCodeExists(this.formModel.requestCode).subscribe(res => {
      if (!res.success) {
        this.isWrongData = true
      }
      this.setLoading(false)
      this.disableBtn = true;
      this.isLoadedPage = true;
    })
  }
}
