import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { UpsertUserModel } from '../../../../account/models/upsert-user.model';
import { StudyGradeModel } from '../../../models/study-grade.model';
import { StudyDegreeService } from '../../../services/study-degree.service';
import { StudyFieldService } from '../../../services/study-field.service';
import { StudyGradeService } from '../../../services/study-grade.service';
import { DataService } from './../../../../../../@core/services/data.service';


@Component({
  selector: "app-study-grade-edit",
  templateUrl: "./study-grade-edit.component.html",
  styleUrls: ["./study-grade-edit.component.scss"],
})
export class StudyGradeEditComponent extends BaseComponent implements OnInit {
  display: boolean = true;
  form: FormGroup;
  formModel: StudyGradeModel;
  model: UpsertUserModel;
  genderSelection = [];
  id: number;
  studyFieldList:SelectItem[]=[];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private studyFieldService: StudyFieldService,    private dataService: DataService,

    private studyGradeService:StudyGradeService
  ) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new StudyGradeModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    this.setLoading(true);
    forkJoin({
      studyFields: this.studyFieldService.getAll(),
      studyField: this.studyGradeService.getById(this.id)
    }).subscribe(result => {
      if (result.studyFields.success) {
        this.studyFieldList = this.mapToSelectItem(result.studyFields.data, 'name', 'id');
      }

      if (result.studyField.success) {
        this.form.patchValue({
          name: result.studyField.data.name,
          studyFieldId: result.studyField.data.studyFieldId,
          educationBasicCode: result.studyField.data.educationBasicCode,
          id: result.studyField.data.id,
        });
      }

      this.setLoading(false);
    });
   }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.studyGradeService.edit(this.formModel).subscribe(result => {
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
