import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { TaskModel } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { TaskGroupService } from '../../../services/task-group.service';
import { TaskGroupModel } from '../../../models/task-group.model';
import { SelectItem } from 'primeng/api';
import { DataService } from './../../../../../../@core/services/data.service';


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  taskFormModel: TaskModel;
  taskGroupList: SelectItem[] = [];
  genderSelection = [];
  taskGroup: TaskGroupModel;
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private taskService: TaskService,    private dataService: DataService,

    private taskGroupService: TaskGroupService
  ) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.taskFormModel = new TaskModel();
    this.form = this.formBuilder.formGroup(this.taskFormModel);

  }

  getData() {
    this.taskGroupService.getAll().subscribe(result => {
      this.taskGroupList = this.mapToSelectItem(result.data, 'name', 'id');;
    })
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.taskService.create(this.taskFormModel).subscribe(result => {
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
      this.navigateBack();
    }, 100);
  }
}
