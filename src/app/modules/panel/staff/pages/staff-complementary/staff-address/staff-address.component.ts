import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../../app/shared/base/base.component';
import { StaffAddressModel } from '../../../models';
import { StaffAddressService } from '../../../services/staff-address.service';

@Component({
  selector: 'app-staff-address',
  templateUrl: './staff-address.component.html',
  styleUrls: ['./staff-address.component.scss']
})
export class StaffAddressComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  staffId: number;
  staffAddress: StaffAddressModel;
  addressTypes: [] = [];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private staffAddressService: StaffAddressService) {
    super(route);
    this.staffId = this.getRouteValue(route, 'staffId');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.staffAddress = new StaffAddressModel();
    this.staffAddress.staffId = this.staffId;
    this.form = this.formBuilder.formGroup(this.staffAddress);
  }

  get f() {
    return this.form.controls;
  }

  getData() {
    this.setLoading(true);
    this.staffAddressService.getById(this.staffId).subscribe(res => {
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

    this.staffAddressService.update(this.staffAddress).subscribe(result => {
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
