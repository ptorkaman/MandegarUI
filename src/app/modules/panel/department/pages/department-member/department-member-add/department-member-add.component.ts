import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { DepartmentMemberModel } from '../../../models/department-member.model';
import { DepartmentMemberService } from '../../../services/department-member.service';
import { DepartmentService } from '../../../services/department.service';
import { PositionService } from '../../../../base-info/services/position.service';
import { forkJoin } from 'rxjs';
import { DataService } from './../../../../../../@core/services/data.service';
import { StaffService } from '../../../../staff/services/staff.service';

@Component({
  selector: 'app-department-member-add',
  templateUrl: './department-member-add.component.html',
  styleUrls: ['./department-member-add.component.scss']
})
export class DepartmentMemberAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  formModel: DepartmentMemberModel;
  genderSelection = [];
  display: boolean = true;
  departmentList = [];
  staffList = [];
  positionList = [];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentService: DepartmentService, private dataService: DataService,

    private staffService: StaffService,
    private positionService: PositionService,
    private studyDegreeService: DepartmentMemberService
  ) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new DepartmentMemberModel();
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    this.setLoading(true);
    forkJoin({
      departments: this.departmentService.getAll(),
      positions: this.positionService.getAll(),
      staffs: this.staffService.getAllStaffBaseInfo()
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

    this.studyDegreeService.create(this.formModel).subscribe(result => {
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
      this.navigateBack();
    }, 100);
  }

}
