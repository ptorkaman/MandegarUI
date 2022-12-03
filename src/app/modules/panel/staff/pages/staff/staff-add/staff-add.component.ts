import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ImagePreview } from '../../../../../../../app/shared/functions';
import { BaseComponent } from '../../../../../../../app/shared/base/base.component';
import { UpsertStaffModel } from '../../../models';
import { Operators } from '../../../../../../../app/shared/models/operators';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss']
})
export class StaffAddComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  genderSelection = [];
  staffFormModel: UpsertStaffModel;
  cities: [] = [];


  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private staffService: StaffService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();

    ImagePreview();
  }

  private generateForm() {
    this.staffFormModel = new UpsertStaffModel();
    this.staffFormModel.gender = true;
    this.staffFormModel.isActive = true;
    this.form = this.formBuilder.formGroup(this.staffFormModel);

    this.checkDateEqualValidator(this.form, 'birthDate', new Date().toString(), Operators.EqualLower);
    this.checkDateEqualValidator(this.form, 'identityIssueDate', new Date().toString(), Operators.EqualLower);
  }

  getData() {
    //TODO: Get Cities From Server
    this.genderSelection.push(
      { value: true, label: 'مرد' },
      { value: false, label: 'زن' }
    )
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {

    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    this.staffService.create(this.staffFormModel).subscribe(result => {
      if (result.success && result.data > 0) {
        this.showSuccessMessage(result.message);
        this.setLoading(false);
        this.navigateTo(['../staff-complementary', result.data])
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
      this.staffFormModel.image = '';
    }
    else {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.staffFormModel.image = reader.result.toString();
      };
    }
  }

}
