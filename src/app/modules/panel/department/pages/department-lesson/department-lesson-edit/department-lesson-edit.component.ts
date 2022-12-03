import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { DepartmentLessonModel } from '../../../models/department-lesson.model';
import { DepartmentLessonService } from '../../../services/department-lesson.service';
import { DepartmentService } from '../../../services/department.service';
import { forkJoin } from 'rxjs';
import { LessonService } from '../../../../base-info/services/lesson.service';
import { DataService } from './../../../../../../@core/services/data.service';

@Component({
  selector: 'app-department-lesson-edit',
  templateUrl: './department-lesson-edit.component.html',
  styleUrls: ['./department-lesson-edit.component.scss']
})
export class DepartmentLessonEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  formModel: DepartmentLessonModel;
  genderSelection = [];
  display: boolean = true;
  departmentList=[];
  lessonList=[];
  positionList=[];
  id: number;

  constructor(route: ActivatedRoute,
    private formBuilder: RxFormBuilder,
    private departmentService: DepartmentService,
    private lessonService: LessonService,    private dataService: DataService,

    private departmentLessonService: DepartmentLessonService
    ) {
    super(route);
    this.id = +this.getRouteValue(route, 'id');

  }

  ngOnInit() {
    this.generateForm();
    this.getData();
  }

  private generateForm() {
    this.formModel = new DepartmentLessonModel();
    this.formModel.id = this.id;
    this.form = this.formBuilder.formGroup(this.formModel);
  }
  getData() {
    this.setLoading(true);
    forkJoin({
      departments: this.departmentService.getAll(),
      lessons:this.lessonService.getAll(),
      departmentLesson: this.departmentLessonService.getById(this.id)

    }).subscribe(result => {
      if (result.departments.success) {
        this.departmentList = this.mapToSelectItem(result.departments.data, 'name', 'id');
      }

      if (result.lessons.success) {
        this.lessonList = this.mapToSelectItem(result.lessons.data, 'name', 'id');
      }
      if (result.departmentLesson.success) {
        this.form.patchValue({
          lessonId: result.departmentLesson.data.lessonId,
          departmentId: result.departmentLesson.data.departmentId,
          id: result.departmentLesson.data.id,
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

    this.departmentLessonService.edit(this.formModel).subscribe(result => {
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
