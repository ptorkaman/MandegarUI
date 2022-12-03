import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SelectItem } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { StudyGradeModel } from '../../../models/study-grade.model';
import { StudyFieldService } from '../../../services/study-field.service';
import { StudyGradeService } from '../../../services/study-grade.service';
import { DataService } from './../../../../../../@core/services/data.service';



@Component({
  selector: 'app-study-grade-add',
  templateUrl: './study-grade-add.component.html',
  styleUrls: ['./study-grade-add.component.scss']
})
export class StudyGradeAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  studyFieldFormModel: StudyGradeModel;
  genderSelection = [];
  display: boolean = true;
  studyFieldList:SelectItem[]=[];
  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private studyGradeService: StudyGradeService,    
    private dataService: DataService,

    private studyFieldService: StudyFieldService

    ) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }
  getData() {
    this.studyFieldService.getAll().subscribe(result => {
      this.studyFieldList = this.mapToSelectItem(result.data, 'name', 'id');;
    })
  }
  private generateForm() {
    this.studyFieldFormModel = new StudyGradeModel();
    this.form = this.formBuilder.formGroup(this.studyFieldFormModel);
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.studyGradeService.create(this.studyFieldFormModel).subscribe(result => {
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
