import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SelectItem } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { StudyFieldModel } from '../../../models/study-field.model';
import { StudyDegreeService } from '../../../services/study-degree.service';
import { StudyFieldService } from '../../../services/study-field.service';
import { DataService } from './../../../../../../@core/services/data.service';

@Component({
  selector: 'app-study-field-add',
  templateUrl: './study-field-add.component.html',
  styleUrls: ['./study-field-add.component.scss']
})
export class StudyFieldAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  studyFieldFormModel: StudyFieldModel;
  genderSelection = [];
  display: boolean = true;
  studyDegreeList:SelectItem[]=[];
  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private studyFieldService: StudyFieldService,
    private dataService: DataService,
    private studyDegreeService: StudyDegreeService
    
    ) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }
  getData() {
    this.studyDegreeService.getAll().subscribe(result => {
      this.studyDegreeList = this.mapToSelectItem(result.data, 'name', 'id');;
    })
  }
  private generateForm() {
    this.studyFieldFormModel = new StudyFieldModel();
    this.form = this.formBuilder.formGroup(this.studyFieldFormModel);
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.studyFieldService.create(this.studyFieldFormModel).subscribe(result => {
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
