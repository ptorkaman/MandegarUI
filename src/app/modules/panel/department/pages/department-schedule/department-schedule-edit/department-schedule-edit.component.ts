import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { UpsertUserModel } from '../../../../account/models/upsert-user.model';
import { DepartmentScheduleModel } from '../../../models/department-schedule.model';
import { DepartmentScheduleService } from '../../../services/department-schedule.service';
import { DataService } from '../../../../../../@core/services/data.service';
import { SelectItem } from 'primeng/api';
import { ExecutiveCalendarService } from '../../../../base-info/services/executive-calendar.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: "app-department-schedule-edit",
  templateUrl: "./department-schedule-edit.component.html",
  styleUrls: ["./department-schedule-edit.component.scss"],
})
export class DepartmentScheduleEditComponent extends BaseComponent implements OnInit {
  display: boolean = true;
  form: FormGroup;
  formModel: DepartmentScheduleModel;
  model: UpsertUserModel;
  genderSelection = [];
  id: number;
  executiveCalendarList:SelectItem[] = [];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private dataService: DataService,
    private executiveCalendarService: ExecutiveCalendarService,
    private departmentScheduleService: DepartmentScheduleService
  ) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new DepartmentScheduleModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);

  }

  getData() {
    this.setLoading(true);
    forkJoin({
      departmentSchedules: this.executiveCalendarService.getAll(),
      departmentSchedule: this.departmentScheduleService.getById(this.id)
    }).subscribe(result => {
      if (result.departmentSchedules.success) {
        this.executiveCalendarList = this.mapToSelectItem(result.departmentSchedules.data, 'name', 'id');
      }

      if (result.departmentSchedule.success) {
        this.form.patchValue({
          name: result.departmentSchedule.data.name,
          executiveCalendarId: result.departmentSchedule.data.executiveCalendarId,
          timeLimit: result.departmentSchedule.data.timeLimit,
          fromDate: result.departmentSchedule.data.fromDate,
          toDate: result.departmentSchedule.data.toDate,
          id: result.departmentSchedule.data.id,
        });
      }

      this.setLoading(false);
    });


    // this.departmentScheduleService.getById(this.id).subscribe(result => {
    //   this.setLoading(false);
    //   if (result.success && result.data) {
    //     this.form.patchValue({
    //       name: result.data.name,
    //       executiveCalendarId: result.data.executiveCalendarId,
    //       timeLimit: result.data.timeLimit,
    //       fromDate: result.data.fromDate,
    //       toDate: result.data.toDate
    //     });
    //   }
    //   else {
    //     this.cancelClick();
    //     this.setLoading(false);
    //     this.showErrorMessage(result.message);
    //   }
    // });
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.departmentScheduleService.edit(this.formModel).subscribe(result => {
      if (result.success) {
        this.showSuccessMessage(result.message);
        this.setLoading(false);
        this.dataService.sendData(true);
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
