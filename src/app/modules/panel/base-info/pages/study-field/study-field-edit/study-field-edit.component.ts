import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { UpsertUserModel } from '../../../../account/models/upsert-user.model';
import { StudyFieldModel } from '../../../models/study-field.model';
import { StudyDegreeService } from '../../../services/study-degree.service';
import { StudyFieldService } from '../../../services/study-field.service';
import { DataService } from './../../../../../../@core/services/data.service';


@Component({
  selector: "app-study-field-edit",
  templateUrl: "./study-field-edit.component.html",
  styleUrls: ["./study-field-edit.component.scss"],
})
export class StudyFieldEditComponent extends BaseComponent implements OnInit {
  display: boolean = true;
  form: FormGroup;
  formModel: StudyFieldModel;
  model: UpsertUserModel;
  genderSelection = [];
  id: number;
  studyDegreeList:SelectItem[]=[];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private studyFieldService: StudyFieldService,
    private dataService: DataService,

    private studyDegreeService:StudyDegreeService
  ) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new StudyFieldModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    this.setLoading(true);
    forkJoin({
      studyDegrees: this.studyDegreeService.getAll(),
      studyField: this.studyFieldService.getById(this.id)
    }).subscribe(result => {
      if (result.studyDegrees.success) {
        this.studyDegreeList = this.mapToSelectItem(result.studyDegrees.data, 'name', 'id');
      }

      if (result.studyField.success) {
        this.form.patchValue({
          name: result.studyField.data.name,
          // studyDefreeId: result.studyField.data.studyDefreeId,
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

    this.studyFieldService.edit(this.formModel).subscribe(result => {
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
