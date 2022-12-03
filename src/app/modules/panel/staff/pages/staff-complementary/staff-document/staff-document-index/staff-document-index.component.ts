import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { PageLinks } from '../../../../../../../../app/shared/statics/page-links';
import { BaseComponent } from '../../../../../../../../app/shared/base/base.component';
import { DataService } from '../../../../../../../../app/@core/services';
import { StaffEducationDocumentService } from '../../../../services/staff-education-document.service';
@Component({
  selector: 'app-staff-document-index',
  templateUrl: './staff-document-index.component.html',
  styleUrls: ['./staff-document-index.component.scss']
})
export class StaffDocumentIndexComponent extends BaseComponent implements OnInit {
  family: any[] = [];
  staffId: number;
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  btnMenuItems: MenuItem[];

  constructor(route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private staffEducationService: StaffEducationDocumentService,
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
      { field: 'educationName', header: 'Pages.Staff.EducationType' },
      { field: 'institutionName', header: 'Pages.Staff.InstitutionName' },
      { field: 'courseName', header: 'Pages.Staff.CourseName' },
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
        this.staffEducationService.deletebyId(id).subscribe(
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
    this.staffEducationService.getAll(this.staffId).subscribe(res => {
      if (res.success) {
        this.family = res.data;
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
