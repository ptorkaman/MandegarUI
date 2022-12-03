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
  selector: 'app-department-meeting-edit',
  templateUrl: './department-meeting-edit.component.html',
  styleUrls: ['./department-meeting-edit.component.scss']
})
export class DepartmentMeetingEditComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  formModel: DepartmentMeetingModel;
  schedules: any[] = [];
  id: number;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private scheduleService: DepartmentScheduleService,
    private departmentMeetingService: DepartmentMeetingService) {
    super(route);
    this.id = this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new DepartmentMeetingModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  sendRequest() {
    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    if (this.f.meetingTime.value instanceof Date) {
      let date = new Date(this.f.meetingTime.value);
      this.formModel.time = date.getHours() + ":" + date.getMinutes();
    }
    else {
      this.formModel.time = this.f.meetingTime.value;
    }

    this.departmentMeetingService.update(this.formModel).subscribe(
      result => {
        this.setLoading(false);

        if (result.success) {
          this.showSuccessMessage(result.message);
          this.cancelClick();
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
    this.setLoading(true);
    forkJoin({
      schedules: this.scheduleService.getAll(),
      meeting: this.departmentMeetingService.getById(+this.id)
    })
      .subscribe((result: any) => {
        if (result.schedules.success) {
          this.schedules = this.mapToSelectItem(result.schedules.data, 'name', 'id')
        }

        if (result.meeting.success) {
          if (result.meeting.data !== null) {
            this.form.patchValue({
              name: result.meeting.data.name,
              meetingDate: result.meeting.data.meetingDate,
              meetingTime: result.meeting.data.time,
              departmentScheduleId: result.meeting.data.departmentScheduleId
            });
          }
        }
      });
    this.setLoading(false);
  }

  cancelClick() {
    this.navigateTo(['../..']);
  }
}
