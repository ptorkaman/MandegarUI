import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { UpsertUserModel } from '../../../../account/models/upsert-user.model';
import { TaskGroupModel } from '../../../models/task-group.model';
import { TaskGroupService } from '../../../services/task-group.service';
import { DataService } from './../../../../../../@core/services/data.service';

@Component({
  selector: "app-task-group-edit",
  templateUrl: "./task-group-edit.component.html",
  styleUrls: ["./task-group-edit.component.scss"],
})
export class TaskGroupEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  formModel: TaskGroupModel;
  roleList = [];
  model: UpsertUserModel;
  genderSelection = [];
  taskgroupId: number;
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,    private dataService: DataService,

    private taskGroupService: TaskGroupService
  ) {
    super(route);
    this.taskgroupId = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new TaskGroupModel();
    this.formModel.id = this.taskgroupId;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    this.setLoading(true);
    this.taskGroupService.getById(this.taskgroupId).subscribe(result => {
      this.setLoading(false);
      if (result.success && result.data) {
        this.form.patchValue({
          name: result.data.name
        });
      }
      else {
        this.cancelClick();
        this.setLoading(false);
        this.showErrorMessage(result.message);
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.taskGroupService.edit(this.formModel).subscribe(result => {
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
