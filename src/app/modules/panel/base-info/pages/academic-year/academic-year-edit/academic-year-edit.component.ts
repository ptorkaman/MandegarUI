import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { UpsertUserModel } from '../../../../account/models/upsert-user.model';
import { AcademicYearModel } from '../../../models/academic-year.model';
import { AcademicYearService } from '../../../services/academic-year.service';
import { DataService } from './../../../../../../@core/services/data.service';


@Component({
  selector: "app-academic-year-edit",
  templateUrl: "./academic-year-edit.component.html",
  styleUrls: ["./academic-year-edit.component.scss"],
})
export class AcademicYearEditComponent extends BaseComponent implements OnInit {
  display: boolean = true;
  form: FormGroup;
  formModel: AcademicYearModel;
  model: UpsertUserModel;
  genderSelection = [];
  id: number;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,    
    private dataService: DataService,

    private studyDegreeService: AcademicYearService
  ) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new AcademicYearModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  
  }

  getData() {
    this.setLoading(true);
    this.studyDegreeService.getById(this.id).subscribe(result => {
      this.setLoading(false);
      if (result.success && result.data) {
        this.form.patchValue({
          name: result.data.name,
          fromDate: result.data.fromDate,
          toDate: result.data.toDate
        });
      }
      else {
        this.cancelClick();
        this.setLoading(false);
        this.showErrorMessage(result.message);
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.studyDegreeService.edit(this.formModel).subscribe(result => {
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

  cancelClick() {
    this.display = false;
    setTimeout(() => {
      this.navigateTo(['../..']);

    }, 100);
  }

}
