import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { forkJoin } from 'rxjs';
import { CooperationTypeService } from '../../../../../../../app/modules/panel/base-info/services/cooperation-type.service';
import { DepartmentService } from '../../../../../../../app/modules/panel/base-info/services/department.service';
import { BaseComponent } from '../../../../../../../app/shared/base/base.component';
import { StaffCooperationModel } from '../../../models';
import { StaffSacrificeModel } from '../../../models/staff-sacrifice.model';
import { StaffCooperationService } from '../../../services/staff-cooperation.service';
import { StaffSacrificeService } from '../../../services/staff-sacrifice.service';


@Component({
  selector: 'app-staff-sacrifice',
  templateUrl: './staff-sacrifice.component.html',
  styleUrls: ['./staff-sacrifice.component.scss']
})
export class StaffSacrificeComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  staffId: number;
  staffSacrifice: StaffSacrificeModel;
  relations: any[] = [];
  disabled = true;
  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private staffSacrificeService: StaffSacrificeService) {
    super(route);
    this.staffId = this.getRouteValue(route, 'staffId');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.staffSacrifice = new StaffSacrificeModel();
    this.staffSacrifice.staffId = this.staffId;
    this.form = this.formBuilder.formGroup(this.staffSacrifice);
  }

  get f() {
    return this.form.controls;
  }

  getData() {
    this.setLoading(true);

    forkJoin({
      staffSacrifice: this.staffSacrificeService.getById(this.staffId),
    }).
      subscribe(res => {
        if (res.staffSacrifice.success) {
          this.form.patchValue({ ...res.staffSacrifice.data })
        }

      })
  }

  acceptClick() {

    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    if (!this.staffSacrifice.isMartyrFamily) {
      this.staffSacrifice.relationId = null;
    }
    if (!this.staffSacrifice.isFreedMan) {
      this.staffSacrifice.captivityDuration = null;
    }
    if (!this.staffSacrifice.isVeteran) {
      this.staffSacrifice.veteranPercentage = null;
    }
    if (!this.staffSacrifice.isSacrificer) {
      this.staffSacrifice.battlefieldPresenceDuration = null;
    }

    this.staffSacrificeService.update(this.staffSacrifice).subscribe(result => {
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
