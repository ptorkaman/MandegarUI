import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../../../app/shared/base/base.component';
import { StaffComplementaryModel } from '../../../../models';
import { StaffAddressService } from '../../../../services/staff-address.service';
import { StaffComplementaryService } from '../../../../services/staff-complementary.service';

@Component({
  selector: 'app-staff-further-information-index',
  templateUrl: './staff-further-information-index.component.html',
  styleUrls: ['./staff-further-information-index.component.scss']
})
export class StaffFurtherInformationIndexComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  staffId: number;
  staffComplementary: StaffComplementaryModel;

  religions: [] = [];
  nationalities: [] = [];
  bloodTypes: [] = [];
  maritalStatuses: [] = [];
  militaryServiceStatuses: [] = [];
  insuranceTypes: [] = [];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private staffComplementaryService: StaffComplementaryService) {
    super(route);
    this.staffId = this.getRouteValue(route, 'staffId');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.staffComplementary = new StaffComplementaryModel();
    this.staffComplementary.staffId = this.staffId;
    this.form = this.formBuilder.formGroup(this.staffComplementary);
  }

  get f() {
    return this.form.controls;
  }

  getData() {
    this.setLoading(true);
    this.staffComplementaryService.getById(this.staffId).subscribe(res => {
      if (res.success) {
        this.form.patchValue({ ...res.data })
      }
      this.setLoading(false);
    });
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    this.staffComplementaryService.update(this.staffComplementary).subscribe(result => {
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
}
