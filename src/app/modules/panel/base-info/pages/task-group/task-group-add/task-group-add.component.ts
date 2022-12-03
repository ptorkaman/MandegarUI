import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { TaskGroupModel } from '../../../models/task-group.model';
import { TaskGroupService } from '../../../services/task-group.service';
import { DataService } from './../../../../../../@core/services/data.service';

@Component({
  selector: 'app-task-group-add',
  templateUrl: './task-group-add.component.html',
  styleUrls: ['./task-group-add.component.scss']
})
export class TaskGroupAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  taskGroupFormModel: TaskGroupModel;
  roleList = [];
  genderSelection = [];
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,    private dataService: DataService,

    private taskGroupService: TaskGroupService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
  }

  private generateForm() {
    this.taskGroupFormModel = new TaskGroupModel();
    this.form = this.formBuilder.formGroup(this.taskGroupFormModel);
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.taskGroupService.create(this.taskGroupFormModel).subscribe(result => {
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
