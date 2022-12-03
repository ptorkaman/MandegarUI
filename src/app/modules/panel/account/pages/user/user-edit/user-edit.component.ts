import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Operators } from '../../../../../../shared/models/operators';
import { ImagePreview } from '../../../../../../shared/functions/index';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { RolesService } from '../../../services/roles.service';
import { UsersService } from '../../../services/users.service';
import { forkJoin } from 'rxjs';
import { RoleModel } from '../../../models/Role.model';
import { UpsertUserModel } from '../../../models/upsert-user.model';
import { UserFormModel } from '../../../models/user-form.model';

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  userFormModel: UserFormModel;
  roleList = [];
  model: UpsertUserModel;
  genderSelection = [];
  id: number;
  userAvatarSrc;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private userService: UsersService,
    private roleService: RolesService) {
    super(route);
    this.id = this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();

    ImagePreview();
  }

  private generateForm() {
    this.userFormModel = new UserFormModel();
    this.userFormModel.id = this.id;

    this.form = this.formBuilder.formGroup(this.userFormModel);

    this.checkDateEqualValidator(this.form, 'birthDate', new Date().toString(), Operators.EqualLower);
  }

  getData() {
    this.setLoading(true);
    this.genderSelection.push(
      { value: true, label: 'مرد' },
      { value: false, label: 'زن' }
    )

    forkJoin(
      {
        roleList: this.roleService.getAll(),
        user: this.userService.getById(this.id)
      }
    ).subscribe((result: any) => {
      if (result.roleList.success) {
        this.roleList = this.mapToSelectItem(result.roleList.data, 'name', 'id')
      }

      if (result.user.success) {
        this.model = {
          user: result.user.data.user,
          profile: result.user.data.profile,
          roles: result.user.data.roles,
          userAvatar: ''
        };

        this.userAvatarSrc = 'data:image/jpg;base64,' + result.user.data.userAvatar;
      }

      if (!result.user.success || !result.user.data) {
        this.cancelClick();
        this.setLoading(false);
        return false;
      }

      let user = result.user.data;

      this.form.patchValue({
        name: user.profile.name,
        family: user.profile.family,
        nationalCode: user.profile.nationalCode,
        birthDate: user.profile.birthDate,
        mobile: user.profile.mobile,
        gender: user.profile.gender,
        isActive: user.user.isActive,
        username: user.user.username,
        email: user.profile.email,
        roles: this.mapToSelectItem(user.roles, 'name', 'id')
      });

      this.setLoading(false);
    });

  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {

    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    let formModel = this.form.getRawValue() as UserFormModel;

    let roles: RoleModel[] = [];
    if (formModel.roles) {
      formModel.roles.forEach(item => {
        roles.push({
          id: item.value,
          name: item.label
        })
      })
    }

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
        id: this.id,
        username: formModel.username,
        password: formModel.password,
        isActive: formModel.isActive,
        requestCode: '.'
      },
      roles: roles,
      userAvatar: this.userFormModel.userAvatar
    }

    if (typeof model.userAvatar === 'undefined') {
      model.userAvatar = '';
    }

    this.userService.update(model).subscribe(result => {
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
    this.navigateTo(['../..']);
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
