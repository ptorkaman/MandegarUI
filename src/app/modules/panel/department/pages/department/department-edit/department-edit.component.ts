import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { UpsertUserModel } from '../../../../account/models/upsert-user.model';
import { DepartmentModel } from '../../../models/department.model';
import { DepartmentService } from '../../../services/department.service';
import { DataService } from './../../../../../../@core/services/data.service';

@Component({
  selector: "app-department-edit",
  templateUrl: "./department-edit.component.html",
  styleUrls: ["./department-edit.component.scss"],
})
export class DepartmentEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  formModel: DepartmentModel;
  model: UpsertUserModel;
  genderSelection = [];
  id: number;
  departmentList: SelectItem[] = [];
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,    private dataService: DataService,

    private departmentService: DepartmentService
  ) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new DepartmentModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    this.setLoading(true);
    forkJoin({
      departments: this.departmentService.getAll(),
      department: this.departmentService.getById(this.id)
    }).subscribe(result => {
      if (result.departments.success) {
        this.departmentList = this.mapToSelectItem(result.departments.data, 'name', 'id');
      }
      if (result.department.success) {
        this.form.patchValue({
          name: result.department.data.name,
          parentId: result.department.data.parentId,
          id: result.department.data.id,
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

    this.departmentService.edit(this.formModel).subscribe(result => {
      if (result.success) {
        this.showSuccessMessage(result.message);
        this.setLoading(false);        this.dataService.sendData(true);

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
