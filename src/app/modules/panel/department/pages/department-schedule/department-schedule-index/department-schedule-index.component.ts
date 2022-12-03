import { DataService } from '../../../../../../@core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder, ResetFormType } from '@rxweb/reactive-form-validators';
import { ConfirmationService, LazyLoadEvent, MenuItem, SelectItem } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { DepartmentScheduleService } from '../../../services/department-schedule.service';
import { ExecutiveCalendarService } from '../../../../base-info/services/executive-calendar.service';
import { DepartmentScheduleCriteriaModel } from '../../../models/department-schedule-criteria-model';

@Component({
  selector: 'app-department-schedule-index',
  templateUrl: './department-schedule-index.component.html',
  styleUrls: ['./department-schedule-index.component.scss']
})
export class DepartmentScheduleIndexComponent extends BaseComponent implements OnInit {

  data: [] = [];
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  form: FormGroup;
  btnMenuItems: MenuItem[];
  executiveCalendarList:SelectItem[] = [];
  criteria: DepartmentScheduleCriteriaModel;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private studyDegreeService: DepartmentScheduleService,
    private dataService: DataService,
    private executiveCalendarService: ExecutiveCalendarService,
    private confirmationService: ConfirmationService) {
    super(route);

    // this.dataService.event.subscribe((result) => {
    //   !!result ? this.loadLazy(null) : null;
    // });

  }
  ngOnInit() {
    this.generateTable();
    this.generateMenu();
    this.getData();
    this.generateForm();
  }
  private generateForm() {
    this.criteria = new DepartmentScheduleCriteriaModel();
    this.form = this.formBuilder.formGroup(this.criteria);
  }
  getData() {
    this.executiveCalendarService.getAll().subscribe(result => {
      this.executiveCalendarList = this.mapToSelectItem(result.data, 'name', 'id');;
    })
  }
  private generateTable() {
    this.cols = [
      { field: 'name', header: 'Public.Name' },
      { field: 'executiveCalendarName', header: 'Pages.DepartmentSchedules.ExecutiveCalendarName' },
      { field: 'timeLimit', header: 'Pages.DepartmentSchedules.TimeLimit' },
      { field: 'fromDate', header: 'Pages.DepartmentSchedules.FromDate' },
      { field: 'toDate', header: 'Pages.DepartmentSchedules.ToDate' }
    ];
  }

  private generateMenu() {
    this.btnMenuItems = [
      {
        label: 'ویرایش',
        // visible: this.hasPermissions(['AccountSubjectEdit']),
        icon: 'pi pi-pencil', command: () => {
          this.navigateTo(['edit', this.selectedRow.id]);
        }
      },
      {
        label: 'حذف',
        // visible: this.hasPermissions(['AccountSubjectDelete']),
        icon: 'pi pi-trash', command: () => {
          this.deleteById(this.selectedRow.id);
        }
      }
    ];
  }

  loadLazy(event: LazyLoadEvent | null) {
    this.loading = true;debugger
    this.criteria.pageIndex = event ? (event.first / event.rows) : 0;
    this.criteria.pageCount = event ? event.rows : this.rows;
    this.criteria.orderBy = '1';
if(this.criteria.executiveCalendarId==null)
this.criteria.executiveCalendarId=0;
    this.studyDegreeService.getAllDepartmentSchedule(this.criteria).subscribe(
      (result: any) => {
        if (result.success) {
          this.data = result.data.rows;
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

  deleteById(id: number) {
    this.confirmationService.confirm({
      message: 'آیا از حذف اطمینان دارید؟',
      accept: () => {
        this.setLoading(true);
        this.studyDegreeService.deletebyId(id).subscribe(
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

  clearForm() {
    this.form.reset({ resetType: ResetFormType.ControlsOnly });
    this.loadLazy(null);
  }

  search() {
    this.loadLazy(null);
  }

  cancelClick() {
    this.navigateTo(['../..']);
  }
}


