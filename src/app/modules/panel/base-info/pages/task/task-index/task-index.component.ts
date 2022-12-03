import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResetFormType } from '@rxweb/reactive-form-validators';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { TaskService } from '../../../services/task.service';
import { DataService } from './../../../../../../@core/services/data.service';

@Component({
  selector: 'app-task-index',
  templateUrl: './task-index.component.html',
  styleUrls: ['./task-index.component.scss']
})
export class TaskIndexComponent extends BaseComponent implements OnInit {

  data: [] = [];
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  form: FormGroup;
  btnMenuItems: MenuItem[];

  constructor(route: ActivatedRoute,
    private taskService: TaskService,    private dataService: DataService,

    private confirmationService: ConfirmationService) {
    super(route);
    this.dataService.event.subscribe((result) => {
      !!result ? this.loadLazy(null) : null;
    });
  }
  ngOnInit() {
    this.generateTable();
    this.generateMenu();
    this.getData();
  }

  private generateTable() {
    this.cols = [
      { field: 'name', header: 'Public.Name' },
      { field: 'taskGroupName', header: 'Pages.Tasks.TaskGroup' }

    ];
  }
  loadLazy(event: LazyLoadEvent | null) {
    this.loading = true;
    this.taskService.getAll().subscribe(
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
    this.taskService.getAll().subscribe(
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
        this.taskService.deletebyId(id).subscribe(
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


