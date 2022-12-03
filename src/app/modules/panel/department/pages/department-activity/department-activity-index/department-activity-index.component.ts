import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetFormType } from '@rxweb/reactive-form-validators';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { DepartmentActivityService } from '../../../services/department-activity.service';

@Component({
  selector: 'app-department-activity-index',
  templateUrl: './department-activity-index.component.html',
  styleUrls: ['./department-activity-index.component.scss']
})
export class DepartmentActivityIndexComponent extends BaseComponent implements OnInit {

  data: [] = [];
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  form: FormGroup;
  btnMenuItems: MenuItem[];

  constructor(route: ActivatedRoute,
    private departmentActivityService: DepartmentActivityService,
    private confirmationService: ConfirmationService) {
    super(route);
  }
  ngOnInit() {
    this.generateTable();
    this.generateMenu();
    this.getData();
  }

  private generateTable() {
    this.cols = [
      { field: 'name', header: 'Public.Name' },
      { field: 'departmentName', header: 'Pages.DepartmentActivitys.Department' },
      { field: 'activityDescription', header: 'Pages.DepartmentActivitys.ActivityDescription' },
      { field: 'description', header: 'Pages.DepartmentActivitys.Description' }

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

  getData() {
    this.departmentActivityService.getAll().subscribe(
      (result: any) => {
        if (result.success) {
          this.data = result.data;

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
        this.departmentActivityService.deletebyId(id).subscribe(
          result => {
            if (result.success) {
              this.showSuccessMessage(result.message)
              this.setLoading(false);
              this.getData();
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

  clearForm() {
    this.form.reset({ resetType: ResetFormType.ControlsOnly });
    this.getData();
  }

  search() {
    this.getData();
  }

  cancelClick() {
    this.navigateTo(['../..']);
  }
}


