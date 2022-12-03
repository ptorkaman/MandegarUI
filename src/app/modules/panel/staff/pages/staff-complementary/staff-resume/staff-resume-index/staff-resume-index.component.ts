import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { PageLinks } from '../../../../../../../../app/shared/statics/page-links';
import { BaseComponent } from '../../../../../../../../app/shared/base/base.component';
import { StaffResumeService } from '../../../../services/staff-resume.service';
import { DataService } from '../../../../../../../../app/@core/services';

@Component({
  selector: 'app-staff-resume-index',
  templateUrl: './staff-resume-index.component.html',
  styleUrls: ['./staff-resume-index.component.scss']
})
export class StaffResumeIndexComponent extends BaseComponent implements OnInit {
  resumes: any[] = [];
  staffId: number;
  totalRecords = 0;
  rows = 10;
  cols: any[];
  selectedRow: any;
  loading: boolean;
  btnMenuItems: MenuItem[];
  genders = [];

  constructor(route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private staffResumeService: StaffResumeService,
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
      { field: 'workExperienceTypeName', header: 'Pages.Staff.WorkExperienceType' },
      { field: 'academicYearName', header: 'Pages.AcademicYears.AcademicYear' },
      { field: 'positionName', header: 'Pages.DepartmentMembers.Position' },
      { field: 'cooperationTypeName', header: 'Pages.CooperationTypes.CooperationType' },
      { field: 'workPlaceName', header: 'Pages.Staff.WorkPlaceName' },
      { field: 'startDate', header: 'Pages.ProceedingsDepartment.StartDate' },
      { field: 'endDate', header: 'Pages.ProceedingsDepartment.EndDate' },
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
        this.staffResumeService.deletebyId(id).subscribe(
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
    this.staffResumeService.getAll(this.staffId).subscribe(res => {
      if (res.success) {
        this.resumes = res.data;
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
