import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { DepartmentMeetingService } from '../../../services/department-meeting.service';
import { DepartmentMeetingMemberService } from '../../../services/department-meeting-member.service';
import { forkJoin } from 'rxjs';
import { DepartmentMeetingAttendeesVM } from '../../../models/department-meeting-attendees.model';
import { DepartmentMeetingAttendeesService } from '../../../services/department-meeting-attendees.service';

@Component({
  selector: 'app-department-meeting-attendees-add',
  templateUrl: './department-meeting-attendees-add.component.html',
  styleUrls: ['./department-meeting-attendees-add.component.scss']
})
export class DepartmentMeetingAttendeesAddComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  meetingMembers: [] = [];
  meetings: any[] = [];
  departments: any[] = [];
  members: any[] = [];
  formModel: DepartmentMeetingAttendeesVM;
  multiselectDisabled: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentMeetingService: DepartmentMeetingService,
    private departmentMemberService: DepartmentMeetingMemberService,
    private departmentMeetingAttendeesService: DepartmentMeetingAttendeesService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new DepartmentMeetingAttendeesVM();
    this.form = this.formBuilder.formGroup(this.formModel);
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

  drpMeetingMemeberChange(event: any) {
    if(event.value != null)
    this.departmentMeetingAttendeesService.collection(event.value).subscribe((result: any) => {
      if (result.success) {
        this.members = this.mapToMultiSelectItem(result.data, 'name', 'code');
        this.multiselectDisabled = false;
        this.form.controls.memberIds.reset();
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

    this.departmentMeetingAttendeesService.create(this.formModel).subscribe(
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
