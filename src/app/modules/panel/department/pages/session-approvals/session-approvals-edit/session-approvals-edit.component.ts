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
  selector: 'app-session-approvals-edit',
  templateUrl: './session-approvals-edit.component.html',
  styleUrls: ['./session-approvals-edit.component.scss']
})
export class SessionApprovalsEditComponent extends BaseComponent implements OnInit {

  members: any[] = [];
  meetings: any[] = [];
  form: FormGroup;
  formModel: SessionApprovalModel;
  id:number;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentMeetingService: DepartmentMeetingService,
    private sessionApprovalsService:SessionApprovalsService,
    private staffService: StaffService) {
      super(route);
      this.id = +this.getRouteValue(route, 'id');
     }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new SessionApprovalModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    forkJoin({
      meetings: this.departmentMeetingService.collection(),
      staffs: this.staffService.getAllStaffBaseInfo(),
      sessionApprovals: this.sessionApprovalsService.getById(this.id)
    })
      .subscribe((result:any) => {
        if (result.meetings.success) {
          this.meetings = this.mapToSelectItem(result.meetings.data, 'name', 'id');
        }
        if (result.staffs.success) {
          this.members = this.mapToSelectItem(result.staffs.data, 'fullName', 'id');
        }
        if (result.sessionApprovals.success) {
          if (result.sessionApprovals.data !== null) {

            this.form.patchValue(result.sessionApprovals.data);
          }
        }
      });
  }

  sendRequest() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.sessionApprovalsService.update(this.formModel).subscribe(
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

  cancelClick() {
    this.navigateTo(['../..']);
  }

}
