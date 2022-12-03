import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { forkJoin } from 'rxjs';
import { PositionService } from '../../../../base-info/services/position.service';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { UpsertUserModel } from '../../../../account/models/upsert-user.model';
import { DepartmentMemberModel } from '../../../models/department-member.model';
import { DepartmentMemberService } from '../../../services/department-member.service';
import { DepartmentService } from '../../../services/department.service';
import { DataService } from './../../../../../../@core/services/data.service';
import { StaffService } from '../../../../staff/services/staff.service';

@Component({
  selector: "app-department-member-edit",
  templateUrl: "./department-member-edit.component.html",
  styleUrls: ["./department-member-edit.component.scss"],
})
export class DepartmentMemberEditComponent extends BaseComponent implements OnInit {
  display: boolean = true;
  form: FormGroup;
  formModel: DepartmentMemberModel;
  model: UpsertUserModel;
  genderSelection = [];
  id: number;
  departmentList = [];
  staffList = [];
  positionList = [];
  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentService: DepartmentService, private dataService: DataService,

    private staffService: StaffService,
    private positionService: PositionService,
    private departmentMember: DepartmentMemberService
  ) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new DepartmentMemberModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);

  }

  getData() {
    this.setLoading(true);
    forkJoin({
      departments: this.departmentService.getAll(),
      positions: this.positionService.getAll(),
      staffs: this.staffService.getAllStaffBaseInfo(),
      departmentMember: this.departmentMember.getById(this.id)
    }).subscribe(result => {
      if (result.departments.success) {
        this.departmentList = this.mapToSelectItem(result.departments.data, 'name', 'id');
      }

      if (result.positions.success) {
        this.positionList = this.mapToSelectItem(result.positions.data, 'name', 'id');
      }

      if (result.staffs.success) {
        this.staffList = this.mapToSelectItem(result.staffs.data, 'fullName', 'id');
      }
      if (result.departmentMember.success) {
        this.form.patchValue({
          positionId: result.departmentMember.data.positionId,
          staffId: result.departmentMember.data.staffId,
          departmentId: result.departmentMember.data.departmentId,
          id: result.departmentMember.data.id
        });
      }
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

    this.departmentMember.edit(this.formModel).subscribe(result => {
      if (result.success) {
        this.showSuccessMessage(result.message);
        this.setLoading(false); this.dataService.sendData(true);

        this.cancelClick();
      }
      else {
        this.showErrorMessage(result.message);
        this.setLoading(false);
      }
    })
  }

  cancelClick() {
    this.display = false;
    setTimeout(() => {
      this.navigateTo(['../..']);

    }, 100);
  }

}
