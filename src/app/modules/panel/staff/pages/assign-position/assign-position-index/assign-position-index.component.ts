import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder, ResetFormType } from '@rxweb/reactive-form-validators';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { AssignPositionService } from '../../../services/assign-position.service';
import { DataService } from '../../../../../../@core/services/data.service';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-assign-position-index',
  templateUrl: './assign-position-index.component.html',
  styleUrls: ['./assign-position-index.component.scss']
})
export class AssignPositionIndexComponent extends BaseComponent implements OnInit {

  data: [] = [];
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  form: FormGroup;
  btnMenuItems: MenuItem[];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private positionGroupService: AssignPositionService,
    private staffService: StaffService,
    private dataService: DataService,

    private confirmationService: ConfirmationService) {
    super(route);
    this.dataService.event.subscribe((result) => {
      !!result ? this.loadLazy(null) : null;
    });
  }
  ngOnInit() {
    this.generateTable();
    this.generateMenu();
    this.loadLazy(null);
  }


  private generateTable() {
    this.cols = [
      { field: 'fullName', header: 'Pages.AssignPositions.Staff' },
      { field: 'positionTitle', header: 'Pages.AssignPositions.Position' }
    ];
  }

  private generateMenu() {
    this.btnMenuItems = [
      // {
      //   label: 'ویرایش',
      //   // visible: this.hasPermissions(['AccountSubjectEdit']),
      //   icon: 'pi pi-pencil', command: () => {
      //     this.navigateTo(['edit', this.selectedRow.id]);
      //   }
      // },
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
    this.staffService.getAllStaffBaseInfo().subscribe(
      (result: any) => {
        if (result.success) {
          this.data = result.data;
          this.totalRecords = result.data.length;
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
        this.positionGroupService.deletebyId(id).subscribe(
          result => {
            if (result.success) {
              this.showSuccessMessage(result.message)
              this.setLoading(false);
              this.loadLazy(null);
            }
            else {
              this.showErrorMessage(result.message);
              this.setLoading(false);
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


