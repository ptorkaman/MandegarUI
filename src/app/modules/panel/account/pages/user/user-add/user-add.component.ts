import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Operators } from '../../../../../../shared/models/operators';
import { ImagePreview } from '../../../../../../shared/functions/index';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { RolesService } from '../../../services/roles.service';
import { UsersService } from '../../../services/users.service';
import { UpsertUserModel } from '../../../models/upsert-user.model';
import { UserFormModel } from '../../../models/user-form.model';

@Component({
  selector: 'app-users-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  userFormModel: UserFormModel;
  roleList = [];
  genderSelection = [];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private userService: UsersService,
    private roleService: RolesService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();

    ImagePreview();
  }

  private generateForm() {
    this.userFormModel = new UserFormModel();
    this.userFormModel.gender = true;
    this.userFormModel.isActive = true;
    this.form = this.formBuilder.formGroup(this.userFormModel);

    this.checkDateEqualValidator(this.form, 'birthDate', new Date().toString(), Operators.EqualLower);
  }

  getData() {
    this.genderSelection.push(
      { value: true, label: 'مرد' },
      { value: false, label: 'زن' }
    )

    this.roleService.getAll().subscribe(result => {
      this.roleList = result.data;
    })
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {

    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    let formModel = this.form.getRawValue() as UserFormModel;

    let model: UpsertUserModel = {
      profile: {
        name: formModel.name,
        family: formModel.family,
        email: formModel.email,
        birthDate: formModel.birthDate,
        nationalCode: formModel.nationalCode,
        gender: formModel.gender,
        mobile: formModel.mobile
      },
      user: {
        username: formModel.username,
        password: formModel.password,
        isActive: formModel.isActive,
        requestCode: '.'
      },
      roles: this.userFormModel.roles,
      userAvatar: this.userFormModel.userAvatar
    }

    this.userService.create(model).subscribe(result => {
      if (result.success) {
        this.showSuccessMessage(result.message);
        this.setLoading(false);
        this.cancelClick();
      }
      else {
        this.showErrorMessage(result.message);
        this.setLoading(false);
      }
    })

  }

  cancelClick() {
    this.navigateBack();
  }

  handleUpload(event) {
    const fileType = event.target.files[0]['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(fileType)) {
      this.userFormModel.userAvatar = '';
    }
    else {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.userFormModel.userAvatar = reader.result.toString();
      };
    }
  }
}
