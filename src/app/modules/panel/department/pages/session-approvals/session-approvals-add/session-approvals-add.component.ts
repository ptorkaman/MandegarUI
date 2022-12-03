import { StaffService } from './../../../../staff/services/staff.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { forkJoin } from 'rxjs';
import { SessionApprovalsService } from '../../../services/session-approvals.service';
import { DepartmentMeetingService } from '../../../services/department-meeting.service';
import { SessionApprovalModel } from '../../../models/session-approvals.model';

@Component({
  selector: 'app-session-approvals-add',
  templateUrl: './session-approvals-add.component.html',
  styleUrls: ['./session-approvals-add.component.scss']
})
export class SessionApprovalsAddComponent extends BaseComponent implements OnInit {

  members: any[] = [];
  meetings: any[] = [];
  form: FormGroup;
  formModel: SessionApprovalModel;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentMeetingService: DepartmentMeetingService,
    private sessionApprovalsService:SessionApprovalsService,
    private staffService: StaffService) {
      super(route);
     }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new SessionApprovalModel();
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    forkJoin({
      meetings: this.departmentMeetingService.collection(),
      staffs: this.staffService.getAllStaffBaseInfo()
    })
      .subscribe(result => {
        if (result.meetings.success) {
          this.meetings = this.mapToSelectItem(result.meetings.data, 'name', 'id');
        }
        if (result.staffs.success) {
          this.members = this.mapToSelectItem(result.staffs.data, 'fullName', 'id');
        }
      });
  }

  sendRequest() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    if (this.formModel.memberIds != undefined) {
      const length = this.formModel.memberIds.length;
      let ids = [];
      for (let index = 0; index < length; index++) {
        const element: any = this.formModel.memberIds[index];
        ids.push(element.code != undefined ? element.code : element);
      }
      this.formModel.memberIds = [];
      this.formModel.memberIds = ids;
    }

    this.sessionApprovalsService.create(this.formModel).subscribe(
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
        this.setLoading(false);
      }
    )
  }

  get f() {
    return this.form.controls;
  }

  cancelClick() {
    this.navigateBack();
  }

}
