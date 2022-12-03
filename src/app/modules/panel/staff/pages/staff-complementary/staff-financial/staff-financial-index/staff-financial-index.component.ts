import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { PageLinks } from '../../../../../../../../app/shared/statics/page-links';
import { BaseComponent } from '../../../../../../../../app/shared/base/base.component';
import { StaffFinancialService } from '../../../../services/staff-financial.service';
import { DataService } from '../../../../../../../../app/@core/services';

@Component({
  selector: 'app-staff-financial-index',
  templateUrl: './staff-financial-index.component.html',
  styleUrls: ['./staff-financial-index.component.scss']
})
export class StaffFinancialIndexComponent extends BaseComponent implements OnInit {
  financials: any[] = [];
  staffId: number;
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  btnMenuItems: MenuItem[];

  constructor(route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private staffFinancialStaffService: StaffFinancialService,
    private dataService: DataService) {
    super(route);
    this.staffId = this.getRouteValue(route, 'staffId');

    this.dataService.event.subscribe((result) => {
      !!result ? this.getData() : null;
    });
  }

  ngOnInit() {
    this.generateTable();
    this.generateMenu();
    this.getData();
  }

  private generateTable() {
    this.cols = [
      { field: 'bankName', header: 'Public.Bank' },
      { field: 'branchName', header: 'Public.Branch' },
      { field: 'accountNumber', header: 'Public.AccountNumber' },
      { field: 'sheba', header: 'Public.Sheba' },
    ];
  }

  rowBtnClick(menu, rowData, event) {
    this.selectedRow = rowData;
    menu.toggle(event);
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

  deleteById(id: number) {
    this.confirmationService.confirm({
      message: 'آیا از حذف اطمینان دارید؟',
      accept: () => {
        this.setLoading(true);
        this.staffFinancialStaffService.deletebyId(id).subscribe(
          result => {
            if (result.success) {
              this.showSuccessMessage(result.message)
              this.getData();
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

  getData() {
    this.setLoading(true);
    this.staffFinancialStaffService.getAll(this.staffId).subscribe(res => {
      if (res.success) {
        this.financials = res.data;
        this.rows = res.data.length;
      }
      this.setLoading(false);
    });
  }

  cancelClick() {
    this.navigateBack();
  }

  navigateToAdd() {
    this.navigateTo([PageLinks.AddPage]);
  }
}
