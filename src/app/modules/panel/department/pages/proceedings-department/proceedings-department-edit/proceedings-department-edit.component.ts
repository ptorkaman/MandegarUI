import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { ProceedingDepartmentModel } from '../../../models/proceeding-department-model';
import { DepartmentMeetingService } from '../../../services/department-meeting.service';
import { ProceedingsDepartmentService } from '../../../services/proceedings-department.service';

@Component({
  selector: 'app-proceedings-department-edit',
  templateUrl: './proceedings-department-edit.component.html',
  styleUrls: ['./proceedings-department-edit.component.scss']
})
export class ProceedingsDepartmentEditComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  formModel: ProceedingDepartmentModel;
  meetings: any[] = [];
  id: number;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentMeetingService: DepartmentMeetingService,
    private proceedingsDepartmentService: ProceedingsDepartmentService) {
    super(route);
    this.id = this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.getData();
    this.generateForm();
  }

  private generateForm() {
    this.formModel = new ProceedingDepartmentModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  sendRequest() {
    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    if (this.f.startTime.value instanceof Date) {
      let startTime = new Date(this.f.startTime.value);
      this.formModel.proceedingStartTime = startTime.getHours() + ":" + startTime.getMinutes();
    }
    else {
      this.formModel.proceedingStartTime = this.f.startTime.value;
    }

    if (this.f.endTime.value instanceof Date) {
      let endTime = new Date(this.f.endTime.value);
      this.formModel.proceedingEndTime = endTime.getHours() + ":" + endTime.getMinutes();
    }
    else {
      this.formModel.proceedingEndTime = this.f.endTime.value;
    }

    this.proceedingsDepartmentService.update(this.formModel).subscribe(
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

  getData() {
    forkJoin({
      meetings: this.departmentMeetingService.collection(),
      proceeding: this.proceedingsDepartmentService.getById(+this.id)
    })
      .subscribe((result: any) => {
        if (result.meetings.success) {
          this.meetings = this.mapToSelectItem(result.meetings.data, 'name', 'id');
        }

        if (result.proceeding.success) {
          if (result.proceeding.data !== null) {
            this.form.patchValue({
              departmentMeetingId: result.proceeding.data.departmentMeetingId,
              startDate: result.proceeding.data.startDate,
              startTime: result.proceeding.data.startTime,
              endDate: result.proceeding.data.endDate,
              endTime: result.proceeding.data.endTime,
              programs: result.proceeding.data.programs,
              comments: result.proceeding.data.comments,
              description: result.proceeding.data.description
            });
          }
        }

      });
  }

  get f() {
    return this.form.controls;
  }

  cancelClick() {
    this.navigateTo(['../..']);
  }

}
