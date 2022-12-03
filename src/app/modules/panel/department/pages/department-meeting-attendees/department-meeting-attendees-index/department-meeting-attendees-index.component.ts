import { PublicMessage } from '../../../../../../shared/models/public-message.enum';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder, ResetFormType } from '@rxweb/reactive-form-validators';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { DepartmentMeetingService } from '../../../services/department-meeting.service';
import { DepartmentMeetingMemberService } from '../../../services/department-meeting-member.service';
import { DepartmentMeetingAttendeesSearchVM } from '../../../models/department-meeting-attendees-Criteria.model';
import { DepartmentMeetingAttendeesService } from '../../../services/department-meeting-attendees.service';

@Component({
  selector: 'app-department-meeting-attendees-index',
  templateUrl: './department-meeting-attendees-index.component.html',
  styleUrls: ['./department-meeting-attendees-index.component.scss']
})
export class DepartmentMeetingAttendeesIndexComponent extends BaseComponent implements OnInit {

  attendees: [] = [];
  meetings: any[] = [];
  members: any[] = [];
  form: FormGroup;
  criteria: DepartmentMeetingAttendeesSearchVM;
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  btnMenuItems: MenuItem[];
  display: boolean;
  memberInfo: any;
  multiselectDisabled: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentMeetingService: DepartmentMeetingService,
    private confirmationService: ConfirmationService,
    private departmentMeetingAttendeesService: DepartmentMeetingAttendeesService,
    private departmentMemberService: DepartmentMeetingMemberService) {
    super(route);
  }

  ngOnInit() {
    this.generateTable();
    this.generateForm();
    this.generateMenu();
    this.getData();
  }

  private generateForm() {
    this.criteria = new DepartmentMeetingAttendeesSearchVM();
    this.form = this.formBuilder.formGroup(this.criteria);
  }

  private generateTable() {
    this.cols = [
      { field: 'meetingName', header: 'Pages.DepartmentMeetingMemeber.MeetingName' }
    ];
  }

  private generateMenu() {
    this.btnMenuItems = [
      {
        label: PublicMessage.Edit,
        icon: 'pi pi-pencil', command: () => {
          this.navigateTo(['edit', this.selectedRow.departmentMeetingId]);
        }
      },
      {
        label: PublicMessage.Delete,
        icon: 'pi pi-trash', command: () => {
          this.deleteById(this.selectedRow.departmentMeetingId);
        }
      }
    ];
  }

  deleteById(id: number) {
    this.confirmationService.confirm({
      message: PublicMessage.DeleteSure,
      accept: () => {
        this.setLoading(true);
        this.departmentMeetingAttendeesService.deleteById(id).subscribe(
          result => {
            if (result.success) {
              this.showSuccessMessage(result.message)
              this.setLoading(false);
              this.loadLazy(null);
            }
            else {
              this.showErrorMessage(result.message)
            }
          }
        );
      },
    });
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

  loadLazy(event: LazyLoadEvent | null) {
    this.loading = true;

    this.criteria.pageIndex = event ? (event.first / event.rows) : 0;
    this.criteria.pageCount = event ? event.rows : this.rows;
    this.criteria.orderBy = (event && event.sortField) ? event.sortField : '1';
    this.criteria.orderAsc = (event && event.sortOrder == 1) ? true : false;

    if (this.criteria.memberIds != undefined) {
      const length = this.criteria.memberIds.length;
      let ids = [];
      for (let index = 0; index < length; index++) {
        const element: any = this.criteria.memberIds[index];
        ids.push(element.code);
      }
      this.criteria.memberIds = [];
      this.criteria.memberIds = ids;
    }

    this.departmentMeetingAttendeesService.getAll(this.criteria).subscribe(
      (result: any) => {
        if (result.success) {
          this.attendees = result.data.rows;
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
    this.departmentMeetingAttendeesService.getAllMembers(item.departmentMeetingId).subscribe(
      result => {
        if (result.success) {
          this.memberInfo = result.data;
          this.setLoading(false);
          this.loadLazy(null);
        }
        else {
          this.setLoading(false);
          this.showErrorMessage(result.message)
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
