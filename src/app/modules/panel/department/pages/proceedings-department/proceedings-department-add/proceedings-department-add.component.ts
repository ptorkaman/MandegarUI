import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { forkJoin } from 'rxjs';
import { ProceedingDepartmentModel } from '../../../models/proceeding-department-model';
import { ProceedingsDepartmentService } from '../../../services/proceedings-department.service';
import { DepartmentMeetingService } from '../../../services/department-meeting.service';

@Component({
  selector: 'app-proceedings-department-add',
  templateUrl: './proceedings-department-add.component.html',
  styleUrls: ['./proceedings-department-add.component.scss']
})
export class ProceedingsDepartmentAddComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  formModel: ProceedingDepartmentModel;
  meetings: any[] = [];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentMeetingService: DepartmentMeetingService,
    private proceedingsDepartmentService: ProceedingsDepartmentService) {
    super(route);
  }

  ngOnInit() {
    this.getData();
    this.generateForm();
  }

  private generateForm() {
    this.formModel = new ProceedingDepartmentModel();
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  sendRequest() {
    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    let startTime = new Date(this.f.startTime.value);
    this.formModel.proceedingStartTime = startTime.getHours() + ":" + startTime.getMinutes();

    let endTime = new Date(this.f.endTime.value);
    this.formModel.proceedingEndTime = endTime.getHours() + ":" + endTime.getMinutes();

    this.proceedingsDepartmentService.create(this.formModel).subscribe(
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
      meetings: this.departmentMeetingService.collection()
    })
      .subscribe(result => {
        if (result.meetings.success) {
          this.meetings = this.mapToSelectItem(result.meetings.data, 'name', 'id');
        }
      });
  }

  cancelClick() {
    this.navigateBack();
  }

}
