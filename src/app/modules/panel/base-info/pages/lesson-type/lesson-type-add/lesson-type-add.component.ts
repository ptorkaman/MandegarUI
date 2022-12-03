import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { LessonTypeModel } from '../../../models/lesson-type.model';
import { LessonTypeService } from '../../../services/lesson-type.service';
import { DataService } from './../../../../../../@core/services/data.service';



@Component({
  selector: 'app-lesson-type-add',
  templateUrl: './lesson-type-add.component.html',
  styleUrls: ['./lesson-type-add.component.scss']
})
export class LessonTypeAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  taskGroupFormModel: LessonTypeModel;
  roleList = [];
  genderSelection = [];
  display: boolean = true;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,    private dataService: DataService,

    private taskGroupService: LessonTypeService) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
  }

  private generateForm() {
    this.taskGroupFormModel = new LessonTypeModel();
    this.form = this.formBuilder.formGroup(this.taskGroupFormModel);
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.taskGroupService.create(this.taskGroupFormModel).subscribe(result => {
      if (result.success) {
        this.showSuccessMessage(result.message);
        this.setLoading(false);        this.dataService.sendData(true);

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
