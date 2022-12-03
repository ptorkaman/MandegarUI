import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { StudyDegreeModel } from '../../../models/study-degree.model';
import { StudyDegreeService } from '../../../services/study-degree.service';
import { DataService } from './../../../../../../@core/services/data.service';



@Component({
  selector: 'app-study-degree-add',
  templateUrl: './study-degree-add.component.html',
  styleUrls: ['./study-degree-add.component.scss']
})
export class StudyDegreeAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  studyDegreeFormModel: StudyDegreeModel;
  roleList = [];
  genderSelection = [];
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,    
    private dataService: DataService,
    private studyDegreeService: StudyDegreeService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
  }

  private generateForm() {
    this.studyDegreeFormModel = new StudyDegreeModel();
    this.form = this.formBuilder.formGroup(this.studyDegreeFormModel);
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.studyDegreeService.create(this.studyDegreeFormModel).subscribe(result => {
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
