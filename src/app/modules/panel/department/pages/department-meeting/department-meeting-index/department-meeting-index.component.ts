import { PublicMessage } from './../../../../../../shared/models/public-message.enum';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetFormType, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { DepartmentMeetingCriteriaModel } from '../../../models/department-meeting-criteria-model';
import { forkJoin } from 'rxjs';
import { DepartmentScheduleService } from '../../../services/department-schedule.service';
import { DepartmentMeetingService } from '../../../services/department-meeting.service';
@Component({
  selector: 'app-department-meeting-index',
  templateUrl: './department-meeting-index.component.html',
  styleUrls: ['./department-meeting-index.component.scss']
})
export class DepartmentMeetingIndexComponent extends BaseComponent implements OnInit {

  meetings: [] = [];
  form: FormGroup;
  criteria: DepartmentMeetingCriteriaModel;
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  btnMenuItems: MenuItem[];
  schedules: any[] = [];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private scheduleService: DepartmentScheduleService,
    private departmentMeetingService: DepartmentMeetingService,
    private confirmationService: ConfirmationService) {
    super(route);
  }

  ngOnInit() {
    this.generateTable();
    this.generateForm();
    this.generateMenu();
    this.getData();
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
        this.departmentMeetingService.deleteById(id).subscribe(
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

  getData() {
    forkJoin({
      schedules: this.scheduleService.getAll()
    })
      .subscribe(result => {
        if (result.schedules.success) {
          this.schedules = this.mapToSelectItem(result.schedules.data, 'name', 'id')
        }
      });
  }

  private generateForm() {
    this.criteria = new DepartmentMeetingCriteriaModel();
    this.form = this.formBuilder.formGroup(this.criteria);
  }

  private generateTable() {
    this.cols = [
      { field: 'name', header: 'Pages.DepartmentMeeting.Name' },
      { field: 'departmentScheduleName', header: 'Pages.DepartmentMeeting.DepartmentScheduleId' },
      { field: 'persianDate', header: 'Pages.DepartmentMeeting.MeetingDate' },
      { field: 'time', header: 'Pages.DepartmentMeeting.MeetingTime' }
    ];
  }

  loadLazy(event: LazyLoadEvent | null) {
    this.loading = true;

    this.criteria.pageIndex = event ? (event.first / event.rows) : 0;
    this.criteria.pageCount = event ? event.rows : this.rows;
    this.criteria.orderBy = '1';

    if (this.f.meetingTime.value !== null && this.f.meetingTime.value != undefined) {
      let date = new Date(this.f.meetingTime.value);
      this.criteria.time = "";
      this.criteria.time = date.getHours() + ":" + date.getMinutes();
    }

    if (this.f.meetingTime.value !== null && this.criteria.meetingDate == null) {
      this.showErrorMessage(PublicMessage.NoRecordsFound);
      this.loading = false;
      return false;
    }

    this.departmentMeetingService.getAll(this.criteria).subscribe(
      (result: any) => {
        if (result.success) {
          this.meetings = result.data.rows;
          this.totalRecords = result.data.total;
          this.loading = false;
        }
        else {
          this.loading = false;
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
