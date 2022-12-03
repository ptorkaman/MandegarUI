import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { SelectItem } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { UpsertUserModel } from '../../../../account/models/upsert-user.model';
import { LessonModel } from '../../../models/lesson.model';
import { LessonTypeService } from '../../../services/lesson-type.service';
import { LessonService } from '../../../services/lesson.service';
import { DataService } from './../../../../../../@core/services/data.service';
import { StudyGradeService } from '../../../services/study-grade.service';


@Component({
  selector: "app-lesson-edit",
  templateUrl: "./lesson-edit.component.html",
  styleUrls: ["./lesson-edit.component.scss"],
})
export class LessonEditComponent extends BaseComponent implements OnInit {
  display: boolean = true;
  form: FormGroup;
  formModel: LessonModel;
  model: UpsertUserModel;
  genderSelection = [];
  id: number;
  studyGradeList:SelectItem[]=[];
  lessonTypeList:SelectItem[]=[];

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private studyGradeService: StudyGradeService,    private dataService: DataService,

    private lessonService:LessonService,
    private lessonTypeService: LessonTypeService

  ) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');
  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new LessonModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }

  getData() {
    this.setLoading(true);
    forkJoin({
      studyGrades: this.studyGradeService.getAll(),
      lessonTypes:this.lessonTypeService.getAll(),
      lesson: this.lessonService.getById(this.id)
    }).subscribe(result => {
      if (result.studyGrades.success) {
        this.studyGradeList = this.mapToSelectItem(result.studyGrades.data, 'name', 'id');
      }
      if (result.lessonTypes.success) {
        this.lessonTypeList = this.mapToSelectItem(result.lessonTypes.data, 'name', 'id');
      }
      if (result.lesson.success) {
        this.form.patchValue({
          name: result.lesson.data.name,
          studyGradeId: result.lesson.data.studyGradeId,
          lessonTypeId: result.lesson.data.lessonTypeId,
          educationCourseCode: result.lesson.data.educationCourseCode,
          id: result.lesson.data.id,
          courseUnits: result.lesson.data.courseUnits,
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

    this.lessonService.edit(this.formModel).subscribe(result => {
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
      this.navigateTo(['../..']);

    }, 100);
  }

}
