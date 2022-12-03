import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageLinks } from "../../../../app/shared/statics/page-links";
import { AcademicYearAddComponent } from "./pages/academic-year/academic-year-add/academic-year-add.component";
import { AcademicYearEditComponent } from "./pages/academic-year/academic-year-edit/academic-year-edit.component";
import { AcademicYearIndexComponent } from "./pages/academic-year/academic-year-index/academic-year-index.component";
import { ActivityCaseAddComponent } from "./pages/activity-case/activity-case-add/activity-case-add.component";
import { ActivityCaseEditComponent } from "./pages/activity-case/activity-case-edit/activity-case-edit.component";
import { ActivityCaseIndexComponent } from "./pages/activity-case/activity-case-index/activity-case-index.component";
import { AssignTaskAddComponent } from "./pages/assign-task/assign-task-add/assign-task-add.component";
import { AssignTaskEditComponent } from "./pages/assign-task/assign-task-edit/assign-task-edit.component";
import { AssignTaskIndexComponent } from "./pages/assign-task/assign-task-index/assign-task-index.component";
import { CooperationTypeAddComponent } from "./pages/cooperation-type/cooperation-type-add/cooperation-type-add.component";
import { CooperationTypeEditComponent } from "./pages/cooperation-type/cooperation-type-edit/cooperation-type-edit.component";
import { CooperationTypeIndexComponent } from "./pages/cooperation-type/cooperation-type-index/cooperation-type-index.component";
import { ExecutiveCalendarEditComponent } from "./pages/executive-calendar/executive-calendar-edit/executive-calendar-edit.component";
import { ExecutiveCalendarAddComponent } from "./pages/executive-calendar/executive-calendar-add/executive-calendar-add.component";
import { ExecutiveCalendarIndexComponent } from "./pages/executive-calendar/executive-calendar-index/executive-calendar-index.component";
import { LessonTypeAddComponent } from "./pages/lesson-type/lesson-type-add/lesson-type-add.component";
import { LessonTypeEditComponent } from "./pages/lesson-type/lesson-type-edit/lesson-type-edit.component";
import { LessonTypeIndexComponent } from "./pages/lesson-type/lesson-type-index/lesson-type-index.component";
import { LessonAddComponent } from "./pages/lesson/lesson-add/lesson-add.component";
import { LessonEditComponent } from "./pages/lesson/lesson-edit/lesson-edit.component";
import { LessonIndexComponent } from "./pages/lesson/lesson-index/lesson-index.component";
import { PositionAddComponent } from "./pages/position/position-add/position-add.component";
import { PositionEditComponent } from "./pages/position/position-edit/position-edit.component";
import { PositionIndexComponent } from "./pages/position/position-index/position-index.component";
import { StudyDegreeAddComponent } from "./pages/study-degree/study-degree-add/study-degree-add.component";
import { StudyDegreeEditComponent } from "./pages/study-degree/study-degree-edit/study-degree-edit.component";
import { StudyDegreeIndexComponent } from "./pages/study-degree/study-degree-index/study-degree-index.component";
import { StudyFieldAddComponent } from "./pages/study-field/study-field-add/study-field-add.component";
import { StudyFieldEditComponent } from "./pages/study-field/study-field-edit/study-field-edit.component";
import { StudyFieldIndexComponent } from "./pages/study-field/study-field-index/study-field-index.component";
import { StudyGradeAddComponent } from "./pages/study-grade/study-grade-add/study-grade-add.component";
import { StudyGradeEditComponent } from "./pages/study-grade/study-grade-edit/study-grade-edit.component";
import { StudyGradeIndexComponent } from "./pages/study-grade/study-grade-index/study-grade-index.component";
import { TaskGroupAddComponent } from "./pages/task-group/task-group-add/task-group-add.component";
import { TaskGroupEditComponent } from "./pages/task-group/task-group-edit/task-group-edit.component";
import { TaskGroupIndexComponent } from "./pages/task-group/task-group-index/task-group-index.component";
import { TaskAddComponent } from "./pages/task/task-add/task-add.component";
import { TaskEditComponent } from "./pages/task/task-edit/task-edit.component";
import { TaskIndexComponent } from "./pages/task/task-index/task-index.component";
import { AssignTaskOutletComponent } from "./pages/assign-task/assign-task-outlet/assign-task-outlet.component";


const routes: Routes = [
  { path: '', redirectTo: `/${PageLinks.Panel}/${PageLinks.BaseInfo}/${PageLinks.Task}`, pathMatch: 'full' },
  {
    path: PageLinks.AcademicYear, component: AcademicYearIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: AcademicYearAddComponent },
      { path: PageLinks.EditPage, component: AcademicYearEditComponent },
    ]
  },
  {
    path: PageLinks.ExecutiveCalendar, component: ExecutiveCalendarIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: ExecutiveCalendarAddComponent },
      { path: PageLinks.EditPage, component: ExecutiveCalendarEditComponent },
    ]
  },
  {
    path: PageLinks.StudyDegree, component: StudyDegreeIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: StudyDegreeAddComponent },
      { path: PageLinks.EditPage, component: StudyDegreeEditComponent },
    ]
  },
  {
    path: PageLinks.StudyField, component: StudyFieldIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: StudyFieldAddComponent },
      { path: PageLinks.EditPage, component: StudyFieldEditComponent },
    ]
  },
  {
    path: PageLinks.StudyGrade, component: StudyGradeIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: StudyGradeAddComponent },
      { path: PageLinks.EditPage, component: StudyGradeEditComponent },
    ]
  },
  {
    path: PageLinks.TaskGroup, component: TaskGroupIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: TaskGroupAddComponent },
      { path: PageLinks.EditPage, component: TaskGroupEditComponent },
    ]
  },
  {
    path: PageLinks.Task, component: TaskIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: TaskAddComponent },
      { path: PageLinks.EditPage, component: TaskEditComponent },
    ]
  },
  {
    path: PageLinks.Position, component: PositionIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: PositionAddComponent },
      { path: PageLinks.EditPage, component: PositionEditComponent },
    ]
  },
  {
    path: PageLinks.AssignTask, component: AssignTaskOutletComponent,
    children: [
      { path: '', component: AssignTaskIndexComponent },
      { path: PageLinks.AddPage, component: AssignTaskAddComponent },
      { path: PageLinks.EditPage, component: AssignTaskEditComponent },
    ]
  },

  {
    path: PageLinks.CooperationType, component: CooperationTypeIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: CooperationTypeAddComponent },
      { path: PageLinks.EditPage, component: CooperationTypeEditComponent },
    ]
  },
  {
    path: PageLinks.ActivityCase, component: ActivityCaseIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: ActivityCaseAddComponent },
      { path: PageLinks.EditPage, component: ActivityCaseEditComponent },
    ]
  },
   {
    path: PageLinks.StudyDegree, component: StudyDegreeIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: StudyDegreeAddComponent },
      { path: PageLinks.EditPage, component: StudyDegreeEditComponent },
    ]
  },
  {
    path: PageLinks.StudyField, component: StudyFieldIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: StudyFieldAddComponent },
      { path: PageLinks.EditPage, component: StudyFieldEditComponent },
    ]
  },
  {
    path: PageLinks.StudyGrade, component: StudyGradeIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: StudyGradeAddComponent },
      { path: PageLinks.EditPage, component: StudyGradeEditComponent },
    ]
  },
  {
    path: PageLinks.Lesson, component: LessonIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: LessonAddComponent },
      { path: PageLinks.EditPage, component: LessonEditComponent },
    ]
  },
  {
    path: PageLinks.LessonType, component: LessonTypeIndexComponent,
    children: [
      { path: PageLinks.AddPage, component: LessonTypeAddComponent },
      { path: PageLinks.EditPage, component: LessonTypeEditComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseInfoRoutingModule { }
