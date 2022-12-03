import { PublicMessage } from '../../../../../../shared/models/public-message.enum';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder, ResetFormType } from '@rxweb/reactive-form-validators';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { MemberCriteriaModel } from '../../../models/member-criteria.model';
import { DepartmentMeetingService } from '../../../services/department-meeting.service';
import { DepartmentMeetingMemberService } from '../../../services/department-meeting-member.service';
import { DepartmentService } from '../../../services/department.service';

@Component({
  selector: 'app-department-meeting-member-index',
  templateUrl: './department-meeting-member-index.component.html',
  styleUrls: ['./department-meeting-member-index.component.scss']
})
export class DepartmentMeetingMemberIndexComponent extends BaseComponent implements OnInit {

  meetingMembers: [] = [];
  meetings: any[] = [];
  departments: any[] = [];
  members: any[] = [];
  form: FormGroup;
  criteria: MemberCriteriaModel;
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
    private departmentService: DepartmentService,
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
    this.criteria = new MemberCriteriaModel();
    this.form = this.formBuilder.formGroup(this.criteria);
  }

  private generateTable() {
    this.cols = [
      { field: 'meetingName', header: 'Pages.DepartmentMeetingMemeber.MeetingName' },
      { field: 'departmentName', header: 'Pages.DepartmentMeetingMemeber.DepartmentName' }
    ];
  }

  private generateMenu() {
    this.btnMenuItems = [
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

  deleteById(id: number) {
    this.confirmationService.confirm({
      message: PublicMessage.DeleteSure,
      accept: () => {
        this.setLoading(true);
        this.departmentMemberService.deleteById(id).subscribe(
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
      meetings: this.departmentMeetingService.collection(),
      departments: this.departmentService.getAll(),
      members : this.departmentMemberService.collection(0)
    })
      .subscribe(result => {
        if (result.meetings.success) {
          this.departments = this.mapToSelectItem(result.departments.data, 'name', 'id');
          this.meetings = this.mapToSelectItem(result.meetings.data, 'name', 'id');
          this.members = this.mapToMultiSelectItem(result.members.data, 'name', 'code');
        }
      });
  }

  drpMeetingChange(event: any) {
    if(event.value != null)
    this.departmentMemberService.collection(event.value).subscribe((result: any) => {
      if (result.success) {
        this.form.controls.departmentMemberIds.reset();
        this.members = this.mapToMultiSelectItem(result.data, 'name', 'code');
        this.multiselectDisabled = false;
      }
    });
  }

  loadLazy(event: LazyLoadEvent | null) {
    this.loading = true;

    this.criteria.pageIndex = event ? (event.first / event.rows) : 0;
    this.criteria.pageCount = event ? event.rows : this.rows;
    this.criteria.orderBy = '1';

    debugger;
    if (this.criteria.departmentMemberIds != undefined) {
      const length = this.criteria.departmentMemberIds.length;
      let ids = [];
      for (let index = 0; index < length; index++) {
        const element: any = this.criteria.departmentMemberIds[index];
        ids.push(element.code);
      }
      this.criteria.departmentMemberIds = [];
      this.criteria.departmentMemberIds = ids;
    }

    this.departmentMemberService.getAll(this.criteria).subscribe(
      (result: any) => {
        if (result.success) {
          this.meetingMembers = result.data.rows;
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
    this.departmentMemberService.getAllMembers(item.id).subscribe(
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
