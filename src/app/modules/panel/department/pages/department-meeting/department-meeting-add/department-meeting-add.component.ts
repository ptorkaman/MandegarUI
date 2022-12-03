import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { DepartmentMeetingModel } from '../../../models/department-meeting-model';
import { DepartmentMeetingService } from '../../../services/department-meeting.service';
import { DepartmentScheduleService } from '../../../services/department-schedule.service';

@Component({
  selector: 'app-department-meeting-add',
  templateUrl: './department-meeting-add.component.html',
  styleUrls: ['./department-meeting-add.component.scss']
})
export class DepartmentMeetingAddComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  formModel: DepartmentMeetingModel;
  schedules: any[] = [];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private scheduleService: DepartmentScheduleService,
    private departmentMeetingService: DepartmentMeetingService) {
    super(route);
  }

  ngOnInit() {
    this.getData();
    this.generateForm();
  }

  private generateForm() {
    this.formModel = new DepartmentMeetingModel();
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  sendRequest() {
    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    let date = new Date(this.f.meetingTime.value);
    this.formModel.time = date.getHours() + ":" + date.getMinutes();

    this.departmentMeetingService.create(this.formModel).subscribe(
      result => {
        this.setLoading(false);

        if (result.success) {
          this.showSuccessMessage(result.message);
          this.navigateBack();
        }
        else {
          this.showErrorMessage(result.message);
        }

        this.setLoading(false);
      },
      (err) => {
        this.showErrorMessage('ارتباط برقرار نشد');
      }
    )
  }

  get f() {
    return this.form.controls;
  }

  getData() {
    forkJoin({
      schedules: this.scheduleService.getAll()
    })
      .subscribe(result => {
        if (result.schedules.success) {
          this.schedules = this.mapToSelectItem(result.schedules.data, 'name', 'id')
        }
      });
  }

  cancelClick() {
    this.navigateBack();
  }

}
