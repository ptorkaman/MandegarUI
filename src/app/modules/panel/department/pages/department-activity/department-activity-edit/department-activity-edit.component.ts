import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { forkJoin } from 'rxjs';
import { DepartmentActivityModel } from '../../../models/department-activity.model';
import { DepartmentActivityService } from '../../../services/department-activity.service';
import { DepartmentService } from '../../../services/department.service';
import { ImagePreview } from '../../../../../../shared/functions/index';

@Component({
  selector: "app-department-activity-edit",
  templateUrl: "./department-activity-edit.component.html",
  styleUrls: ["./department-activity-edit.component.scss"],
})
export class DepartmentActivityEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  formModel: DepartmentActivityModel;
  id: number;
  departmentList=[];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentActivityService: DepartmentActivityService,
    private departmentService: DepartmentService,

  ) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
    ImagePreview();

  }

  private generateForm() {
    this.formModel = new DepartmentActivityModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    this.departmentService.getAll().subscribe(result => {
      this.departmentList = this.mapToSelectItem(result.data, 'name', 'id');;
    })

    this.setLoading(true);
    forkJoin({
      departments: this.departmentService.getAll(),
      department: this.departmentActivityService.getById(this.id)
    }).subscribe(result => {
      if (result.departments.success) {
        this.departmentList = this.mapToSelectItem(result.departments.data, 'name', 'id');
      }
      if (result.departments.success) {
        this.form.patchValue({
          name: result.department.data.name,
          description: result.department.data.description,
          activityDescription: result.department.data.activityDescription,
          departmentId: result.department.data.departmentId,
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

    this.departmentActivityService.edit(this.formModel).subscribe(result => {
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
      this.formModel.attachmentFile = '';
    }
    else {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formModel.attachmentFile = reader.result.toString();
      };
    }
  }

}
