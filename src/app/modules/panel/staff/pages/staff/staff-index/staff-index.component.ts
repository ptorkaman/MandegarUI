import { DepartmentService } from '../../../../base-info/services/department.service';
import { forkJoin } from 'rxjs';
import { PositionService } from '../../../../base-info/services/position.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetFormType, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MenuItem, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { StaffCriteria } from '../../../models';
import { StaffService } from '../../../services/staff.service';
import { CooperationTypeService } from '../../../../base-info/services/cooperation-type.service';

@Component({
  selector: 'app-staff-index',
  templateUrl: './staff-index.component.html',
  styleUrls: ['./staff-index.component.scss']
})
export class StaffIndexComponent extends BaseComponent implements OnInit {

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  staff: any[] = [];
  positions: any[] = [];
  departments: any[] = [];
  cooperations: any[] = [];

  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  form: FormGroup;
  btnMenuItems: MenuItem[];

  criteria: StaffCriteria;
  genders = [];

  _selectedColumns: any[];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private confirmationService: ConfirmationService,
    private staffService: StaffService,
    private positionService: PositionService,
    private departmentService: DepartmentService,
    private cooperationTyeService: CooperationTypeService) {
    super(route);

  }
  ngOnInit() {
    this.generateTable();
    this.generateForm();
    this.generateMenu();
    this.getData();
  }


  private generateForm() {
    this.criteria = new StaffCriteria();
    this.form = this.formBuilder.formGroup(this.criteria);
  }

  private generateTable() {
    this.cols = [
      { field: 'image', header: 'تصویر', order: '1', pHeader: 'تصویر' },
      { field: 'name', header: 'نام', order: '1', pHeader: 'نام' },
      { field: 'family', header: 'نام خانوادگی', order: '2', pHeader: 'نام خانوادگی' },
      { field: 'nationalCode', header: 'Pages.User.NationalCode', order: '3', pHeader: 'کد ملی' },
      { field: 'personneliCode', header: 'Public.PersonneliCode', order: '4', pHeader: 'کد پرسنلی' },
      { field: 'positionName', header: 'Public.Position', order: '5', pHeader: 'سمت' },
      { field: 'cooperationTypeName', header: 'Public.CooperationType', order: '6', pHeader: 'نوع همکاری' },
      { field: 'cooperationEndDate', header: 'Public.CooperationEndDate', order: '7', pHeader: 'پایان همکاری' },
      { field: 'status', header: 'Public.Status', order: '8', pHeader: 'وضعیت' }
    ];

    this._selectedColumns = this.cols;
  }

  private generateMenu() {
    this.btnMenuItems = [
      {
        label: 'اطلاعات تکمیلی',
        // visible: this.hasPermissions(['AccountSubjectEdit']),
        icon: 'pi pi-plus-circle', command: () => {
          this.navigateTo(['staff-complementary', this.selectedRow.id]);
        }
      },
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
    this.loading = true;
    this.criteria.pageIndex = event ? (event.first / event.rows) : 0;
    this.criteria.pageCount = event ? event.rows : this.rows;

    this.criteria.orderBy = (event && event.sortField) ? this.getOrderByHeader(event.sortField) : '1';
    this.criteria.orderAsc = (event && event.sortOrder == 1) ? true : false;

    this.staffService.getAll(this.criteria).subscribe(
      (result: any) => {
        if (result.success) {
          this.staff = result.data.rows;
          this.totalRecords = result.data.total;
          this.loading = false;
        }
        else {
          this.loading = false;
        }
      }
    );
  }

  getData() {
    this.setLoading(true);
    this.genders.push(
      { value: true, label: 'مرد' },
      { value: false, label: 'زن' }
    );

    forkJoin({
      positions: this.positionService.getAll(),
      departments: this.departmentService.getAll(),
      cooperations: this.cooperationTyeService.getAll(),

    })
      .subscribe(result => {
        if (result.positions.success) {
          this.positions = this.mapToSelectItem(result.positions.data, 'name', 'id')
        }

        if (result.departments.success) {
          this.departments = this.mapToSelectItem(result.departments.data, 'name', 'id')
        }

        if (result.cooperations.success) {
          this.cooperations = this.mapToSelectItem(result.cooperations.data, 'name', 'id')
        }

        this.setLoading(false)
      });

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
        this.staffService.deletebyId(id).subscribe(
          result => {
            if (result.success) {
              this.showSuccessMessage(result.message)
              this.loadLazy(null);
            }
            else {
              this.showErrorMessage(result.message)
            }
            this.setLoading(false);

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


  getOrderByHeader(header: string) {
    var row = this.cols.find(c => c.header == header);
    return row.order;
  }

  set selectedColumns(val: any[]) {
    debugger
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

}
