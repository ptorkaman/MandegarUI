import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { DepartmentMeetingService } from '../../../services/department-meeting.service';
import { DepartmentService } from '../../../services/department.service';
import { DepartmentMeetingMemberService } from '../../../services/department-meeting-member.service';
import { DepartmentMeetingMemberModel } from '../../../models/department-meeting-member-model';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-department-meeting-member-add',
  templateUrl: './department-meeting-member-add.component.html',
  styleUrls: ['./department-meeting-member-add.component.scss']
})
export class DepartmentMeetingMemberAddComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  meetingMembers: [] = [];
  meetings: any[] = [];
  departments: any[] = [];
  members: any[] = [];
  formModel: DepartmentMeetingMemberModel;
  multiselectDisabled: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentMeetingService: DepartmentMeetingService,
    private departmentService: DepartmentService,
    private departmentMemberService: DepartmentMeetingMemberService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new DepartmentMeetingMemberModel();
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    forkJoin({
      meetings: this.departmentMeetingService.collection(),
      departments: this.departmentService.getAll(),
    })
      .subscribe(result => {
        if (result.meetings.success) {
          this.departments = this.mapToSelectItem(result.departments.data, 'name', 'id');
          this.meetings = this.mapToSelectItem(result.meetings.data, 'name', 'id');
        }
      });
  }

  drpMeetingNameChange(event: any) {
    this.form.controls.memberIds.reset();
  }

  drpMeetingChange(event: any) {
    if (event.value != null)
      this.departmentMemberService.collection(event.value).subscribe((result: any) => {
        if (result.success) {
          this.form.controls.memberIds.reset();
          this.members = this.mapToMultiSelectItem(result.data, 'name', 'code');
          this.multiselectDisabled = false;
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

    this.departmentMemberService.create(this.formModel).subscribe(
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

  cancelClick() {
    this.navigateBack();
  }

}
