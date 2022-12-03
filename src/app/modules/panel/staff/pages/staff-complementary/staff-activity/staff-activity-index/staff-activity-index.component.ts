import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { PageLinks } from '../../../../../../../../app/shared/statics/page-links';
import { BaseComponent } from '../../../../../../../../app/shared/base/base.component';
import { DataService } from '../../../../../../../../app/@core/services';
import { StaffActivityService } from '../../../../services/staff-activity.service';

@Component({
  selector: 'app-staff-activity-index',
  templateUrl: './staff-activity-index.component.html',
  styleUrls: ['./staff-activity-index.component.scss']
})
export class StaffActivityIndexComponent extends BaseComponent implements OnInit {
  activities: any[] = [];
  staffId: number;
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  btnMenuItems: MenuItem[];

  constructor(route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private staffActivityService: StaffActivityService,
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
      { field: 'activityTypeName', header: 'Pages.Staff.ActivityTypeName' },
      { field: 'name', header: 'Public.Title' },
      { field: 'subject', header: 'Public.Subject' },
      { field: 'publicationDate', header: 'Pages.Staff.PublicationDate' },
      { field: 'publicationName', header: 'Pages.Staff.PublicationName' },
      { field: 'activityCaseName', header: 'Pages.Staff.ActivityCaseName' },
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
        this.staffActivityService.deletebyId(id).subscribe(
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
    this.staffActivityService.getAll(this.staffId).subscribe(res => {
      if (res.success) {
        this.activities = res.data;
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
