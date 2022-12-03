import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { DataService } from '../../../../../../../../app/@core/services';
import { BaseComponent } from '../../../../../../../../app/shared/base/base.component';
import { StaffFinancialModel } from '../../../../models';
import { StaffFinancialService } from '../../../../services/staff-financial.service';

@Component({
  selector: 'app-staff-financial-edit',
  templateUrl: './staff-financial-edit.component.html',
  styleUrls: ['./staff-financial-edit.component.scss']
})
export class StaffFinancialEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  display: boolean = true;
  staffFinancial: StaffFinancialModel;
  staffId: number;
  id: number;
  banks: any[] = [];

  constructor(route: ActivatedRoute,
    private dataService: DataService,
    private formBuilder: RxFormBuilder,
    private staffFinancialService: StaffFinancialService) {
    super(route);

    this.staffId = +this.getRouteValue(route, 'staffId');
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  getData() {
    if (this.id === 0 || typeof this.id === 'undefined') {
      this.cancelClick();
    }
    this.setLoading(true);
    this.staffFinancialService.getById(this.id).subscribe(result => {
      if (result.success) {
        this.form.patchValue({ ...result.data })
      }
      else {
        this.cancelClick();
      }
      this.setLoading(false)
    })
  }

  private generateForm() {
    this.staffFinancial = new StaffFinancialModel();
    this.staffFinancial.staffId = this.staffId;
    this.staffFinancial.id = this.id;
    this.form = this.formBuilder.formGroup(this.staffFinancial);
  }

  cancelClick() {
    this.display = false;
    setTimeout(() => {
      this.navigateTo(['../..']);
    }, 100);
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    if (this.staffFinancial.sheba) {
      this.staffFinancial.sheba = this.staffFinancial.sheba.replace(/-/g, "");
    }


    this.staffFinancialService.update(this.staffFinancial).subscribe(result => {
      if (result.success) {
        this.showSuccessMessage(result.message);
        this.setLoading(false);
        this.dataService.sendData(true);
        this.cancelClick();
      }
      else {
        this.showErrorMessage(result.message);
        this.setLoading(false);
      }
    })

  }

  get f() {
    return this.form.controls;
  }
}
