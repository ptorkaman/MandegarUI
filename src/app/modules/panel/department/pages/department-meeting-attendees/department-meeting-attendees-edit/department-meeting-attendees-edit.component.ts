import { DepartmentMeetingAttendeesService } from './../../../services/department-meeting-attendees.service';
import { DepartmentMeetingAttendeesVM } from './../../../models/department-meeting-attendees.model';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { DepartmentMeetingService } from '../../../services/department-meeting.service';
import { DepartmentMeetingMemberService } from '../../../services/department-meeting-member.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-department-meeting-attendees-edit',
  templateUrl: './department-meeting-attendees-edit.component.html',
  styleUrls: ['./department-meeting-attendees-edit.component.scss']
})
export class DepartmentMeetingAttendeesEditComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  meetings: any[] = [];
  departments: any[] = [];
  members: any[] = [];
  formModel: DepartmentMeetingAttendeesVM;
  id: number;
  multiselectDisabled: boolean = false;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentMeetingService: DepartmentMeetingService,
    private departmentMeetingAttendeesService: DepartmentMeetingAttendeesService,
    private departmentMemberService: DepartmentMeetingMemberService) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new DepartmentMeetingAttendeesVM();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  drpMeetingMemeberChange(event: any) {
    if (event.value != null)
      this.departmentMeetingAttendeesService.collection(event.value).subscribe((result: any) => {
        if (result.success) {
          this.members = this.mapToMultiSelectItem(result.data, 'name', 'code');
          this.multiselectDisabled = false;
          this.form.controls.memberIds.reset();
        }
      });
  }

  getData() {
    forkJoin({
      meetings: this.departmentMeetingService.collection(),
      members: this.departmentMeetingAttendeesService.collection(+this.id),
      attendees: this.departmentMeetingAttendeesService.getById(+this.id)
    })
      .subscribe((result: any) => {

        if (result.meetings.success) {
          this.meetings = this.mapToSelectItem(result.meetings.data, 'name', 'id');
        }

        if (result.members.success) {
          this.members = this.mapToMultiSelectItem(result.members.data, 'name', 'code');
        }

        if (result.attendees.success) {
          if (result.members.data !== null) {
            let meetMembers = [];
            const length = this.members.length;
            const count = result.attendees.data.memberIds.length;
            for (let index = 0; index < length; index++) {
              const element = this.members[index];
              for (let idx = 0; idx < count; idx++) {
                const code = result.attendees.data.memberIds[idx];
                if (+element.code == code) {
                  meetMembers.push(element);
                }
              }
            }

            this.form.patchValue({
              departmentMeetingId: result.attendees.data.departmentMeetingId,
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
        ids.push(element.code != undefined ? element.code : element);
      }
      this.formModel.memberIds = [];
      this.formModel.memberIds = ids;
    }

    this.departmentMeetingAttendeesService.update(this.formModel).subscribe(
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
