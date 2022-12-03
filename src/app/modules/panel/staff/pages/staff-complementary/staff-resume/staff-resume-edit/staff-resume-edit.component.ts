import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { forkJoin } from 'rxjs';
import { AcademicYearService } from '../../../../../../../../app/modules/panel/base-info/services/academic-year.service';
import { DataService } from '../../../../../../../../app/@core/services';
import { StaffResumeModel } from '../../../../models';
import { StaffResumeService } from '../../../../services/staff-resume.service';
import { BaseComponent } from '../../.././../../../../../app/shared/base/base.component';
import { PositionService } from '../../../../../../../../app/modules/panel/base-info/services/position.service';
import { CooperationTypeService } from '../../../../../../../../app/modules/panel/base-info/services/cooperation-type.service';

@Component({
  selector: 'app-staff-resume-edit',
  templateUrl: './staff-resume-edit.component.html',
  styleUrls: ['./staff-resume-edit.component.scss']
})
export class StaffResumeEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  display: boolean = true;
  staffId: number;
  staffResume: StaffResumeModel;
  id: number;

  workExperienceTypes: any[] = [];
  academicYears: any[] = [];
  positions: any[] = [];
  cooperations: any[] = [];
  activityFields: any[] = [];

  constructor(
    route: ActivatedRoute,
    private staffResumeService: StaffResumeService,
    private dataService: DataService,
    private formBuilder: RxFormBuilder,
    private academicYearService: AcademicYearService,
    private positionService: PositionService,
    private cooperationTypeService: CooperationTypeService
  ) {
    super(route)

    this.staffId = +this.getRouteValue(route, 'staffId');
    this.id = +this.getRouteValue(route, 'id');
  }


  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.staffResume = new StaffResumeModel();
    this.staffResume.staffId = this.staffId;
    this.form = this.formBuilder.formGroup(this.staffResume);

    this.checkDateFromToValidator(this.form, 'startDate', 'endDate');
  }

  cancelClick() {
    this.display = false;
    setTimeout(() => {
      this.navigateTo(['../..']);

    }, 100);
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;

    this.setLoading(true);

    this.staffResumeService.update(this.staffResume).subscribe(result => {
      if (result.success) {
        this.showSuccessMessage(result.message);
        this.setLoading(false);
        this.dataService.sendData(true);
        this.cancelClick();
      }
      else {
        this.showErrorMessage(result.message);
        this.setLoading(false);
      }
    })

  }

  getData() {
    if (this.id === 0 || typeof this.id === 'undefined') {
      this.cancelClick();
    }

    this.setLoading(true);

    forkJoin({
      academicYears: this.academicYearService.getAll(),
      positions: this.positionService.getAll(),
      cooperationTypes: this.cooperationTypeService.getAll(),
      resume: this.staffResumeService.getById(this.id)
    }).subscribe(result => {
      if (result.academicYears.success) {
        this.academicYears = this.mapToSelectItem(result.academicYears.data, 'name', 'id')
      }

      if (result.positions.success) {
        this.positions = this.mapToSelectItem(result.positions.data, 'name', 'id')
      }

      if (result.cooperationTypes.success) {
        this.cooperations = this.mapToSelectItem(result.cooperationTypes.data, 'name', 'id')
      }

      if (result.resume.success) {
        this.form.patchValue({ ...result.resume.data })
      }

      this.setLoading(false)
    })
  }

  get f() {
    return this.form.controls;
  }

}
