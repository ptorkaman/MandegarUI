import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { RolesService } from '../../../services/roles.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { RoleModel } from '../../../models/role.model';

@Component({
  selector: 'app-role-index',
  templateUrl: './role-index.component.html',
  styleUrls: ['./role-index.component.scss']
})
export class RoleIndexComponent extends BaseComponent implements OnInit {

  roles: RoleModel[] = [];
  cols: any[] = [];
  btnMenuItems: MenuItem[];
  selectedRow: any;

  constructor(route: ActivatedRoute,
    private roleService: RolesService,
    private confirmationService: ConfirmationService,) {
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
    ];
  }

  private generateMenu() {
    this.btnMenuItems = [
      {
        label: 'ویرایش',
        // visible: this.hasPermissions(['RoleUserEdit']),
        icon: 'pi pi-pencil', command: () => {
          this.navigateTo(['edit', this.selectedRow.id])
        }
      },
      {
        label: 'حذف',
        // visible: this.hasPermissions(['RoleUserDelete']),
        icon: 'pi pi-trash', command: () => {
          this.deleteById(this.selectedRow.id);
        }
      }
    ];
  }

  rowBtnClick(menu, rowData, event) {
    this.selectedRow = rowData;
    menu.toggle(event);
  }

  getData() {
    this.setLoading(true);
    this.roleService.getAll().subscribe(
      result => {
        this.setLoading(false);
        this.roles = result.data;
      },
      (err) => {
        this.showErrorMessage('ارتباط برقرار نشد');
      }
    )
  }

  deleteById(id: number) {
    this.confirmationService.confirm({
      message: 'آیا از حذف اطمینان دارید؟',
      accept: () => {
        this.setLoading(true);
        this.roleService.deletebyId(id).subscribe(
          result => {
            if (result.success) {
              this.showSuccessMessage(result.message)
              this.setLoading(false);
              this.getData();
            }
          }
        );
      },
    });
  }

  navigateToAdd() {
    this.navigateTo(['add']);
  }
}
