import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../../../../../../app/shared/base/base.component';
import { ImagePreview } from '../../../../../../../app/shared/functions';
import { Operators } from '../../../../../../../app/shared/models/operators';
import { UpsertStaffModel } from '../../../models';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  genderSelection = [];
  staffFormModel: UpsertStaffModel;
  cities: [] = [];
  staffImageSrc;
  id: number;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private staffService: StaffService) {
    super(route);
    this.id = this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();

    ImagePreview();
  }

  private generateForm() {
    this.staffFormModel = new UpsertStaffModel();
    this.staffFormModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.staffFormModel);

    this.checkDateEqualValidator(this.form, 'birthDate', new Date().toString(), Operators.EqualLower);
    this.checkDateEqualValidator(this.form, 'identityIssueDate', new Date().toString(), Operators.EqualLower);
  }

  getData() {
    //TODO: Get Cities From Server
    this.setLoading(true);
    this.genderSelection.push(
      { value: true, label: 'مرد' },
      { value: false, label: 'زن' }
    )

    forkJoin(
      {
        staff: this.staffService.getById(this.id)
      }
    ).subscribe((result: any) => {

      if (!result.staff.success || !result.staff.data) {
        this.cancelClick();
        this.setLoading(false);
        return false;
      }

      if (result.staff.success) {
        this.staffImageSrc = result.staff.data.image;
      }

      this.form.patchValue({ ...result.staff.data });

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

    if (this.staffFormModel.image.startsWith('data:') == false) {
      this.staffFormModel.image = '';
    }

    this.staffService.update(this.staffFormModel).subscribe(result => {
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
