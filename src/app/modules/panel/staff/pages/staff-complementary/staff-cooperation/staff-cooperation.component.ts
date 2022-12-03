import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { forkJoin } from 'rxjs';
import { CooperationTypeService } from '../../../../../../../app/modules/panel/base-info/services/cooperation-type.service';
import { DepartmentService } from '../../../../../../../app/modules/panel/base-info/services/department.service';
import { BaseComponent } from '../../../../../../../app/shared/base/base.component';
import { StaffCooperationModel } from '../../../models';
import { StaffCooperationService } from '../../../services/staff-cooperation.service';

@Component({
  selector: 'app-staff-cooperation',
  templateUrl: './staff-cooperation.component.html',
  styleUrls: ['./staff-cooperation.component.scss']
})
export class StaffCooperationComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  staffId: number;
  staffCooperation: StaffCooperationModel;
  cooperationTypes: any[] = [];
  departments: any[] = [];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private staffCooperationService: StaffCooperationService,
    private cooperationTypeService: CooperationTypeService,
    private departmentService: DepartmentService) {
    super(route);
    this.staffId = this.getRouteValue(route, 'staffId');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.staffCooperation = new StaffCooperationModel();
    this.staffCooperation.staffId = this.staffId;
    this.form = this.formBuilder.formGroup(this.staffCooperation);
    this.checkDateFromToValidator(this.form, 'cooperationStartDate', 'cooperationEndDate');
  }

  get f() {
    return this.form.controls;
  }

  getData() {
    this.setLoading(true);

    forkJoin({
      staffCooperation: this.staffCooperationService.getById(this.staffId),
      cooperationTypes: this.cooperationTypeService.getAll(),
      departments: this.departmentService.getAll()
    }).
      subscribe(res => {
        if (res.staffCooperation.success) {
          this.form.patchValue({ ...res.staffCooperation.data })
        }

        if (res.cooperationTypes.success) {
          this.cooperationTypes = this.mapToSelectItem(res.cooperationTypes.data, 'name', 'id')
        }

        if (res.departments.success) {
          this.departments = this.mapToSelectItem(res.departments.data, 'name', 'id')
        }

      })
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    this.staffCooperationService.update(this.staffCooperation).subscribe(result => {
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
