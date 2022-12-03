import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { TaskModel } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { TaskGroupService } from '../../../services/task-group.service';
import { forkJoin } from 'rxjs';
import { DataService } from './../../../../../../@core/services/data.service';

@Component({
  selector: "app-task-edit",
  templateUrl: "./task-edit.component.html",
  styleUrls: ["./task-edit.component.scss"],
})
export class TaskEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  formModel: TaskModel;
  id: number;
  taskGroupList = [];
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private taskService: TaskService,    private dataService: DataService,

    private taskGroupService: TaskGroupService
  ) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();

  }

  private generateForm() {
    this.formModel = new TaskModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    this.setLoading(true);

    forkJoin({
      taskGroups: this.taskGroupService.getAll(),
      taskGroup: this.taskService.getById(this.id)
    }).subscribe(result => {
      if (result.taskGroups.success) {
        this.taskGroupList = this.mapToSelectItem(result.taskGroups.data, 'name', 'id');;
      }

      if (result.taskGroup.success) {
        this.form.patchValue({
          name: result.taskGroup.data.name,
          taskGroupId: result.taskGroup.data.taskGroupId,
          id: result.taskGroup.data.id
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

    this.taskService.edit(this.formModel).subscribe(result => {
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
