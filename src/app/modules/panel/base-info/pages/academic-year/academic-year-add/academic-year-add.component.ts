import { DataService } from './../../../../../../@core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { AcademicYearModel } from '../../../models/academic-year.model';
import { AcademicYearService } from '../../../services/academic-year.service';



@Component({
  selector: 'app-academic-year-add',
  templateUrl: './academic-year-add.component.html',
  styleUrls: ['./academic-year-add.component.scss']
})
export class AcademicYearAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  formModel: AcademicYearModel;
  genderSelection = [];
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private dataService: DataService,
    private studyDegreeService: AcademicYearService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
  }

  private generateForm() {
    this.formModel = new AcademicYearModel();
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.studyDegreeService.create(this.formModel).subscribe(result => {
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
      this.navigateBack();

    }, 100);
  }
}
