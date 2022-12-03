import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { StoreService } from '../../../../app/@core/services';
import { AuthService } from '../../../../app/modules/auth/services/auth.service';
import { UsersService } from '../../../modules/panel/account/services/users.service';
import { PageLinks } from '../../../shared/statics/page-links';
import { StoreKeys } from '../../../shared/statics/StoreKeys';
import { BaseComponent } from '../../../../app/shared/base/base.component';
import { ChangePasswordModel } from '../../models/change-password.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BaseComponent {
  form: FormGroup;
  formModel: ChangePasswordModel;
  display = true;
  @Output() onHide: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private userService: UsersService,
    private authService: AuthService,
    private store: StoreService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.formModel = new ChangePasswordModel();
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  get f() {
    return this.form.controls;
  }

  cancelClick() {
    this.onHide.emit(false);
  }

  changePassword() {
    this.submitForm(this.form);
    if (!this.form.valid) return;

    let formModel = this.form.getRawValue();

    this.setLoading(true)
    this.userService.changePassword(formModel).subscribe(result => {
      if (result.success) {
        this.setLoading(false);
        this.logout();
      }
      else {
        this.showErrorMessage(result.message)
        this.setLoading(false);

      }
    });
  }

  logout() {
    this.authService.logOut().subscribe(result => {
      if (result.success) {
        this.store.localRemoveItem(StoreKeys.TOKEN_NAME);
        this.store.localRemoveItem(StoreKeys.TOKEN_EXPIRE);
        this.store.localRemoveItem(StoreKeys.USER_AVATAR);
        this.store.localRemoveItem(StoreKeys.USER_INFO);
        let url = `${PageLinks.Auth}/${PageLinks.Login}`;

        this.router.navigateByUrl(url);
      }
      else {
        this.setLoading(false);
        this.showErrorMessage(result.message)
      }
    });
  }
}
