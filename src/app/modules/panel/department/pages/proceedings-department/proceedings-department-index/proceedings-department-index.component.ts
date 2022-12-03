import { PublicMessage } from './../../../../../../shared/models/public-message.enum';
import { DepartmentMeetingService } from './../../../services/department-meeting.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetFormType, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { forkJoin } from 'rxjs';
import { ProceedingsDepartmentService } from '../../../services/proceedings-department.service';
import { ProceedingDepartmentCriteriaModel } from '../../../models/proceeding-department-criteria-model';

@Component({
  selector: 'app-proceedings-department-index',
  templateUrl: './proceedings-department-index.component.html',
  styleUrls: ['./proceedings-department-index.component.scss']
})
export class ProceedingsDepartmentIndexComponent extends BaseComponent implements OnInit {

  meetings: any[] = [];
  proceedings: [] = [];
  form: FormGroup;
  criteria: ProceedingDepartmentCriteriaModel;
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  btnMenuItems: MenuItem[];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentMeetingService: DepartmentMeetingService,
    private proceedingsDepartmentService: ProceedingsDepartmentService,
    private confirmationService: ConfirmationService) {
    super(route);
  }

  ngOnInit() {
    this.getData();
    this.generateMenu();
    this.generateTable();
    this.generateForm();
  }

  private generateForm() {
    this.criteria = new ProceedingDepartmentCriteriaModel();
    this.form = this.formBuilder.formGroup(this.criteria);
  }

  private generateTable() {
    this.cols = [
      { field: 'departmentMeetingTitle', header: 'Pages.DepartmentMeetingMemeber.MeetingName' },
      { field: 'persianStartDate', header: 'Pages.ProceedingsDepartment.StartDate' },
      { field: 'startTime', header: 'Pages.ProceedingsDepartment.StartTime' },
      { field: 'persianEndDate', header: 'Pages.ProceedingsDepartment.EndDate' },
      { field: 'endTime', header: 'Pages.ProceedingsDepartment.EndTime' }
    ];
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
        this.proceedingsDepartmentService.deleteById(id).subscribe(
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

  loadLazy(event: LazyLoadEvent | null) {
    this.loading = true;

    this.criteria.pageIndex = event ? (event.first / event.rows) : 0;
    this.criteria.pageCount = event ? event.rows : this.rows;
    this.criteria.orderBy = '1';

    if (this.f.startTime.value instanceof Date) {
      let startTime = new Date(this.f.startTime.value);
      this.criteria.startTime = startTime.getHours() + ":" + startTime.getMinutes();
    }
    else {
      this.criteria.startTime = this.f.startTime.value;
    }

    if (this.f.endTime.value instanceof Date) {
      let endTime = new Date(this.f.endTime.value);
      this.criteria.endTime = endTime.getHours() + ":" + endTime.getMinutes();
    }
    else {
      this.criteria.endTime = this.f.endTime.value;
    }

    if(this.criteria.endDate < this.criteria.startDate)
    {
      this.showErrorMessage(PublicMessage.DateEndInvalid)
      this.loading = false;
      return;
    }

    if(this.criteria.startDate > this.criteria.endDate)
    {
      this.showErrorMessage(PublicMessage.DateEndInvalid)
      this.loading = false;
      return;
    }

    this.proceedingsDepartmentService.getAll(this.criteria).subscribe(
      (result: any) => {
        if (result.success) {
          this.proceedings = result.data.rows;
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
