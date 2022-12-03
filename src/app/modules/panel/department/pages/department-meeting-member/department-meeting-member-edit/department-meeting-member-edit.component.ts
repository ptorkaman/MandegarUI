import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { DepartmentMeetingService } from '../../../services/department-meeting.service';
import { ConfirmationService } from 'primeng/api';
import { DepartmentService } from '../../../services/department.service';
import { DepartmentMeetingMemberService } from '../../../services/department-meeting-member.service';
import { DepartmentMeetingMemberModel } from '../../../models/department-meeting-member-model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-department-meeting-member-edit',
  templateUrl: './department-meeting-member-edit.component.html',
  styleUrls: ['./department-meeting-member-edit.component.scss']
})
export class DepartmentMeetingMemberEditComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  meetings: any[] = [];
  departments: any[] = [];
  members: any[] = [];
  formModel: DepartmentMeetingMemberModel;
  id: number;
  multiselectDisabled: boolean = false;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentMeetingService: DepartmentMeetingService,
    private confirmationService: ConfirmationService,
    private departmentService: DepartmentService,
    private departmentMemberService: DepartmentMeetingMemberService) {
    super(route);
    this.id = this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new DepartmentMeetingMemberModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  drpMeetingNameChange(event: any) {
    this.form.controls.memberIds.reset();
  }

  drpMeetingChange(event: any) {
    if(event.value != null)
    this.departmentMemberService.collection(event.value).subscribe((result: any) => {
      if (result.success) {
        this.form.controls.memberIds.reset();
        this.members = this.mapToMultiSelectItem(result.data, 'name', 'code');
        this.multiselectDisabled = false;
      }
    });
  }

  getData() {
    forkJoin({
      meetings: this.departmentMeetingService.collection(),
      departments: this.departmentService.getAll(),
      members: this.departmentMemberService.collection(0),
      meetingMembesr: this.departmentMemberService.getById(+this.id)
    })
      .subscribe((result: any) => {
        if (result.departments.success) {
          this.departments = this.mapToSelectItem(result.departments.data, 'name', 'id');
        }

        if (result.meetings.success) {
          this.meetings = this.mapToSelectItem(result.meetings.data, 'name', 'id');
        }

        if (result.members.success) {
          let data = result.members.data.filter(x => x.id == result.meetingMembesr.data.departmentId);
          this.members = this.mapToMultiSelectItem(data, 'name', 'code');
        }

        if (result.meetingMembesr.success) {
          if (result.meetingMembesr.data !== null) {
            let meetMembers = [];
            const length = this.members.length;
            const count = result.meetingMembesr.data.memberIds.length;
            for (let index = 0; index < length; index++) {
              const element = this.members[index];
              for (let idx = 0; idx < count; idx++) {
                const code = result.meetingMembesr.data.memberIds[idx];
                if (+element.code == code) {
                  meetMembers.push(element);
                }
              }
            }

            this.form.patchValue({
              departmentMeetingId: result.meetingMembesr.data.departmentMeetingId,
              departmentId: result.meetingMembesr.data.departmentId,
              memberIds: meetMembers
            });
          }
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
        ids.push(element.code);
      }
      this.formModel.memberIds = [];
      this.formModel.memberIds = ids;
    }

    this.departmentMemberService.update(this.formModel).subscribe(
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
