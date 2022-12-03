import { StaffService } from './../../../../staff/services/staff.service';
import { PublicMessage } from './../../../../../../shared/models/public-message.enum';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetFormType, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { forkJoin } from 'rxjs';
import { SessionApprovalsCriteriaModel } from '../../../models/Session-approvals-criteria.model';
import { SessionApprovalsService } from '../../../services/session-approvals.service';
import { DepartmentMeetingService } from '../../../services/department-meeting.service';
import { DepartmentMeetingAttendeesService } from '../../../services/department-meeting-attendees.service';

@Component({
  selector: 'app-session-approvals-index',
  templateUrl: './session-approvals-index.component.html',
  styleUrls: ['./session-approvals-index.component.scss']
})
export class SessionApprovalsIndexComponent extends BaseComponent implements OnInit {

  members: any[] = [];
  meetings: any[] = [];
  form: FormGroup;
  criteria: SessionApprovalsCriteriaModel;
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  btnMenuItems: MenuItem[];
  sessionApprovals: any[] = [];
  multiselectDisabled: boolean = true;
  memberInfo: any;
  display: boolean;
  textDisplay: boolean;
  text: any;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentMeetingService: DepartmentMeetingService,
    private confirmationService: ConfirmationService,
    private sessionApprovalsService: SessionApprovalsService,
    private departmentMeetingAttendeesService: DepartmentMeetingAttendeesService,
    private staffService: StaffService) {
    super(route);
  }

  ngOnInit() {
    this.generateTable();
    this.generateForm();
    this.generateMenu();
    this.getData();
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

  private generateForm() {
    this.criteria = new SessionApprovalsCriteriaModel();
    this.form = this.formBuilder.formGroup(this.criteria);
  }

  private generateTable() {
    this.cols = [
      { field: 'meetingTitle', header: 'Pages.DepartmentMeetingMemeber.MeetingName' },
      { field: 'persianDeadline', header: 'Pages.SessionApprovals.Deadline' }
    ];
  }

  private generateMenu() {
    this.btnMenuItems = [
      {
        label: PublicMessage.SessionApproval,
        icon: 'pi pi-list', command: () => {
          this.showText(this.selectedRow.id);
        }
      },
      {
        label: PublicMessage.Edit,
        icon: 'pi pi-pencil', command: () => {
          this.navigateTo(['edit', this.selectedRow.id]);
        }
      },
      {
        label: PublicMessage.Delete,
        icon: 'pi pi-trash', command: () => {
          this.deleteById(this.selectedRow.id);
        }
      }
    ];
  }

  showText(id: number) {
    this.setLoading(true);
    this.sessionApprovalsService.getById(id).subscribe(
      (result: any) => {
        if (result.success) {
          this.textDisplay = true;
          this.text = result.data.test;
          this.setLoading(false);
        }
        else {
          this.setLoading(false);
          this.showErrorMessage(result.message);
        }
      });
  }

  deleteById(id: number) {
    this.confirmationService.confirm({
      message: PublicMessage.DeleteSure,
      accept: () => {
        this.setLoading(true);
        this.sessionApprovalsService.deleteById(id).subscribe(
          result => {
            if (result.success) {
              this.showSuccessMessage(result.message)
              this.setLoading(false);
              this.loadLazy(null);
            }
            else {
              this.setLoading(false);
              this.showErrorMessage(result.message)
            }
          }
        );
      },
    });
  }

  loadLazy(event: LazyLoadEvent | null) {
    this.loading = true;

    this.criteria.pageIndex = event ? (event.first / event.rows) : 0;
    this.criteria.pageCount = event ? event.rows : this.rows;
    this.criteria.orderBy = (event && event.sortField) ? event.sortField : '1';
    this.criteria.orderAsc = (event && event.sortOrder == 1) ? true : false;

    if (this.criteria.deadlineFrom != null && this.criteria.deadlineTo != null) {
      if (this.criteria.deadlineFrom > this.criteria.deadlineTo)
        this.showErrorMessage(PublicMessage.DeadlineFromInvalid);

      if (this.criteria.deadlineTo < this.criteria.deadlineFrom)
        this.showErrorMessage(PublicMessage.DeadlineToInvalid);
    }

    this.sessionApprovalsService.getAll(this.criteria).subscribe(
      (result: any) => {
        if (result.success) {
          this.sessionApprovals = result.data.rows;
          this.totalRecords = result.data.total;
          this.loading = false;
        }
        else {
          this.loading = false;
        }
      }
    );

  }

  showMembers(item: any) {
    this.memberInfo = [];
    this.display = true;
    this.setLoading(true);
    this.sessionApprovalsService.getAllMembers(item.id).subscribe(
      result => {
        if (result.success) {
          this.memberInfo = result.data;
          this.setLoading(false);
          this.loadLazy(null);
        }
        else {
          this.setLoading(false);
          this.showErrorMessage(result.message);
        }
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  rowBtnClick(menu, rowData, event) {
    this.selectedRow = rowData;
    menu.toggle(event);
  }

  navigateToAdd() {
    this.navigateTo(['add']);
  }

  clearForm() {
    this.form.reset({ resetType: ResetFormType.ControlsOnly });
    this.loadLazy(null);
  }

  search() {
    this.loadLazy(null);
  }

}
