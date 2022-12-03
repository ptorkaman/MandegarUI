import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SelectItem } from 'primeng/api';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { LessonModel } from '../../../models/lesson.model';
import { LessonTypeService } from '../../../services/lesson-type.service';
import { LessonService } from '../../../services/lesson.service';
import { DataService } from './../../../../../../@core/services/data.service';
import { StudyGradeService } from '../../../services/study-grade.service';



@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.scss']
})
export class LessonAddComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  studyGradeFormModel: LessonModel;
  genderSelection = [];
  display: boolean = true;
  studyGradeList:SelectItem[]=[];
  lessonTypeList:SelectItem[]=[];
  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private lessonService: LessonService,
    private dataService: DataService,
    private studyGradeService: StudyGradeService,
    private lessonTypeService: LessonTypeService

    ) {
    super(route);
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }
  getData() {
    this.studyGradeService.getAll().subscribe(result => {
      this.studyGradeList = this.mapToSelectItem(result.data, 'name', 'id');;
    })
    this.lessonTypeService.getAll().subscribe(result => {
      this.lessonTypeList = this.mapToSelectItem(result.data, 'name', 'id');;
    })

  }
  private generateForm() {
    this.studyGradeFormModel = new LessonModel();
    this.form = this.formBuilder.formGroup(this.studyGradeFormModel);
  }

  get f() {
    return this.form.controls;
  }

  acceptClick() {
    this.submitForm(this.form);
    if (!this.form.valid) return;
    this.setLoading(true);

    this.lessonService.create(this.studyGradeFormModel).subscribe(result => {
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
