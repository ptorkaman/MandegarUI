import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TaskService } from "./services/task.service";
import { TaskGroupService } from "./services/task-group.service";
import { TaskAddComponent } from "./pages/task/task-add/task-add.component";
import { TaskEditComponent } from "./pages/task/task-edit/task-edit.component";
import { TaskIndexComponent } from "./pages/task/task-index/task-index.component";
import { TaskOutletComponent } from "./pages/task/task-outlet/task-outlet.component";
import { SharedModule } from "../../../../app/shared/shared.module";
import { PositionOutletComponent } from "./pages/position/position-outlet/position-outlet.component";
import { PositionAddComponent } from "./pages/position/position-add/position-add.component";
import { PositionEditComponent } from "./pages/position/position-edit/position-edit.component";
import { PositionIndexComponent } from "./pages/position/position-index/position-index.component";
import { PositionService } from "./services/position.service";
import { AssignTaskService } from "./services/assign-task.service";
import { BaseInfoRoutingModule } from "./base-info-routing.module";
import { AssignTaskOutletComponent } from "./pages/assign-task/assign-task-outlet/assign-task-outlet.component";
import { TaskGroupEditComponent } from "./pages/task-group/task-group-edit/task-group-edit.component";
import { TaskGroupAddComponent } from "./pages/task-group/task-group-add/task-group-add.component";
import { TaskGroupIndexComponent } from "./pages/task-group/task-group-index/task-group-index.component";
import { TaskGroupOutletComponent } from "./pages/task-group/task-group-outlet/task-group-outlet.component";
import { DepartmentService } from "./services/department.service";
import { CooperationTypeOutletComponent } from "./pages/cooperation-type/cooperation-type-outlet/cooperation-type-outlet.component";
import { CooperationTypeIndexComponent } from "./pages/cooperation-type/cooperation-type-index/cooperation-type-index.component";
import { CooperationTypeAddComponent } from "./pages/cooperation-type/cooperation-type-add/cooperation-type-add.component";
import { CooperationTypeEditComponent } from "./pages/cooperation-type/cooperation-type-edit/cooperation-type-edit.component";
import { CooperationTypeService } from "./services/cooperation-type.service";
import { ActivityCaseOutletComponent } from "./pages/activity-case/activity-case-outlet/activity-case-outlet.component";
import { ActivityCaseIndexComponent } from "./pages/activity-case/activity-case-index/activity-case-index.component";
import { ActivityCaseAddComponent } from "./pages/activity-case/activity-case-add/activity-case-add.component";
import { ActivityCaseEditComponent } from "./pages/activity-case/activity-case-edit/activity-case-edit.component";
import { ActivityCaseService } from "./services/activity-case.service";
import { LessonTypeOutletComponent } from "./pages/lesson-type/lesson-type-outlet/lesson-type-outlet.component";
import { LessonTypeIndexComponent } from "./pages/lesson-type/lesson-type-index/lesson-type-index.component";
import { LessonTypeAddComponent } from "./pages/lesson-type/lesson-type-add/lesson-type-add.component";
import { LessonTypeEditComponent } from "./pages/lesson-type/lesson-type-edit/lesson-type-edit.component";
import { LessonTypeService } from "./services/lesson-type.service";
import { StudyDegreeOutletComponent } from "./pages/study-degree/study-degree-outlet/study-degree-outlet.component";
import { StudyDegreeIndexComponent } from "./pages/study-degree/study-degree-index/study-degree-index.component";
import { StudyDegreeAddComponent } from "./pages/study-degree/study-degree-add/study-degree-add.component";
import { StudyDegreeEditComponent } from "./pages/study-degree/study-degree-edit/study-degree-edit.component";
import { StudyDegreeService } from "./services/study-degree.service";
import { StudyFieldOutletComponent } from "./pages/study-field/study-field-outlet/study-field-outlet.component";
import { StudyFieldIndexComponent } from "./pages/study-field/study-field-index/study-field-index.component";
import { StudyFieldAddComponent } from "./pages/study-field/study-field-add/study-field-add.component";
import { StudyFieldEditComponent } from "./pages/study-field/study-field-edit/study-field-edit.component";
import { StudyFieldService } from "./services/study-field.service";
import { StudyGradeOutletComponent } from "./pages/study-grade/study-grade-outlet/study-grade-outlet.component";
import { StudyGradeIndexComponent } from "./pages/study-grade/study-grade-index/study-grade-index.component";
import { StudyGradeAddComponent } from "./pages/study-grade/study-grade-add/study-grade-add.component";
import { StudyGradeEditComponent } from "./pages/study-grade/study-grade-edit/study-grade-edit.component";
import { StudyGradeService } from "./services/study-grade.service";
import { LessonService } from "./services/lesson.service";
import { LessonOutletComponent } from "./pages/lesson/lesson-outlet/lesson-outlet.component";
import { LessonIndexComponent } from "./pages/lesson/lesson-index/lesson-index.component";
import { LessonAddComponent } from "./pages/lesson/lesson-add/lesson-add.component";
import { LessonEditComponent } from "./pages/lesson/lesson-edit/lesson-edit.component";
import { AcademicYearOutletComponent } from "./pages/academic-year/academic-year-outlet/academic-year-outlet.component";
import { AcademicYearIndexComponent } from "./pages/academic-year/academic-year-index/academic-year-index.component";
import { AcademicYearAddComponent } from "./pages/academic-year/academic-year-add/academic-year-add.component";
import { AcademicYearEditComponent } from "./pages/academic-year/academic-year-edit/academic-year-edit.component";
import { AssignTaskIndexComponent } from "./pages/assign-task/assign-task-index/assign-task-index.component";
import { AssignTaskAddComponent } from "./pages/assign-task/assign-task-add/assign-task-add.component";
import { AssignTaskEditComponent } from "./pages/assign-task/assign-task-edit/assign-task-edit.component";
import { ExecutiveCalendarService } from "./services/executive-calendar.service";
import { ExecutiveCalendarOutletComponent } from "./pages/executive-calendar/executive-calendar-outlet/executive-calendar-outlet.component";
import { ExecutiveCalendarIndexComponent } from "./pages/executive-calendar/executive-calendar-index/executive-calendar-index.component";
import { ExecutiveCalendarEditComponent } from "./pages/executive-calendar/executive-calendar-edit/executive-calendar-edit.component";
import { ExecutiveCalendarAddComponent } from "./pages/executive-calendar/executive-calendar-add/executive-calendar-add.component";


@NgModule({
  imports: [
    CommonModule,
    BaseInfoRoutingModule,
    SharedModule
  ],
  declarations: [
    TaskGroupOutletComponent,
    TaskGroupIndexComponent,
    TaskGroupAddComponent,
    TaskGroupEditComponent,

    TaskOutletComponent,
    TaskIndexComponent,
    TaskAddComponent,
    TaskEditComponent,

    PositionOutletComponent,
    PositionIndexComponent,
    PositionAddComponent,
    PositionEditComponent,

    AssignTaskOutletComponent,
    AssignTaskIndexComponent,
    AssignTaskAddComponent,
    AssignTaskEditComponent,

    CooperationTypeOutletComponent,
    CooperationTypeIndexComponent,
    CooperationTypeAddComponent,
    CooperationTypeEditComponent,

    ActivityCaseOutletComponent,
    ActivityCaseIndexComponent,
    ActivityCaseAddComponent,
    ActivityCaseEditComponent,

    LessonTypeOutletComponent,
    LessonTypeIndexComponent,
    LessonTypeAddComponent,
    LessonTypeEditComponent,

    StudyDegreeOutletComponent,
    StudyDegreeIndexComponent,
    StudyDegreeAddComponent,
    StudyDegreeEditComponent,

    StudyFieldOutletComponent,
    StudyFieldIndexComponent,
    StudyFieldAddComponent,
    StudyFieldEditComponent,

    StudyGradeOutletComponent,
    StudyGradeIndexComponent,
    StudyGradeAddComponent,
    StudyGradeEditComponent,

    LessonOutletComponent,
    LessonIndexComponent,
    LessonAddComponent,
    LessonEditComponent,

    AcademicYearOutletComponent,
    AcademicYearIndexComponent,
    AcademicYearAddComponent,
    AcademicYearEditComponent,

    ExecutiveCalendarOutletComponent,
    ExecutiveCalendarIndexComponent,
    ExecutiveCalendarAddComponent,
    ExecutiveCalendarEditComponent,

  ],
  providers: [
    TaskService,
    TaskGroupService,
    PositionService,
    AssignTaskService,
    CooperationTypeService,
    ActivityCaseService,
    LessonTypeService,
    StudyDegreeService,
    StudyFieldService,
    StudyGradeService,
    LessonService,
    ExecutiveCalendarService

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class BaseInfoModule { }
