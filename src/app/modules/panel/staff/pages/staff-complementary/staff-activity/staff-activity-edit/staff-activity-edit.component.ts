import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { DataService } from '../../../../../../../../app/@core/services';
import { BaseComponent } from '../../../../../../../../app/shared/base/base.component';
import { StaffActivityModel } from '../../../../models';
import { StaffActivityService } from '../../../../services/staff-activity.service';
import { forkJoin } from 'rxjs';
import { ActivityCaseService } from '../../../../../../../../app/modules/panel/base-info/services/activity-case.service';


@Component({
  selector: 'app-staff-activity-edit',
  templateUrl: './staff-activity-edit.component.html',
  styleUrls: ['./staff-activity-edit.component.scss']
})
export class StaffActivityEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  display: boolean = true;
  staffActivity: StaffActivityModel;
  staffId: number;
  id: number;
  activityTypes: any[] = [];
  activityCases: any[] = [];

  constructor(route: ActivatedRoute,
    private dataService: DataService,
    private formBuilder: RxFormBuilder,
    private staffActivityService: StaffActivityService,
    // private activityTypeService: ActivityTypeService,
    private activityCaseService: ActivityCaseService) {
    super(route);

    this.staffId = +this.getRouteValue(route, 'staffId');
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.staffActivity = new StaffActivityModel();
    this.staffActivity.staffId = this.staffId;
    this.form = this.formBuilder.formGroup(this.staffActivity);
  }

  getData() {
    this.setLoading(true);

    forkJoin({
      // activityTypes: this.activityTypes.getAll(),
      activityCases: this.activityCaseService.getAll(),
      activity: this.staffActivityService.getById(this.id)
    })
      .subscribe(result => {
        // if (result.activityTypes.success) {
        //   this.activityTypes = this.mapToSelectItem(result.activityTypes.data, 'name', 'id')
        // }

        if (result.activityCases.success) {
          this.activityCases = this.mapToSelectItem(result.activityCases.data, 'name', 'id')
        }

        if (result.activity.success) {
          this.form.patchValue({ ...result.activity.data })
        }

        this.setLoading(false)
      })

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

    this.staffActivityService.update(this.staffActivity).subscribe(result => {
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

  get f() {
    return this.form.controls;
  }
}
