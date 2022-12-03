import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { forkJoin } from 'rxjs';
import { DataService } from '../../../../../../../../app/@core/services';
import { BaseComponent } from '../../../../../../../../app/shared/base/base.component';
import { StaffFamilyInformationModel } from '../../../../models';
import { StaffFamilyService } from '../../../../services/staff-family.service';

@Component({
  selector: 'app-staff-family-edit',
  templateUrl: './staff-family-edit.component.html',
  styleUrls: ['./staff-family-edit.component.scss']
})
export class StaffFamilyEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  display: boolean = true;
  staffFamily: StaffFamilyInformationModel;
  staffId: number;
  id: number;
  relations: any[] = [];
  maritalStatuses: any[] = [];
  educations: any[] = [];

  constructor(route: ActivatedRoute,
    private dataService: DataService,
    private formBuilder: RxFormBuilder,
    private staffFamilyService: StaffFamilyService) {
    super(route);

    this.staffId = +this.getRouteValue(route, 'staffId');
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.staffFamily = new StaffFamilyInformationModel();
    this.staffFamily.id = this.id;
    this.staffFamily.staffId = this.staffId;
    this.form = this.formBuilder.formGroup(this.staffFamily);
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

    this.staffFamilyService.update(this.staffFamily).subscribe(result => {
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
    forkJoin({
      family: this.staffFamilyService.getById(this.id)
    })
      .subscribe(result => {
        if (result.family.success) {
          this.form.patchValue({ ...result.family.data });
        }

      })
  }

  get f() {
    return this.form.controls;
  }
}
